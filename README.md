# Retail AI Assistant

Retail AI Assistant is a professional web app for retail catalog search, order lookup, and return evaluation. It uses the provided data files directly:

- `data/products.csv`
- `data/orders.csv`
- `data/policy.txt`

## What it does
- Search products by keyword, vendor, price, or stock
- Inspect a single product by `product_id`
- Inspect an order by `order_id`
- Evaluate return eligibility using the stored policy text
- Provide grounded responses with tool-based reasoning

## Tech stack
- Next.js / React
- TypeScript
- OpenAI function calling when `OPENAI_API_KEY` is configured
- Local deterministic fallback so the app still works without an API key
- File-based retail data loaded from `/data`

## Project structure
- `app/` - Next.js UI and API routes
- `components/` - chat interface and dashboard UI
- `lib/` - catalog loading, tool functions, and response routing
- `data/` - the real CSV and policy files
- `main.py`, `tools/`, `agent/` - earlier Python prototype files retained in the repository history

## Getting started
1. Install dependencies
```bash
npm install
```

2. Run locally
```bash
npm run dev
```

3. Open the app
```bash
http://localhost:3000
```

## Environment variables
- `OPENAI_API_KEY` is optional. If present, the API route uses OpenAI function calling.
- If the key is not present, the app uses the same local tool logic and still responds.

## Design goals
- Professional, high-contrast UI
- Clear separation between the frontend and the data/tool layer
- No hallucinated retail facts
- Return reasoning that is grounded in the provided files only

## Example prompts
- Show me best-selling products under $250
- Tell me about product P0048
- Check order O0041
- Can I return order O0044?
