/**
 * Retail AI — core data layer & tool implementations
 *
 * All data is sourced from embedded TypeScript constants (lib/embedded-data.ts)
 * so the module has zero Node.js `fs` dependency and works correctly in both
 * Vercel Serverless and local Next.js dev environments.
 */

import { PRODUCTS_RAW, ORDERS_RAW, POLICY_TEXT } from './embedded-data';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Product = {
  product_id: string;
  title: string;
  vendor: string;
  price: number;
  compare_at_price: number;
  tags: string[];
  sizes_available: string[];
  stock_per_size: Record<string, number>;
  is_sale: boolean;
  is_clearance: boolean;
  bestseller_score: number;
};

export type Order = {
  order_id: string;
  order_date: string;
  product_id: string;
  size: string;
  price_paid: number;
  customer_id: string;
  product?: Product;
};

export type ProductLookupResult =
  | { found: false; product_id: string; error: string }
  | ({ found: true } & Product);

export type OrderLookupResult =
  | { found: false; order_id: string; error: string }
  | (Order & { found: true; product?: Product });

export type ReturnEvaluationResult = {
  eligible: boolean;
  order_id: string;
  request_date?: string;
  order_date?: string;
  days_since_order?: number;
  return_window_days?: number;
  reason: string;
  customer_reason?: string;
  policy_excerpt?: string;
  order?: OrderLookupResult;
  next_steps: string[];
};

// ─── Data accessors (in-memory — no filesystem I/O) ──────────────────────────

export function loadProducts(): Product[] {
  return PRODUCTS_RAW as unknown as Product[];
}

export function loadOrders(): Order[] {
  return ORDERS_RAW as unknown as Order[];
}

export function loadPolicyText(): string {
  return POLICY_TEXT;
}

// ─── Overview ─────────────────────────────────────────────────────────────────

export function getOverview() {
  const products = loadProducts();
  const orders   = loadOrders();

  const vendors        = new Set(products.map((p) => p.vendor));
  const saleCount      = products.filter((p) => p.is_sale).length;
  const clearanceCount = products.filter((p) => p.is_clearance).length;
  const topRated       = [...products]
    .sort((a, b) => b.bestseller_score - a.bestseller_score)
    .slice(0, 5);

  return {
    productCount: products.length,
    orderCount:   orders.length,
    vendorCount:  vendors.size,
    saleCount,
    clearanceCount,
    topRated,
    policySummary: {
      normal:    '14 days for a full refund',
      sale:      '7 days for store credit only',
      clearance: 'final sale — no returns',
      nocturne:  '21-day extended window',
      aurelia:   'exchanges only — no refunds',
    },
  };
}

// ─── Tool: search_products ────────────────────────────────────────────────────

export function searchProducts({
  query    = '',
  size,
  max_price,
  in_stock,
  sale_only,
  top_k = 8,
}: {
  query?:     string;
  size?:      string | null;
  max_price?: number | null;
  in_stock?:  boolean | null;
  sale_only?: boolean | null;
  top_k?:     number;
}) {
  const products = loadProducts();
  const tokens   = query.toLowerCase().split(/\s+/).filter(Boolean);

  const filtered = products.filter((p) => {
    if (typeof max_price === 'number' && p.price > max_price) return false;
    if (sale_only === true && !p.is_sale) return false;

    if (size) {
      const s = String(size).trim();
      if (!p.sizes_available.includes(s)) return false;
      if (in_stock === true && (p.stock_per_size[s] ?? 0) <= 0) return false;
    } else {
      const totalStock = Object.values(p.stock_per_size).reduce((s, v) => s + v, 0);
      if (in_stock === true  && totalStock <= 0) return false;
      if (in_stock === false && totalStock >  0) return false;
    }

    if (!tokens.length) return true;
    const haystack = `${p.product_id} ${p.title} ${p.vendor} ${p.tags.join(' ')}`.toLowerCase();
    return tokens.some((t) => haystack.includes(t));
  });

  const ranked = filtered
    .map((p) => {
      const haystack  = `${p.product_id} ${p.title} ${p.vendor} ${p.tags.join(' ')}`.toLowerCase();
      const kwHits    = tokens.reduce((n, t) => n + Number(haystack.includes(t)), 0);
      const saleBonus = p.is_sale ? 5 : 0;
      return { p, score: kwHits + saleBonus };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.p.bestseller_score - a.p.bestseller_score ||
        a.p.price - b.p.price,
    )
    .slice(0, top_k)
    .map((e) => e.p);

  return {
    query,
    filters_applied: {
      size:      size      ?? null,
      max_price: max_price ?? null,
      in_stock:  in_stock  ?? null,
      sale_only: sale_only ?? null,
    },
    total_matching: filtered.length,
    found: ranked.length > 0,
    results: ranked,
  };
}

// ─── Tool: get_product ────────────────────────────────────────────────────────

export function getProduct(productId: string): ProductLookupResult {
  const p = loadProducts().find((item) => item.product_id === productId);
  if (!p) return { found: false, product_id: productId, error: `Product ${productId} not found in catalog.` };
  return { found: true, ...p };
}

// ─── Tool: get_order ──────────────────────────────────────────────────────────

export function getOrder(orderId: string): OrderLookupResult {
  const o = loadOrders().find((item) => item.order_id === orderId);
  if (!o) return { found: false, order_id: orderId, error: `Order ${orderId} not found. Please verify the order ID.` };
  const product = getProduct(o.product_id);
  return { found: true, ...o, product: product.found ? product : undefined };
}

// ─── Tool: evaluate_return ────────────────────────────────────────────────────

function parseDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function daysBetween(later: string, earlier: string) {
  return Math.floor(
    (parseDate(later).getTime() - parseDate(earlier).getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function evaluateReturn({
  order_id,
  reason        = '',
  request_date,
}: {
  order_id:      string;
  reason?:       string;
  request_date?: string;
}): ReturnEvaluationResult {
  const orderResult = getOrder(order_id);

  if (!orderResult.found) {
    return {
      eligible:   false,
      order_id,
      reason:     `Order ${order_id} was not found. Cannot process return without a valid order record.`,
      next_steps: ['Ask the customer to provide a valid order ID.'],
    };
  }

  const order       = orderResult;
  const product     = order.product as Product | undefined;
  const requestDate = request_date ?? new Date().toISOString().slice(0, 10);
  const policyText  = loadPolicyText();

  const isSale      = Boolean(product?.is_sale);
  const isClearance = Boolean(product?.is_clearance);
  const vendor      = product?.vendor?.toLowerCase() ?? '';
  const ageDays     = daysBetween(requestDate, order.order_date);

  if (isClearance) {
    return {
      eligible:          false,
      order_id,
      request_date:      requestDate,
      order_date:        order.order_date,
      days_since_order:  ageDays,
      return_window_days: 0,
      reason:            'Clearance items are final sale and are not eligible for return or exchange.',
      policy_excerpt:    policyText,
      order,
      next_steps:        ['Inform the customer that clearance items cannot be returned.'],
    };
  }

  if (vendor === 'aurelia couture') {
    return {
      eligible:          false,
      order_id,
      request_date:      requestDate,
      order_date:        order.order_date,
      days_since_order:  ageDays,
      return_window_days: 0,
      reason:            'Aurelia Couture items are exchange-only. No refunds are available for this vendor.',
      policy_excerpt:    policyText,
      order,
      next_steps:        ['Offer a size exchange if the desired size is in stock.'],
    };
  }

  const returnWindow = vendor === 'nocturne' ? 21 : isSale ? 7 : 14;
  const eligible     = ageDays >= 0 && ageDays <= returnWindow;

  return {
    eligible,
    order_id,
    request_date:      requestDate,
    order_date:        order.order_date,
    days_since_order:  ageDays,
    return_window_days: returnWindow,
    reason: eligible
      ? `Return is within the ${returnWindow}-day window (${ageDays} days since order date).`
      : `Return window of ${returnWindow} days has expired (${ageDays} days since order date).`,
    customer_reason: reason || undefined,
    policy_excerpt:  policyText,
    order,
    next_steps: eligible
      ? [isSale ? 'Process for store credit only (sale item policy).' : 'Proceed with full refund.']
      : ['Explain the return window has closed. Offer size exchange if stock allows.'],
  };
}

// ─── Tool schemas (OpenAI function-calling format) ────────────────────────────

export function toolSchemas() {
  return [
    {
      type: 'function' as const,
      function: {
        name:        'search_products',
        description:
          'Search the product catalog with optional filters for size, price, stock, and sale status. ' +
          'Always call this before recommending products — never guess from memory.',
        parameters: {
          type:       'object',
          properties: {
            query:     { type: 'string',            description: 'Keywords: style, occasion, vendor, tag (e.g. "evening gown modest")' },
            size:      { type: ['string', 'null'],  description: 'Dress size to filter by (e.g. "8")' },
            max_price: { type: ['number', 'null'],  description: 'Max price USD' },
            in_stock:  { type: ['boolean', 'null'], description: 'true = in-stock only' },
            sale_only: { type: ['boolean', 'null'], description: 'true = sale items only' },
            top_k:     { type: 'integer',           description: 'Max results (default 8)' },
          },
          required: [],
        },
      },
    },
    {
      type: 'function' as const,
      function: {
        name:        'get_product',
        description: 'Fetch full details for one product by its product_id (e.g. "P0048").',
        parameters:  {
          type:       'object',
          properties: { product_id: { type: 'string' } },
          required:   ['product_id'],
        },
      },
    },
    {
      type: 'function' as const,
      function: {
        name:        'get_order',
        description: 'Fetch an order record by order_id (e.g. "O0041") including its product details.',
        parameters:  {
          type:       'object',
          properties: { order_id: { type: 'string' } },
          required:   ['order_id'],
        },
      },
    },
    {
      type: 'function' as const,
      function: {
        name:        'evaluate_return',
        description:
          'Evaluate return eligibility for an order. Applies vendor exceptions (Aurelia Couture = exchange only, ' +
          'Nocturne = 21-day window), clearance = final sale, sale = 7-day store credit, normal = 14-day refund. ' +
          'Always call this for any return, refund, or exchange question.',
        parameters: {
          type:       'object',
          properties: {
            order_id:     { type: 'string',           description: 'Order ID e.g. "O0044"' },
            reason:       { type: 'string',           description: 'Customer-stated reason for return' },
            request_date: { type: ['string', 'null'], description: 'Return request date YYYY-MM-DD; defaults to today' },
          },
          required: ['order_id'],
        },
      },
    },
  ];
}

// ─── Tool dispatcher ──────────────────────────────────────────────────────────

export function executeTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'search_products': return searchProducts(args as Parameters<typeof searchProducts>[0]);
    case 'get_product':     return getProduct(String(args.product_id));
    case 'get_order':       return getOrder(String(args.order_id));
    case 'evaluate_return': return evaluateReturn(args as Parameters<typeof evaluateReturn>[0]);
    default:                throw new Error(`Unknown tool: ${name}`);
  }
}

// ─── Local (no-OpenAI) fallback ───────────────────────────────────────────────

export function formatLocalResponse(query: string) {
  const orderMatch   = query.match(/\bO\d{4}\b/i)?.[0];
  const productMatch = query.match(/\bP\d{4}\b/i)?.[0];
  const lower        = query.toLowerCase();

  if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) {
    if (!orderMatch) {
      return {
        text:  'Please share your order ID (e.g. O0041) so I can check return eligibility against the order record.',
        trace: [],
      };
    }
    const result = evaluateReturn({ order_id: orderMatch, reason: query });
    return {
      text:  result.eligible
        ? `Order ${orderMatch} is eligible for return. ${result.reason} ${result.next_steps[0] ?? ''}`
        : `Order ${orderMatch} is not eligible for return. ${result.reason} ${result.next_steps[0] ?? ''}`,
      trace: [{ tool: 'evaluate_return', args: { order_id: orderMatch, reason: query }, output: result }],
    };
  }

  if (orderMatch) {
    const result = getOrder(orderMatch);
    return {
      text:  result.found
        ? `Order ${orderMatch}: product ${result.product_id}, size ${result.size}, placed ${result.order_date}, paid $${result.price_paid}.`
        : `I could not find order ${orderMatch}. Please check the order ID.`,
      trace: [{ tool: 'get_order', args: { order_id: orderMatch }, output: result }],
    };
  }

  if (productMatch) {
    const result = getProduct(productMatch);
    return {
      text:  result.found
        ? `${result.title} by ${result.vendor} — $${result.price}${result.is_sale ? ' (on sale)' : ''}. Sizes: ${result.sizes_available.join(', ')}.`
        : `Product ${productMatch} was not found in the catalog.`,
      trace: [{ tool: 'get_product', args: { product_id: productMatch }, output: result }],
    };
  }

  const search = searchProducts({ query, top_k: 6 });
  return {
    text:  search.found
      ? `Found ${search.total_matching} matching products. Top picks: ${search.results.slice(0, 3).map((p) => `${p.title} ($${p.price}${p.is_sale ? ' sale' : ''})`).join('; ')}.`
      : 'No clear match in the catalog. Try a product ID, vendor name, size, or occasion keyword.',
    trace: [{ tool: 'search_products', args: { query, top_k: 6 }, output: search }],
  };
}
