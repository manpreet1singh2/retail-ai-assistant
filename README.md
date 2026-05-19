# Retail AI Assistant

A production-grade agentic AI system that simulates a **Personal Shopper** and a **Customer Support Assistant** for a fashion retail boutique.

Built for the Webvory Pre-Interview Assignment.

---

## Live Demo

**Web App:** https://retail-ai-assistant-kwy0leepj-dimples-projects-fad2073a.vercel.app

---

## Architecture

```
User Query
    │
    ▼
RetailAssistant (agent/assistant.py)
    │  OpenAI gpt-4o-mini + function calling
    │  System prompt enforces tool-use rules
    │  temperature=0.1 → deterministic, grounded
    │
    ├─► search_products(query, size, max_price, on_sale, in_stock)
    ├─► get_product(product_id)
    ├─► get_order(order_id)
    └─► evaluate_return(order_id, reason, request_date)
              │
              ▼
        tools/data_tools.py
        ├─ pandas DataFrames (products.csv + orders.csv)
        ├─ policy parser (policy.txt)
        └─ vendor-specific logic (Aurelia Couture, Nocturne, Clearance)
```

**Key design decisions:**

- **Zero hallucination**: all data flows through tools; model never guesses product/order facts
- **found:false contract**: all lookups return `{ found: false, error: "..." }` for unknown IDs
- **Rule-based returns**: eligibility computed in pure Python, not by the LLM
- **temperature=0.1**: reduces creative drift from factual tool output
- See `ARCHITECTURE.md` for the full document

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/manpreet1singh2/retail-ai-assistant.git
cd retail-ai-assistant

# 2. Install deps
pip install -r requirements.txt

# 3. Set your OpenAI API key
export OPENAI_API_KEY=sk-...

# 4. Run (choose one)
python main.py                          # interactive chat
python main.py --demo                   # all 5 assignment scenarios
python main.py --debug                  # interactive + full tool trace
python main.py --message "I need a modest gown under $300 in size 8"
```

---

## Demo Scenarios (for video recording)

| # | Type | Query |
|---|------|-------|
| 1 | 🛍 Shopping | "I need a modest evening gown under $300 in size 8, prefer sale" |
| 2 | 🛍 Shopping | "Best-selling sparkle dresses for prom, budget $250, size 10" |
| 3 | 📦 Support | "Return order O0001 — placed 5 days ago, doesn't fit" |
| 4 | 📦 Support | "Return order O0044 — want a refund" |
| 5 | 🚫 Edge case | "Return order O9999" (invalid ID) |

Run all 5 automatically:
```bash
python main.py --demo
```

---

## Required Tools

| Tool | When called |
|------|-------------|
| `search_products(filters)` | Before any product recommendation |
| `get_product(product_id)` | When a specific product ID is given |
| `get_order(order_id)` | Before any order/support question |
| `evaluate_return(order_id)` | Before any return/refund/exchange decision |

---

## Project Structure

```
retail-ai-assistant/
├── main.py                  CLI — interactive / demo / single-shot
├── agent/
│   └── assistant.py         RetailAssistant class — agentic loop
├── tools/
│   └── data_tools.py        4 tools + execute_tool dispatcher
├── data/
│   ├── products.csv         100 products
│   ├── orders.csv           100 orders
│   └── policy.txt           Return policy rules
├── lib/
│   └── embedded-data.ts     Auto-generated for Vercel (no fs at runtime)
├── app/                     Next.js 15 web interface
├── requirements.txt         Python deps (openai, pandas, rich)
├── ARCHITECTURE.md          Full architecture document
└── README.md
```

---

## Return Policy Logic

| Item Type | Window | Result |
|-----------|--------|--------|
| Normal | 14 days | Full refund |
| Sale | 7 days | Store credit only |
| Clearance | — | Final sale, no return |
| Aurelia Couture | Any | Exchange only |
| Nocturne | 21 days | Full refund |
