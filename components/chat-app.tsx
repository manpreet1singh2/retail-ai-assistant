'use client';

import { useMemo, useRef, useEffect, useState } from 'react';

export type Overview = {
  productCount: number;
  orderCount: number;
  vendorCount: number;
  saleCount: number;
  clearanceCount: number;
  topRated: {
    product_id: string;
    title: string;
    vendor: string;
    bestseller_score: number;
    price: number;
  }[];
  policySummary: {
    normal: string;
    sale: string;
    clearance: string;
    nocturne: string;
    aurelia: string;
  };
};

type TraceItem = { tool: string; args: unknown; output: unknown };
type Message   = { role: 'user' | 'assistant'; content: string; trace?: TraceItem[]; mode?: string };

const SAMPLES = [
  { icon: '👗', text: 'Modest evening gown under $300 in size 8, prefer sale' },
  { icon: '📦', text: 'What\'s in order O0041?' },
  { icon: '🔄', text: 'Can I return order O0044? It doesn\'t fit.' },
  { icon: '⭐', text: 'Show me best-selling options under $200' },
];

function TypingDots() {
  return (
    <span className="typing-dots" aria-label="Assistant is typing">
      <span />
      <span />
      <span />
    </span>
  );
}

function TracePanel({ trace }: { trace: TraceItem[] }) {
  const [open, setOpen] = useState(false);
  if (!trace?.length) return null;
  return (
    <div className="trace-panel">
      <button className="trace-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="trace-icon">⚙</span>
        {open ? 'Hide' : 'Show'} tool trace ({trace.length} call{trace.length !== 1 ? 's' : ''})
        <span className="trace-chevron" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div className="trace-items">
          {trace.map((item, i) => (
            <div className="trace-item" key={i}>
              <div className="trace-tool-name">{item.tool}</div>
              <div className="trace-row">
                <span className="trace-label">Args</span>
                <code className="trace-code">{JSON.stringify(item.args)}</code>
              </div>
              <div className="trace-row">
                <span className="trace-label">Output</span>
                <code className="trace-code trace-output">{JSON.stringify(item.output, null, 2)}</code>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ChatApp({ overview }: { overview: Overview }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role:    'assistant',
      content: 'Hello! I\'m your Retail AI Assistant. I can help you find the perfect product, look up orders, or check return eligibility — all grounded in live catalog data. What can I help you with?',
    },
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const statsCards = useMemo(
    () => [
      { label: 'Products',   value: overview.productCount, icon: '🛍️',  note: 'in catalog' },
      { label: 'Orders',     value: overview.orderCount,   icon: '📦',  note: 'on record' },
      { label: 'Vendors',    value: overview.vendorCount,  icon: '🏷️',  note: 'brands' },
      { label: 'On Sale',    value: overview.saleCount,    icon: '🔥',  note: 'discounted' },
    ],
    [overview],
  );

  const policyBadges = useMemo(
    () => [
      { label: 'Normal',   desc: overview.policySummary.normal,    color: 'var(--success)' },
      { label: 'Sale',     desc: overview.policySummary.sale,       color: 'var(--warning)' },
      { label: 'Clearance',desc: overview.policySummary.clearance, color: 'var(--danger)' },
      { label: 'Nocturne', desc: overview.policySummary.nocturne,  color: 'var(--accent)' },
      { label: 'Aurelia',  desc: overview.policySummary.aurelia,   color: 'var(--purple)' },
    ],
    [overview],
  );

  async function send(text: string) {
    const msg = text.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const res  = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: [...messages, { role: 'user', content: msg }] }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply ?? 'No response received.', trace: data.trace ?? [], mode: data.mode },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error — could not reach the assistant API. Please try again.' },
      ]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  return (
    <div className="app-grid">
      {/* ── Left panel ── */}
      <aside className="side-panel card">
        <div className="panel-section">
          <div className="section-label">Live Catalog Stats</div>
          <div className="stats-grid">
            {statsCards.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-icon">{s.icon}</span>
                <div className="stat-number">{s.value}</div>
                <div className="stat-meta">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-section">
          <div className="section-label">Return Policy</div>
          <div className="policy-list">
            {policyBadges.map((b) => (
              <div className="policy-row" key={b.label}>
                <span className="policy-dot" style={{ background: b.color }} />
                <div>
                  <span className="policy-name">{b.label}</span>
                  <span className="policy-desc">{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-section">
          <div className="section-label">Top Rated Products</div>
          <div className="product-list">
            {overview.topRated.map((p) => (
              <button
                key={p.product_id}
                className="product-chip"
                onClick={() => send(`Tell me about product ${p.product_id}`)}
              >
                <div className="chip-main">
                  <span className="chip-title">{p.title}</span>
                  <span className="chip-score">★ {p.bestseller_score}</span>
                </div>
                <div className="chip-meta">
                  {p.product_id} · {p.vendor} · <strong>${p.price}</strong>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Chat panel ── */}
      <section className="chat-panel card">
        <header className="chat-header">
          <div>
            <div className="header-kicker">AI Assistant</div>
            <h2 className="header-title">Ask in plain English</h2>
          </div>
          <div className={`status-pill ${loading ? 'status-busy' : 'status-ready'}`}>
            {loading ? (
              <><span className="status-dot pulse" />Thinking…</>
            ) : (
              <><span className="status-dot" />Ready</>
            )}
          </div>
        </header>

        {/* Sample prompts */}
        <div className="samples-row">
          {SAMPLES.map((s) => (
            <button key={s.text} className="sample-btn" onClick={() => send(s.text)}>
              <span>{s.icon}</span> {s.text}
            </button>
          ))}
        </div>

        {/* Message history */}
        <div className="chat-history" ref={historyRef}>
          {messages.map((m, i) => (
            <div key={i} className={`message-row ${m.role}`}>
              <div className="message-avatar">
                {m.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-body">
                <div className="bubble">{m.content}</div>
                {m.role === 'assistant' && <TracePanel trace={m.trace ?? []} />}
                {m.mode && m.mode !== 'openai' && (
                  <div className="mode-tag">{m.mode === 'local' ? '🔒 Local mode (no API key)' : `⚡ ${m.mode}`}</div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-row assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-body">
                <div className="bubble"><TypingDots /></div>
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="composer">
          <div className="composer-inner">
            <textarea
              ref={textareaRef}
              value={input}
              placeholder="Ask about products, orders, or returns…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              rows={1}
            />
            <button
              className="send-btn"
              onClick={() => void send(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              {loading ? '⏳' : '↑'}
            </button>
          </div>
          <p className="composer-hint">Enter to send · Shift+Enter for newline</p>
        </div>
      </section>
    </div>
  );
}
