'use client';

import { useMemo, useState } from 'react';

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

type Message = { role: 'user' | 'assistant'; content: string; trace?: any[] };

const samples = [
  'show me the best-selling options under $250',
  'tell me about product P0048',
  'check order O0041',
  'can I return order O0044 because it arrived late?',
];

export function ChatApp({ overview }: { overview: Overview }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Welcome to Retail AI Assistant. Ask me to search products, look up a product or order, or check whether an order is eligible for return.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const starterCards = useMemo(
    () => [
      { label: 'Products', value: overview.productCount.toString(), note: 'Live catalog entries' },
      { label: 'Orders', value: overview.orderCount.toString(), note: 'Imported order records' },
      { label: 'Vendors', value: overview.vendorCount.toString(), note: 'Distinct brands in catalog' },
      { label: 'Sale items', value: overview.saleCount.toString(), note: 'Discounted inventory' },
    ],
    [overview],
  );

  async function send(message: string) {
    const text = message.trim();
    if (!text || loading) return;
    setMessages((current) => [...current, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: text }] }),
      });
      const data = await response.json();
      setMessages((current) => [...current, { role: 'assistant', content: data.reply, trace: data.trace ?? [] }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: 'The assistant could not reach the chat API. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid">
      <section className="card panel">
        <h2>Retail intelligence</h2>
        <p>
          Search the catalog, inspect orders, and validate returns with grounded responses powered by the local data files.
        </p>
        <div className="stat-grid" style={{ marginTop: 18 }}>
          {starterCards.map((card) => (
            <div className="stat" key={card.label}>
              <div className="stat-label">{card.label}</div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-note">{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="stat-label">Policy summary</div>
          <div className="badge-row">
            <span className="badge">Normal: {overview.policySummary.normal}</span>
            <span className="badge">Sale: {overview.policySummary.sale}</span>
            <span className="badge">Clearance: {overview.policySummary.clearance}</span>
            <span className="badge">Nocturne: {overview.policySummary.nocturne}</span>
            <span className="badge">Aurelia: {overview.policySummary.aurelia}</span>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="stat-label">Top rated products</div>
          <div className="sample-grid">
            {overview.topRated.map((product) => (
              <div className="sample" key={product.product_id} onClick={() => send(`Tell me about product ${product.product_id}`)}>
                <strong>{product.title}</strong>
                <div className="muted" style={{ marginTop: 4 }}>
                  {product.product_id} · {product.vendor} · ${product.price} · score {product.bestseller_score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card chat-shell">
        <div className="chat-header">
          <div>
            <div className="kicker">Live assistant</div>
            <h2 style={{ marginTop: 10, marginBottom: 8 }}>Ask in plain English</h2>
            <p className="muted" style={{ margin: 0 }}>
              The assistant uses tool-based reasoning to stay grounded in the catalog, orders, and policy text.
            </p>
          </div>
          <div className="badge">{loading ? 'Thinking…' : 'Ready'}</div>
        </div>

        <div className="chat-history">
          {messages.map((message, index) => (
            <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
              <div className="bubble">
                {message.content}
                {message.role === 'assistant' && message.trace?.length ? (
                  <div className="tool-trace">
                    <div style={{ color: 'var(--text)', fontWeight: 600, marginBottom: 6 }}>Tool trace</div>
                    {message.trace.map((item, traceIndex) => (
                      <div className="trace-item" key={traceIndex}>
                        <div style={{ color: 'var(--accent)' }}>{item.tool}</div>
                        <div>{JSON.stringify(item.args)}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-composer">
          <div className="composer-row">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about products, orders, or returns…"
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void send(input);
                }
              }}
            />
            <button className="send-btn" onClick={() => void send(input)} disabled={loading}>
              {loading ? 'Working…' : 'Send'}
            </button>
          </div>
          <div className="helper-row">
            <span>Press Enter to send, Shift+Enter for a new line.</span>
            <div>
              {samples.map((sample) => (
                <button key={sample} className="badge" style={{ marginLeft: 8, cursor: 'pointer' }} onClick={() => setInput(sample)}>
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
