from __future__ import annotations

import ast
from datetime import date, datetime
from functools import lru_cache
from pathlib import Path
from typing import Any

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
PRODUCTS_CSV = DATA_DIR / "products.csv"
ORDERS_CSV = DATA_DIR / "orders.csv"
POLICY_TXT = DATA_DIR / "policy.txt"


@lru_cache(maxsize=1)
def load_products() -> pd.DataFrame:
    df = pd.read_csv(PRODUCTS_CSV)
    df["product_id"] = df["product_id"].astype(str)
    df["title"] = df["title"].fillna("").astype(str)
    df["vendor"] = df["vendor"].fillna("").astype(str)
    df["tags_list"] = df["tags"].fillna("").astype(str).apply(_split_tags)
    df["title_lower"] = df["title"].str.lower()
    df["vendor_lower"] = df["vendor"].str.lower()
    df["tags_lower"] = df["tags_list"].apply(lambda tags: " ".join(tags).lower())
    return df


@lru_cache(maxsize=1)
def load_orders() -> pd.DataFrame:
    df = pd.read_csv(ORDERS_CSV)
    df["order_id"] = df["order_id"].astype(str)
    df["product_id"] = df["product_id"].astype(str)
    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce").dt.date
    return df


@lru_cache(maxsize=1)
def load_policy() -> dict[str, Any]:
    text = POLICY_TXT.read_text(encoding="utf-8")
    return _parse_policy(text)


def _split_tags(value: str) -> list[str]:
    return [tag.strip() for tag in value.split(",") if tag.strip()]


def _parse_policy(text: str) -> dict[str, Any]:
    lines = [line.strip() for line in text.splitlines()]
    policy: dict[str, Any] = {
        "normal_days": 14,
        "sale_days": 7,
        "clearance_returnable": False,
        "vendor_rules": {},
        "exchange_allowed_if_stock": True,
        "customer_pays_shipping_unless_defective": True,
    }
    current_section = None
    for line in lines:
        if not line:
            continue
        if line.endswith(":"):
            current_section = line[:-1].strip().lower()
            continue
        if current_section == "normal items" and "14 days" in line:
            policy["normal_days"] = 14
        elif current_section == "sale items" and "7 days" in line:
            policy["sale_days"] = 7
        elif current_section == "clearance items" and "not eligible" in line.lower():
            policy["clearance_returnable"] = False
        elif current_section == "vendor exceptions":
            if ":" in line:
                vendor, rule = line.split(":", 1)
                policy["vendor_rules"][vendor.strip().lower()] = rule.strip()
        elif current_section == "exchange rules":
            if "size exchanges allowed" in line.lower():
                policy["exchange_allowed_if_stock"] = True
            if "customer pays return shipping" in line.lower():
                policy["customer_pays_shipping_unless_defective"] = True
    return policy


def search_products(query: str = "", max_price: float | None = None, in_stock: bool | None = None, size: str | None = None, on_sale: bool | None = None, top_k: int = 5) -> dict[str, Any]:
    products = load_products().copy()
    if max_price is not None:
        products = products[products["price"] <= float(max_price)]
    if size is not None:
        size = str(size).strip()
        products = products[products["stock_per_size"].apply(lambda stock: _size_stock(stock, size) > 0)]
    if on_sale is True:
        products = products[products["is_sale"].astype(bool)]
    elif on_sale is False:
        products = products[~products["is_sale"].astype(bool)]
    if in_stock is True:
        products = products[products["stock_per_size"].apply(_total_stock) > 0]
    elif in_stock is False:
        products = products[products["stock_per_size"].apply(_total_stock) <= 0]

    query = (query or "").strip().lower()
    if query:
        tokens = [t for t in query.replace("/", " ").split() if t]
        products = products.assign(
            _score=products.apply(lambda row: sum(1 for token in tokens if token in f"{row['title_lower']} {row['vendor_lower']} {row['tags_lower']}"), axis=1)
        )
        products = products[products["_score"] > 0].sort_values(by=["_score", "bestseller_score", "price"], ascending=[False, False, True])
    else:
        products = products.sort_values(by=["bestseller_score", "price"], ascending=[False, True])

    results = products.head(top_k).drop(columns=[c for c in ["title_lower", "vendor_lower", "tags_lower", "tags_list", "_score"] if c in products.columns], errors="ignore")
    return {"query": query, "count": int(len(products)), "found": not results.empty, "results": _records(results)}


def get_product(product_id: str) -> dict[str, Any]:
    products = load_products()
    row = products[products["product_id"] == str(product_id)]
    if row.empty:
        return {"found": False, "product_id": str(product_id), "error": "Product not found"}
    return {"found": True, **_record(row.iloc[0])}


def get_order(order_id: str) -> dict[str, Any]:
    orders = load_orders()
    row = orders[orders["order_id"] == str(order_id)]
    if row.empty:
        return {"found": False, "order_id": str(order_id), "error": "Order not found"}
    order = _record(row.iloc[0])
    product = get_product(str(order["product_id"]))
    if product.get("found"):
        order["product"] = product
    return {"found": True, **order}


def evaluate_return(order_id: str, reason: str = "", request_date: str | None = None) -> dict[str, Any]:
    order = get_order(order_id)
    if not order.get("found"):
        return {"eligible": False, "order_id": str(order_id), "reason": "Order not found", "next_steps": ["Ask for a valid order ID."]}

    policy = load_policy()
    request_dt = date.today() if not request_date else _coerce_date(request_date)
    order_date = _coerce_date(order.get("order_date"))
    product = order.get("product", {})
    vendor = str(product.get("vendor", "")).lower()
    price_paid = float(order.get("price_paid") or 0)
    is_sale = bool(product.get("is_sale"))
    is_clearance = bool(product.get("is_clearance"))

    if is_clearance:
        return {"eligible": False, "order_id": str(order_id), "reason": "Clearance items are final sale.", "next_steps": ["Explain that the item is final sale and suggest exchange support if stock allows."], "order": order}

    return_window = policy["sale_days"] if is_sale else policy["normal_days"]
    vendor_rule = policy["vendor_rules"].get(vendor)

    if vendor == "aurelia couture":
        return {
            "eligible": False,
            "order_id": str(order_id),
            "reason": "Aurelia Couture has exchanges only, no refunds.",
            "next_steps": ["Offer an exchange if the requested size is in stock."],
            "order": order,
        }
    if vendor == "nocturne":
        return_window = 21

    if order_date is None or request_dt is None:
        return {"eligible": False, "order_id": str(order_id), "reason": "Order date is missing or invalid.", "next_steps": ["Confirm the purchase date."], "order": order}

    days_since = (request_dt - order_date).days
    eligible = days_since <= return_window
    explanation = f"Request is {days_since} day(s) after order date; window is {return_window} day(s)."
    if vendor_rule:
        explanation += f" Vendor rule: {str(vendor_rule).rstrip('.')}"

    return {
        "eligible": eligible,
        "order_id": str(order_id),
        "request_date": request_dt.isoformat(),
        "order_date": order_date.isoformat(),
        "days_since_order": days_since,
        "return_window_days": return_window,
        "reason": explanation,
        "customer_reason": reason or None,
        "order": order,
        "policy": {
            "normal_days": policy["normal_days"],
            "sale_days": policy["sale_days"],
            "clearance_returnable": policy["clearance_returnable"],
            "vendor_rules": policy["vendor_rules"],
        },
        "next_steps": ["Proceed with return instructions." if eligible else "Explain the policy and offer exchange options if available."],
    }


def _coerce_date(value: Any) -> date | None:
    if value is None:
        return None
    if isinstance(value, date) and not isinstance(value, datetime):
        return value
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, str):
        value = value.strip()
        if not value:
            return None
        try:
            return datetime.strptime(value, "%Y-%m-%d").date()
        except ValueError:
            try:
                parsed = pd.to_datetime(value, errors="coerce")
                return None if pd.isna(parsed) else parsed.date()
            except Exception:
                return None
    return None


def _records(df: pd.DataFrame) -> list[dict[str, Any]]:
    return [_record(row) for _, row in df.iterrows()]


def _record(row: pd.Series) -> dict[str, Any]:
    data = {}
    for key, value in row.to_dict().items():
        if key in {"tags_list", "title_lower", "vendor_lower", "tags_lower", "_score"}:
            continue
        data[key] = _json_safe(value)
    if "stock_per_size" in data and isinstance(data["stock_per_size"], str):
        try:
            data["stock_per_size"] = ast.literal_eval(data["stock_per_size"])
        except Exception:
            pass
    return data


def _total_stock(stock_value: Any) -> int:
    if isinstance(stock_value, str):
        try:
            stock_value = ast.literal_eval(stock_value)
        except Exception:
            return 0
    if isinstance(stock_value, dict):
        return int(sum(int(v) for v in stock_value.values()))
    return 0


def _size_stock(stock_value: Any, size: str) -> int:
    if isinstance(stock_value, str):
        try:
            stock_value = ast.literal_eval(stock_value)
        except Exception:
            return 0
    if isinstance(stock_value, dict):
        return int(stock_value.get(str(size), 0) or 0)
    return 0


def _json_safe(value: Any) -> Any:
    if isinstance(value, (pd.Timestamp, datetime, date)):
        return value.isoformat()
    if pd.isna(value):
        return None
    return value.item() if hasattr(value, "item") else value


def tool_schemas() -> list[dict[str, Any]]:
    return [
        {"type": "function", "function": {"name": "search_products", "description": "Search products using keywords and optional price, stock, size, or sale filters.", "parameters": {"type": "object", "properties": {"query": {"type": "string"}, "max_price": {"type": ["number", "null"]}, "in_stock": {"type": ["boolean", "null"]}, "size": {"type": ["string", "null"]}, "on_sale": {"type": ["boolean", "null"]}, "top_k": {"type": "integer", "default": 5}}, "required": []}}},
        {"type": "function", "function": {"name": "get_product", "description": "Fetch one product by product_id.", "parameters": {"type": "object", "properties": {"product_id": {"type": "string"}}, "required": ["product_id"]}}},
        {"type": "function", "function": {"name": "get_order", "description": "Fetch one order by order_id and include matching product details.", "parameters": {"type": "object", "properties": {"order_id": {"type": "string"}}, "required": ["order_id"]}}},
        {"type": "function", "function": {"name": "evaluate_return", "description": "Evaluate return eligibility using the local policy and CSV data.", "parameters": {"type": "object", "properties": {"order_id": {"type": "string"}, "reason": {"type": "string"}, "request_date": {"type": "string"}}, "required": ["order_id"]}}},
    ]


def execute_tool(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    if name == "search_products":
        return search_products(**arguments)
    if name == "get_product":
        return get_product(**arguments)
    if name == "get_order":
        return get_order(**arguments)
    if name == "evaluate_return":
        return evaluate_return(**arguments)
    raise ValueError(f"Unknown tool: {name}")
