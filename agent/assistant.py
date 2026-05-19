"""
RetailAssistant — agentic loop with OpenAI function calling.

Design:
  - Reasoning is handled by the LLM (OpenAI).
  - Data retrieval is handled by structured tools (tools/data_tools.py).
  - The LLM never invents product/order data; it only narrates tool outputs.
  - Hallucination is prevented by refusing tool calls when identifiers are missing,
    and by always returning found:false for unknown IDs instead of fabricating data.
"""
from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from typing import Any

from openai import OpenAI

from tools.data_tools import execute_tool, tool_schemas

# ── System prompt ───────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are a professional Retail AI Assistant with two roles:

1. PERSONAL SHOPPER — help customers find the perfect product
2. CUSTOMER SUPPORT — handle order lookups and return/exchange requests

━━━ MANDATORY TOOL RULES (never bypass these) ━━━

• search_products  → ALWAYS call this before recommending any product.
  Never suggest items from memory or training data.

• get_product      → call when a specific product_id is given or needed.

• get_order        → ALWAYS call this before answering any order question.

• evaluate_return  → ALWAYS call this for any return, refund, or exchange request.
  Never decide eligibility without calling this tool first.

━━━ PERSONAL SHOPPER LOGIC ━━━

When a customer asks for product recommendations:
  1. Extract ALL constraints: size, max price, occasion, style, sale preference.
  2. Call search_products with ALL applicable filters simultaneously.
  3. From results, rank by: (a) sale items first → (b) bestseller_score → (c) lowest price.
  4. Check stock_per_size for the exact requested size before recommending.
  5. Clearly EXPLAIN why each recommendation fits the customer's stated needs.
     Do not just list products — justify each pick against the constraints.

━━━ SUPPORT LOGIC ━━━

  1. Fetch the order with get_order first.
  2. If order is not found → refuse, ask for correct order ID. Do NOT guess.
  3. If found → call evaluate_return with the order_id.
  4. Report the decision (yes/no) AND the reasoning (window, vendor rule, item type).
  5. Always include next steps (refund process / exchange offer / explanation).

━━━ ANTI-HALLUCINATION RULES ━━━

  • Only state facts that came from a tool response in this conversation.
  • If a tool returns found:false → say so clearly. Never fabricate an order or product.
  • Never guess stock, price, or return eligibility without calling the relevant tool.
  • If asked for an order that doesn't exist → say "I cannot find order X in our system."

━━━ TONE ━━━

  Concise, professional, warm. Always cite the product_id or order_id in your answer.
"""


# ── Data classes ─────────────────────────────────────────────────────────────

@dataclass
class ToolStep:
    """One tool invocation and its result."""
    tool: str
    arguments: dict[str, Any]
    output: dict[str, Any]


@dataclass
class AgentTurn:
    """Complete result of one user → assistant exchange."""
    text: str
    steps: list[ToolStep] = field(default_factory=list)


# ── Agent ────────────────────────────────────────────────────────────────────

class RetailAssistant:
    """
    Single-turn and multi-turn retail agent.

    Architecture
    ────────────
    Each call to respond() runs an agentic loop:
      1. Send messages → OpenAI
      2. If model requests tool calls → execute each, append results, loop
      3. When model produces a plain text message → return AgentTurn

    Tool calls are executed locally (no network) using tools/data_tools.py,
    which reads from the embedded CSV/TXT data files.

    Hallucination prevention
    ────────────────────────
    All data questions are routed through tools. The SYSTEM_PROMPT explicitly
    forbids the model from inventing product or order details. Tools return
    { found: false, error: "..." } for unknown identifiers, and the model is
    instructed to relay that refusal rather than improvise.
    """

    MAX_ITERATIONS = 8

    def __init__(self, model: str = "gpt-4o-mini", history: list[dict] | None = None) -> None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise RuntimeError(
                "OPENAI_API_KEY environment variable is not set.\n"
                "Export it with:  export OPENAI_API_KEY=sk-..."
            )
        self.client = OpenAI(api_key=api_key)
        self.model = model
        self.tools = tool_schemas()
        # Persistent conversation history (supports multi-turn chat)
        self._history: list[dict[str, Any]] = history or []

    def respond(self, user_message: str) -> AgentTurn:
        """Process one user message and return the agent's response."""
        # Build message list: system + history + new user message
        messages: list[dict[str, Any]] = [
            {"role": "system", "content": SYSTEM_PROMPT},
            *self._history,
            {"role": "user", "content": user_message},
        ]

        steps: list[ToolStep] = []

        for _ in range(self.MAX_ITERATIONS):
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                tools=self.tools,
                tool_choice="auto",
                temperature=0.1,   # Low = more deterministic, less hallucination
            )

            msg = response.choices[0].message
            tool_calls = msg.tool_calls or []

            # ── Tool call branch ─────────────────────────────────────────────
            if tool_calls:
                messages.append({
                    "role": "assistant",
                    "content": msg.content,
                    "tool_calls": tool_calls,
                })
                for call in tool_calls:
                    args = json.loads(call.function.arguments or "{}")
                    output = execute_tool(call.function.name, args)
                    steps.append(ToolStep(
                        tool=call.function.name,
                        arguments=args,
                        output=output,
                    ))
                    messages.append({
                        "role": "tool",
                        "tool_call_id": call.id,
                        "content": json.dumps(output, ensure_ascii=False, default=str),
                    })
                continue   # feed results back into the loop

            # ── Final response branch ────────────────────────────────────────
            assistant_text = (msg.content or "").strip()

            # Persist to history for multi-turn conversations
            self._history.append({"role": "user", "content": user_message})
            self._history.append({"role": "assistant", "content": assistant_text})

            return AgentTurn(text=assistant_text, steps=steps)

        return AgentTurn(
            text="I could not complete this request within the tool loop limit. Please try a more specific question.",
            steps=steps,
        )

    def reset(self) -> None:
        """Clear conversation history."""
        self._history.clear()
