from __future__ import annotations

import argparse

from agent.assistant import RetailAssistant


def main() -> None:
    parser = argparse.ArgumentParser(description="Retail AI Assistant CLI")
    parser.add_argument("--message", help="Single user message to process")
    parser.add_argument("--model", default="gpt-4.1-mini", help="OpenAI model name")
    args = parser.parse_args()

    assistant = RetailAssistant(model=args.model)

    if args.message:
        response = assistant.respond(args.message)
        print(response.text)
        return

    print("Retail AI Assistant. Type 'exit' to quit.")
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in {"exit", "quit"}:
            break
        if not user_input:
            continue
        response = assistant.respond(user_input)
        print(f"Assistant: {response.text}")


if __name__ == "__main__":
    main()
