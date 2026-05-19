"""
Retail AI Assistant — CLI entry point.

Usage:
  python main.py                        # interactive chat
  python main.py --demo                 # run all 5 assignment demo scenarios
  python main.py --debug                # interactive + show tool trace
  python main.py --message "..."        # single-shot query
  python main.py --model gpt-4o         # use a different model
"""
from __future__ import annotations

import argparse
import os
import sys
import textwrap
import time
from typing import Any

from rich import box
from rich.columns import Columns
from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from rich.rule import Rule
from rich.syntax import Syntax
from rich.table import Table
from rich.text import Text

from agent.assistant import AgentTurn, RetailAssistant

console = Console()

# ── Colour palette ────────────────────────────────────────────────────────────
C_ACCENT  = "bright_cyan"
C_USER    = "bold bright_white"
C_TOOL    = "yellow"
C_OK      = "bright_green"
C_FAIL    = "red"
C_MUTED   = "grey62"
C_HEADER  = "bold bright_cyan"

# ── Demo scenarios (video recording) ─────────────────────────────────────────
DEMO_SCENARIOS = [
    {
        "label": "🛍  Shopping Scenario 1 — Multi-Constraint",
        "category": "PERSONAL SHOPPER",
        "query": (
            "I need a modest evening gown under $300 in size 8. "
            "I prefer something on sale if possible."
        ),
        "note": "Expects: size filter + max_price + sale priority + stock check + bestseller_score ranking",
    },
    {
        "label": "🛍  Shopping Scenario 2 — Bestseller Awareness",
        "category": "PERSONAL SHOPPER",
        "query": (
            "Can you show me your best-selling sparkle or sequin dresses "
            "for prom? Budget is $250, I'm a size 10."
        ),
        "note": "Expects: keyword search + size + max_price + bestseller_score sorting",
    },
    {
        "label": "📦  Support Scenario 1 — Return Eligible",
        "category": "CUSTOMER SUPPORT",
        "query": (
            "Hi, I placed order O0001 about 5 days ago and the dress doesn't fit. "
            "Can I return it? My request date would be 2026-02-02."
        ),
        "note": "Expects: get_order → evaluate_return (within 14-day window) → eligible",
    },
    {
        "label": "📦  Support Scenario 2 — Return Ineligible (Vendor Rule)",
        "category": "CUSTOMER SUPPORT",
        "query": (
            "I need to return order O0044. I bought this dress a while back "
            "and it doesn't fit at all. Can I get a refund?"
        ),
        "note": "Expects: get_order → evaluate_return → Aurelia Couture = exchanges only",
    },
    {
        "label": "🚫  Edge Case — Invalid Order ID",
        "category": "EDGE CASE",
        "query": "What's the status of order O9999? I need to return it.",
        "note": "Expects: get_order returns found:false → agent refuses to fabricate",
    },
]


# ── Rendering helpers ─────────────────────────────────────────────────────────

def render_tool_trace(steps: list[Any], *, full: bool = False) -> None:
    """Print a collapsible tool trace table."""
    if not steps:
        return

    console.print()
    console.rule(f"[{C_MUTED}]  ⚙  Tool Trace ({len(steps)} call{'s' if len(steps) != 1 else ''})", style=C_MUTED)

    for i, step in enumerate(steps, 1):
        # Header
        console.print(
            f"  [{C_TOOL}]#{i}  {step.tool}[/]",
            f"  [{C_MUTED}]args →[/]",
            Text(str(step.arguments), style=C_MUTED),
        )

        if full:
            # Show abbreviated JSON output
            import json
            out_json = json.dumps(step.output, indent=2, default=str)
            lines = out_json.splitlines()
            if len(lines) > 30:
                out_json = "\n".join(lines[:30]) + f"\n  ... ({len(lines) - 30} more lines)"
            console.print(
                Syntax(out_json, "json", theme="monokai", line_numbers=False,
                       background_color="default"),
                style="",
            )
        else:
            # Compact single-line summary
            out = step.output
            if isinstance(out, dict):
                found = out.get("found")
                count = out.get("count") or out.get("total_matching")
                eligible = out.get("eligible")
                if found is not None:
                    status = f"[{C_OK}]found=True[/]" if found else f"[{C_FAIL}]found=False[/]"
                elif count is not None:
                    status = f"[{C_OK}]{count} result(s)[/]"
                elif eligible is not None:
                    status = (f"[{C_OK}]eligible=True[/]" if eligible
                              else f"[{C_FAIL}]eligible=False[/]")
                else:
                    status = f"[{C_MUTED}]ok[/]"
                console.print(f"        result → {status}")

    console.rule(style=C_MUTED)


def render_response(turn: AgentTurn, *, debug: bool = False) -> None:
    """Render the assistant's reply with optional tool trace."""
    if debug:
        render_tool_trace(turn.steps, full=True)

    console.print()
    console.print(
        Panel(
            Markdown(turn.text),
            title=f"[{C_HEADER}]🤖  Assistant[/]",
            border_style=C_ACCENT,
            padding=(1, 2),
        )
    )


def render_user_message(msg: str) -> None:
    console.print()
    console.print(
        Panel(
            msg,
            title=f"[{C_USER}]👤  You[/]",
            border_style="white",
            padding=(0, 2),
        )
    )


def render_scenario_header(scenario: dict, index: int, total: int) -> None:
    console.print()
    console.print(Rule(
        f"[bold]{scenario['label']}[/]  [{C_MUTED}]({index}/{total})[/]",
        style=C_ACCENT,
    ))

    table = Table(show_header=False, box=box.SIMPLE, padding=(0, 1))
    table.add_column(style=C_MUTED, justify="right")
    table.add_column()
    table.add_row("Category", f"[bold]{scenario['category']}[/]")
    table.add_row("What to verify", f"[{C_MUTED}]{scenario['note']}[/]")
    console.print(table)


def render_welcome_banner() -> None:
    console.print()
    console.print(Panel(
        textwrap.dedent("""\
            [bold bright_cyan]Retail AI Assistant[/]  —  Pre-Interview Assignment

            [grey62]A tool-based agentic AI for:[/]
              [bright_white]•[/] Product recommendations  (Personal Shopper)
              [bright_white]•[/] Order lookup & return evaluation  (Support Agent)

            [grey62]Commands[/]
              [yellow]--demo[/]     run all 5 recorded demo scenarios
              [yellow]--debug[/]    show full tool call trace in every reply
              [yellow]--message[/]  single-shot non-interactive query
              [yellow]Type [bold]exit[/] or [bold]quit[/] to leave interactive mode[/]
        """),
        border_style=C_ACCENT,
        padding=(1, 3),
    ))


# ── Demo runner ───────────────────────────────────────────────────────────────

def run_demo(model: str) -> None:
    """Run all assignment demo scenarios in sequence."""
    assistant = RetailAssistant(model=model)

    console.print()
    console.print(Rule("[bold bright_cyan]  RETAIL AI — DEMO MODE  [/]", style=C_ACCENT))
    console.print(f"  [{C_MUTED}]Running {len(DEMO_SCENARIOS)} scenarios · model: {model}[/]")

    for i, scenario in enumerate(DEMO_SCENARIOS, 1):
        render_scenario_header(scenario, i, len(DEMO_SCENARIOS))
        render_user_message(scenario["query"])

        with console.status(f"[{C_MUTED}]Calling agent…[/]", spinner="dots"):
            turn = assistant.respond(scenario["query"])

        # Always show tool trace in demo mode
        render_tool_trace(turn.steps, full=False)
        render_response(turn, debug=False)

        # Pause between scenarios
        if i < len(DEMO_SCENARIOS):
            time.sleep(0.4)
            console.input(f"\n  [{C_MUTED}][ Press Enter for next scenario ][/]")

    console.print()
    console.print(Rule("[bold bright_green]  ALL SCENARIOS COMPLETE  [/]", style=C_OK))
    console.print()


# ── Interactive chat ──────────────────────────────────────────────────────────

def run_interactive(model: str, debug: bool) -> None:
    assistant = RetailAssistant(model=model)

    render_welcome_banner()
    console.print(f"\n  [{C_MUTED}]Model: {model} · debug: {'on' if debug else 'off'}[/]\n")

    while True:
        try:
            user_input = console.input(f"[{C_USER}]You › [/]").strip()
        except (KeyboardInterrupt, EOFError):
            console.print(f"\n[{C_MUTED}]Goodbye.[/]")
            break

        if not user_input:
            continue
        if user_input.lower() in {"exit", "quit", "q"}:
            console.print(f"[{C_MUTED}]Goodbye.[/]")
            break
        if user_input.lower() in {"reset", "clear"}:
            assistant.reset()
            console.print(f"[{C_OK}]Conversation history cleared.[/]")
            continue

        with console.status(f"[{C_MUTED}]Thinking…[/]", spinner="dots"):
            turn = assistant.respond(user_input)

        if debug:
            render_tool_trace(turn.steps, full=True)
        else:
            render_tool_trace(turn.steps, full=False)

        render_response(turn, debug=False)


# ── Single-shot ───────────────────────────────────────────────────────────────

def run_single(message: str, model: str, debug: bool) -> None:
    assistant = RetailAssistant(model=model)
    render_user_message(message)

    with console.status(f"[{C_MUTED}]Thinking…[/]", spinner="dots"):
        turn = assistant.respond(message)

    if debug:
        render_tool_trace(turn.steps, full=True)
    else:
        render_tool_trace(turn.steps, full=False)

    render_response(turn, debug=False)


# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Retail AI Assistant — agentic CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent("""\
            Examples:
              python main.py
              python main.py --demo
              python main.py --debug
              python main.py --message "I need a size 8 evening gown under $200"
        """),
    )
    parser.add_argument("--demo",    action="store_true", help="Run all 5 assignment demo scenarios")
    parser.add_argument("--debug",   action="store_true", help="Show full tool trace for every response")
    parser.add_argument("--message", type=str,            help="Single-shot query (non-interactive)")
    parser.add_argument("--model",   type=str, default="gpt-4o-mini", help="OpenAI model (default: gpt-4o-mini)")
    args = parser.parse_args()

    if not os.getenv("OPENAI_API_KEY"):
        console.print(
            Panel(
                "[red bold]OPENAI_API_KEY is not set.[/]\n\n"
                "Export it before running:\n"
                "[yellow]  export OPENAI_API_KEY=sk-...[/]",
                title="[red]Configuration Error[/]",
                border_style="red",
            )
        )
        sys.exit(1)

    if args.demo:
        run_demo(args.model)
    elif args.message:
        run_single(args.message, args.model, args.debug)
    else:
        run_interactive(args.model, args.debug)


if __name__ == "__main__":
    main()
