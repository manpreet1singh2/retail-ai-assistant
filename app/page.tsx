import { ChatApp } from '@/components/chat-app';
import { getOverview } from '@/lib/retail';

export default function Page() {
  const overview = getOverview();

  return (
    <main className="page">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="card hero-copy">
          <div className="kicker">✦ Retail AI Assistant</div>
          <h1>Product, order &amp; returns intelligence.</h1>
          <p className="lead">
            A production-grade AI assistant grounded in live catalog data. Search products with
            multi-constraint reasoning, look up orders, and evaluate returns against policy —
            with zero hallucination via mandatory tool calling.
          </p>
          <div className="tag-row">
            <span className="tag">Tool-based reasoning</span>
            <span className="tag">Hallucination prevention</span>
            <span className="tag">Policy-aware returns</span>
            <span className="tag">OpenAI + local fallback</span>
          </div>
        </div>

        <div className="card hero-stats">
          {[
            { icon: '🛍️', label: 'Products',   value: overview.productCount,  sub: 'live catalog entries' },
            { icon: '📦', label: 'Orders',     value: overview.orderCount,    sub: 'imported records' },
            { icon: '🏷️', label: 'Vendors',    value: overview.vendorCount,   sub: 'distinct brands' },
            { icon: '🔥', label: 'On Sale',    value: overview.saleCount,     sub: 'discounted items' },
          ].map((s) => (
            <div className="mini-stat" key={s.label}>
              <div className="mini-stat-icon">{s.icon}</div>
              <div>
                <div className="mini-stat-val">{s.value}</div>
                <div className="mini-stat-label">{s.label} · {s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Chat + Panel ── */}
      <ChatApp overview={overview} />

      <p className="page-footer">
        Data sourced from embedded catalog · Policy applied from data/policy.txt ·
        Return eligibility uses order date as reference
      </p>
    </main>
  );
}
