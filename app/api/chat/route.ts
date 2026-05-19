import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { executeTool, formatLocalResponse, toolSchemas } from '@/lib/retail';

export const runtime = 'nodejs';

const SYSTEM_PROMPT = `You are Retail AI Assistant.
Rules:
- Use tools for any product, order, or return-policy question.
- Never invent product, order, or policy details.
- If data does not confirm an answer, say so clearly.
- If an identifier is missing, ask for it instead of guessing.
- Give a concise answer and explain the reasoning briefly.
`;

type ChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content?: string;
  tool_call_id?: string;
  tool_calls?: unknown[];
};

async function runOpenAIAgent(userMessage: string, history: ChatMessage[]) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const messages: any[] = [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: userMessage }];
  const tools = toolSchemas();
  const trace: any[] = [];

  for (let i = 0; i < 6; i++) {
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      messages,
      tools,
      tool_choice: 'auto',
      temperature: 0.2,
    });

    const message = response.choices[0]?.message;
    const toolCalls = message?.tool_calls ?? [];

    if (toolCalls.length) {
      messages.push({ role: 'assistant', content: message?.content ?? '', tool_calls: toolCalls });
      for (const call of toolCalls as any[]) {
        const args = JSON.parse(call.function.arguments || '{}');
        const output = executeTool(call.function.name, args);
        trace.push({ tool: call.function.name, args, output });
        messages.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(output) });
      }
      continue;
    }

    return { text: message?.content?.trim() || '', trace };
  }

  return { text: 'I could not complete the request within the tool loop limit.', trace };
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];
  const latestUser = [...messages].reverse().find((message) => message.role === 'user')?.content?.trim() ?? '';

  if (!latestUser) {
    return NextResponse.json({ error: 'No user message provided.' }, { status: 400 });
  }

  try {
    if (process.env.OPENAI_API_KEY) {
      const result = await runOpenAIAgent(latestUser, messages.filter((message) => message.role !== 'system'));
      return NextResponse.json({ reply: result.text, trace: result.trace, mode: 'openai' });
    }

    const local = formatLocalResponse(latestUser);
    return NextResponse.json({ reply: local.text, trace: local.trace, mode: 'local' });
  } catch (error) {
    const local = formatLocalResponse(latestUser);
    return NextResponse.json({ reply: local.text, trace: local.trace, mode: 'fallback', error: String(error) });
  }
}
