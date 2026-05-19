from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any

from openai import OpenAI

from tools.data_tools import execute_tool, tool_schemas

SYSTEM_PROMPT = """You are a retail AI assistant.

Rules:
- Use tools for any product, order, or return-policy questions.
- Never invent facts. Only use tool outputs.
- If the data does not confirm something, say so clearly.
- If an identifier is missing, ask for it rather than guessing.
- Explain reasoning briefly and cite the product_id or order_id when useful.
- Prefer concise, grounded answers over speculation.
"""


@dataclass
class AssistantResponse:
    text: str
    steps: list[dict[str, Any]]


class RetailAssistant:
    def __init__(self, model: str = "gpt-4.1-mini") -> None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise RuntimeError("OPENAI_API_KEY is not set.")
        self.client = OpenAI(api_key=api_key)
        self.model = model
        self.tools = tool_schemas()

    def respond(self, user_message: str) -> AssistantResponse:
        messages: list[dict[str, Any]] = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ]
        steps: list[dict[str, Any]] = []

        for _ in range(8):
            result = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                tools=self.tools,
                tool_choice="auto",
                temperature=0.2,
            )
            message = result.choices[0].message
            tool_calls = message.tool_calls or []

            if tool_calls:
                messages.append({"role": "assistant", "content": message.content, "tool_calls": tool_calls})
                for call in tool_calls:
                    name = call.function.name
                    args = json.loads(call.function.arguments or "{}")
                    output = execute_tool(name, args)
                    steps.append({"tool": name, "arguments": args, "output": output})
                    messages.append({"role": "tool", "tool_call_id": call.id, "content": json.dumps(output, ensure_ascii=False)})
                continue

            return AssistantResponse(text=(message.content or "").strip(), steps=steps)

        return AssistantResponse(text="I could not complete the request within the tool loop limit.", steps=steps)
