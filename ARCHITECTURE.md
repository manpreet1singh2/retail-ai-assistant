# Retail AI Assistant — Architecture Document

---

## 1. Why We Structured the Agent This Way

### Separation of Concerns

The system is split into three strict layers:

```
┌──────────────────────────────────────────────────────────────┐
│  USER INTERFACE  (main.py)                                   │
│  Rich terminal CLI — interactive, demo, single-shot modes    │
└──────────────────────┬───────────────────────────────────────┘
                       │ user message
┌──────────────────────▼───────────────────────────────────────┐
│  REASONING LAYER  (agent/assistant.py)                       │
│  OpenAI gpt-4o-mini · function calling · temperature=0.1     │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  SYSTEM_PROMPT                                        │    │
│  │  • Role definition (shopper / support)                │    │
│  │  • Mandatory tool-use rules                           │    │
│  │  • Anti-hallucination rules                           │    │
│  │  • Ranking logic (sale → bestseller → price)          │    │
│  └──────────────────────────────────────────────────────┘    │
│  Agentic loop: send → tool_calls? → execute → repeat         │
└──────────────────────┬───────────────────────────────────────┘
                       │ tool calls
┌──────────────────────▼───────────────────────────────────────┐
│  DATA LAYER  (tools/data_tools.py)                           │
│  Pure deterministic Python — no LLM, no network              │
│  ├── search_products(query, size, max_price, on_sale, ...)   │
│  ├── get_product(product_id)                                 │
│  ├── get_order(order_id)                                     │
│  └── evaluate_return(order_id, reason, request_date)         │
│       Data: pandas DataFrames loaded once via @lru_cache     │
└──────────────────────────────────────────────────────────────┘
```

### Why This Structure

**LLM does reasoning, not data retrieval.**
The model is good at understanding intent, ranking options, and explaining
decisions in natural language. It is bad at reliably recalling exact stock
numbers, prices, or policy windows. Keeping data retrieval in deterministic
Python code eliminates this class of error entirely.

**Single agent, two personas.**
The SYSTEM_PROMPT defines both the shopper role and the support role.
The agent selects the right behavior based on the user's query — no separate
routing step needed. This keeps the architecture simple and the context
coherent across a multi-turn conversation.

**Agentic loop (max 8 iterations).**
For complex queries the model may chain tools:
  `evaluate_return` → needs the order → automatically calls `get_order` first.
The loop allows this chaining without the caller needing to manage it.

---

## 2. How Hallucination Is Minimized

### Layer 1 — Structural Prevention

| Mechanism | Effect |
|-----------|--------|
| `found: false` contract | Every lookup returns `{ found: false, error: "..." }` for missing IDs. The model cannot see data it was never given. |
| No product data in system prompt | Product catalog is not injected into the prompt. The model *must* call `search_products` — it has no memory of the catalog to draw from. |
| `temperature=0.1` | Reduces creative generation. The model stays close to what the tool returned. |
| Structured return evaluation | `evaluate_return()` applies eligibility rules in Python code (date math, vendor map, clearance flag). The LLM only narrates the result — it never computes eligibility itself. |
| Tool output is the only source of truth | All tool results are appended to the message history verbatim. The model's response is grounded in that context window. |

### Layer 2 — Prompt Enforcement

```
SYSTEM_PROMPT includes:
  "Only state facts that came from a tool response in this conversation."
  "If a tool returns found:false → say so clearly. Never fabricate."
  "Never decide eligibility without calling evaluate_return first."
```

### Layer 3 — Runtime Validation

- `get_order("O9999")` → `{ found: false, error: "Order not found" }`
- `get_product("P9999")` → `{ found: false, error: "Product not found" }`
- The model receives these as tool results and relays the refusal to the user.

---

## 3. How Tools Are Selected

### Selection Mechanism

OpenAI's function-calling API (`tool_choice="auto"`) selects tools based on:
1. The tool's `description` field
2. The `parameters.properties` descriptions
3. The SYSTEM_PROMPT's explicit routing rules

### Routing Logic (from SYSTEM_PROMPT)

```
Query intent analysis
        │
        ├── Product recommendation?
        │     └─► search_products(query, size, max_price, on_sale, in_stock)
        │
        ├── Specific product_id mentioned?
        │     └─► get_product(product_id)
        │
        ├── Order status / tracking?
        │     └─► get_order(order_id)
        │
        └── Return / refund / exchange?
              ├─► get_order(order_id)        ← first, to get order details
              └─► evaluate_return(order_id)  ← then, to apply policy rules
```

### Tool Schema Design

Each tool's `description` is written as an explicit instruction, not a
passive description:

```python
"description": (
    "Search products using keywords and optional filters. "
    "ALWAYS call this before recommending any product. "
    "Never suggest items from memory."
)
```

This phrasing directly shapes the model's routing decision.

### Tool Implementations

```python
search_products(query, size, max_price, on_sale, in_stock, top_k=5)
  → Filter by price, size stock, sale flag
  → Score by: keyword hits + bestseller_score (desc) + price (asc)
  → Returns top_k results

get_product(product_id)
  → Exact match on product_id column
  → Returns { found: True/False, ...product }

get_order(order_id)
  → Exact match on order_id column
  → Joins product details automatically
  → Returns { found: True/False, ...order, product: {...} }

evaluate_return(order_id, reason, request_date)
  → Calls get_order internally
  → Applies rules in this priority:
      1. Order not found    → refuse
      2. Clearance item     → final sale, ineligible
      3. Aurelia Couture    → exchange only, no refund
      4. Nocturne vendor    → 21-day window
      5. Sale item          → 7-day window, store credit
      6. Normal item        → 14-day window, full refund
  → Returns { eligible, days_since_order, return_window_days, reason, next_steps }
```

---

## 4. Part 1 — Personal Shopper Example (Traced)

**Input:** *"I need a modest evening gown under $300 in size 8. I prefer something on sale."*

**Agent steps:**
```
1. search_products({
     query:     "modest evening gown",
     size:      "8",
     max_price: 300,
     on_sale:   true,
     in_stock:  true
   })
   → 10 matches; scored by keyword hits → sale bonus → bestseller_score
```

**Response reasoning:**
- Filters applied: price ≤ $300, size 8 in stock, is_sale = true
- Top result: e.g., Lumiere Style 69 ($111, sale, bestseller_score=85)
- Explanation includes: why it matches modest + in-budget + sale + in-stock

---

## 5. Part 2 — Support Example (Traced)

**Input:** *"Order O0044 — I bought this dress a while back. Can I return it?"*

**Agent steps:**
```
1. get_order("O0044")
   → { found: true, product: { vendor: "Aurelia Couture", ... } }

2. evaluate_return({ order_id: "O0044" })
   → { eligible: false, reason: "Aurelia Couture has exchanges only, no refunds." }
```

**Response:** Clearly states not eligible, explains vendor rule, offers exchange.

---

## 6. Edge Case — Invalid Order

**Input:** *"Return order O9999"*

```
1. get_order("O9999") → { found: false, error: "Order not found" }
2. evaluate_return("O9999") → { eligible: false, reason: "Order not found" }
```

**Response:** *"I cannot find order O9999 in our system. Please verify your order ID."*
No data is fabricated.

---

*Stack: Python 3.11 · OpenAI SDK · pandas · rich · Next.js 15 (web)*
*Deployment: Vercel (web) + local CLI (Python)*
