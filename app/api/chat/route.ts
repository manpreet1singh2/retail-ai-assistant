import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { executeTool, formatLocalResponse, toolSchemas } from '@/lib/retail';

export const runtime = 'nodejs';
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a professional Retail AI Assistant for a fashion boutique.

## Your Responsibilities
1. **Personal Shopper** — Help customers find products that match their style, size, occasion, and budget.
2. **Order Support** — Look up order status and details.
3. **Returns & Exchanges** — Evaluate return eligibility using policy rules.

## Mandatory Tool Usage Rules
- ALWAYS call search_products before recommending any product. Never suggest products from memory.
- ALWAYS call evaluate_return before answering any return/refund/exchange question.
- ALWAYS call get_order before answering order-status questions.
- If an order_id or product_id is not found by a tool, say so clearly — do NOT guess.

## Personal Shopper Reasoning (for product searches)
When a customer asks for product recommendations:
1. Extract all constraints: size, price ceiling, occasion, style preference, sale preference.
2. Call search_products with ALL applicable filters (size, max_price, sale_only, in_stock).
3. From the results, prioritize: (a) sale items → (b) bestseller_score → (c) price within budget.
4. Check stock_per_size for the requested size before recommending.
5. Explain WHY each recommendation fits the customer's stated constraints.

## Return Policy (applied strictly)
- Normal items: 14-day full refund window.
- Sale items: 7-day window, store credit only.
- Clearance items: Final sale — no return or exchange.
- Aurelia Couture: Exchange only — no refunds.
- Nocturne: 21-day extended window.

## Anti-Hallucination Rules
- Only state product details (price, stock, sizes) that come directly from tool output.
- If a customer gives an order ID that returns found:false, refuse to fabricate order details.
- Do not infer return eligibility without calling evaluate_return.
- Keep answers concise, professional, and grounded in the data.`;

type ChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content?: string;
  tool_call_id?: string;
  tool_calls?: unknown[];
};

async function runOpenAIAgent(userMessage: string, history: ChatMessage[]) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(history.filter((m) => m.role !== 'system') as OpenAI.ChatCompletionMessageParam[]),
    { role: 'user', content: userMessage },
  ];

  const tools = toolSchemas();
  const trace: { tool: string; args: unknown; output: unknown }[] = [];

  for (let iteration = 0; iteration < 8; iteration++) {
    const response = await client.chat.completions.create({
      model:       process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages,
      tools,
      tool_choice: 'auto',
      temperature: 0.1, // Lower temp = more deterministic, less hallucination
    });

    const msg       = response.choices[0]?.message;
    const toolCalls = msg?.tool_calls ?? [];

    if (!toolCalls.length) {
      return { text: msg?.content?.trim() || 'No response generated.', trace };
    }

    // Push assistant message with tool_calls
    messages.push({
      role:       'assistant',
      content:    msg.content ?? '',
      tool_calls: toolCalls,
    } as OpenAI.ChatCompletionMessageParam);

    // Execute each tool and return results
    for (const call of toolCalls) {
      const args   = JSON.parse(call.function.arguments || '{}');
      const output = executeTool(call.function.name, args as Record<string, unknown>);
      trace.push({ tool: call.function.name, args, output });
      messages.push({
        role:         'tool',
        tool_call_id: call.id,
        content:      JSON.stringify(output),
      } as OpenAI.ChatCompletionMessageParam);
    }
  }

  return {
    text:  'The assistant reached the maximum reasoning steps. Please try a more specific question.',
    trace,
  };
}

export async function POST(req: Request) {
  let body: { messages?: ChatMessage[] } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];
  const latestUser = [...messages]
    .reverse()
    .find((m) => m.role === 'user')
    ?.content
    ?.trim() ?? '';

  if (!latestUser) {
    return NextResponse.json({ error: 'No user message found.' }, { status: 400 });
  }

  // OpenAI path
  if (process.env.OPENAI_API_KEY) {
    try {
      const result = await runOpenAIAgent(
        latestUser,
        messages.filter((m) => m.role !== 'system'),
      );
      return NextResponse.json({ reply: result.text, trace: result.trace, mode: 'openai' });
    } catch (err) {
      console.error('OpenAI agent error:', err);
      // Fall through to local fallback
    }
  }

  // Local fallback (no API key needed)
  const local = formatLocalResponse(latestUser);
  return NextResponse.json({
    reply: local.text,
    trace: local.trace,
    mode:  process.env.OPENAI_API_KEY ? 'fallback' : 'local',
  });
}
