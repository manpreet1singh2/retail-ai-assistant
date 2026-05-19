# Architecture

## Overview
Retail AI Assistant is built as a Next.js / React application with a tool-driven assistant layer. The UI provides a polished retail dashboard and chat experience, while the backend route performs grounded reasoning against the local data files.

The application has four main layers:

1. Data layer
   - `data/products.csv` contains the product catalog.
   - `data/orders.csv` contains order records.
   - `data/policy.txt` contains the return policy.
   - The app reads these files directly from disk at runtime.

2. Tool layer
   - `search_products` searches the product catalog with keyword matching plus optional filters.
   - `get_product` returns one product by `product_id`.
   - `get_order` returns one order by `order_id` and includes the matching product details when available.
   - `evaluate_return` checks policy eligibility based on the order date, product type, and vendor rules.

3. Agent layer
   - `app/api/chat/route.ts` handles the assistant loop.
   - When `OPENAI_API_KEY` is available, it uses OpenAI function calling with the tool definitions.
   - When no API key is configured, it uses the same local tool functions through a deterministic fallback router.

4. UI layer
   - `app/page.tsx` renders the landing page and summary cards.
   - `components/chat-app.tsx` provides the chat interface, prompt shortcuts, and tool trace display.
   - Styling is handled with custom CSS for a premium, dark retail-console look.

## Tool selection
Tool selection is the central safety mechanism.

The assistant is instructed to use tools for every product, order, or return-related question. That prevents the model from inventing prices, availability, order state, or policy details.

Typical mappings:
- “show me the best-selling options under $250” -> `search_products`
- “tell me about product P0048” -> `get_product`
- “check order O0041” -> `get_order`
- “can I return order O0044?” -> `evaluate_return`

If the user omits a required identifier, the assistant asks for it instead of guessing.

## Hallucination prevention
The design avoids hallucinations in several ways:

1. Tool-only grounding
   - The assistant never answers from memory.
   - It reads product and order facts only from the local files.

2. Narrow scope
   - The assistant is only responsible for retail catalog, order, and policy questions.
   - It does not search the web or use unrelated knowledge.

3. Explicit not-found behavior
   - Missing products or orders return a clear not-found response.
   - The final answer states when the data cannot confirm a claim.

4. Policy-driven return checks
   - Return eligibility is derived from the policy text and record data.
   - The logic is deterministic and reproducible.

## Return evaluation logic
The policy file states:
- Normal items: 14 days for a full refund
- Sale items: 7 days, store credit only
- Clearance items: final sale
- Aurelia Couture: exchanges only, no refunds
- Nocturne: extended return window of 21 days
- Size exchanges are allowed if stock is available
- Customer pays return shipping unless defective

Because the provided order file does not include a delivery date, the deployed app uses the order date as the available time reference for the return window check. The UI explicitly notes this limitation so the behavior stays transparent.

## Deployment model
The project is structured to deploy cleanly on Vercel as a Next.js app. The same repository can also be inspected locally with `npm run dev`.

## Why this architecture works
- It keeps the chat experience responsive and polished.
- It grounds every answer in local data.
- It provides a model-backed path when OpenAI credentials are available.
- It still works in deployment environments where no external API key is configured.
