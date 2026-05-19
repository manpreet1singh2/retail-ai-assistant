import { ChatApp } from '@/components/chat-app';
import { getOverview } from '@/lib/retail';

export default function Page() {
  const overview = getOverview();

  return (
    <main className="main-shell">
      <section className="hero">
        <div className="card hero-copy">
          <div className="kicker">retail ai assistant</div>
          <h1>Professional product, order, and returns intelligence.</h1>
          <p className="lead">
            A polished web interface for exploring the retail catalog, checking order records, and evaluating returns against the provided policy files.
            The assistant is grounded in the local data set and can optionally use OpenAI function calling when an API key is configured.
          </p>
          <div className="badge-row">
            <span className="badge">Pandas-style local data handling</span>
            <span className="badge">Tool-based reasoning</span>
            <span className="badge">Hallucination prevention</span>
            <span className="badge">Responsive Next.js UI</span>
          </div>
        </div>

        <div className="card hero-stats">
          <div className="stat-grid">
            <div className="stat">
              <div className="stat-label">Catalog size</div>
              <div className="stat-value">{overview.productCount}</div>
              <div className="stat-note">Products loaded from data/products.csv</div>
            </div>
            <div className="stat">
              <div className="stat-label">Orders</div>
              <div className="stat-value">{overview.orderCount}</div>
              <div className="stat-note">Orders loaded from data/orders.csv</div>
            </div>
            <div className="stat">
              <div className="stat-label">Vendors</div>
              <div className="stat-value">{overview.vendorCount}</div>
              <div className="stat-note">Across the live inventory</div>
            </div>
            <div className="stat">
              <div className="stat-label">Sale items</div>
              <div className="stat-value">{overview.saleCount}</div>
              <div className="stat-note">Policy-aware sale handling</div>
            </div>
          </div>
        </div>
      </section>

      <ChatApp overview={overview} />

      <div className="footer-note">
        Return rules are read from data/policy.txt. The app uses the order date as the available time reference because the provided order file does not contain delivery dates.
      </div>
    </main>
  );
}
