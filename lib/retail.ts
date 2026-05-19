import fs from 'node:fs';
import path from 'node:path';

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

export type ProductLookupResult = { found: false; product_id: string; error: string } | ({ found: true } & Product);
export type OrderLookupResult = { found: false; order_id: string; error: string } | (Order & { found: true; product?: Product });
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

const DATA_DIR = path.join(process.cwd(), 'data');

function readText(file: string) {
  return fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1;
      if (cell.length > 0 || row.length > 0) {
        row.push(cell);
        rows.push(row);
      }
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((r) => r.length > 0 && r.some((c) => c.trim().length > 0));
}

function parseBool(value: string) {
  return value.trim().toLowerCase() === 'true';
}

function parseStock(stock: string): Record<string, number> {
  try {
    const normalized = stock.replace(/'/g, '"');
    const parsed = JSON.parse(normalized) as Record<string, number>;
    return Object.fromEntries(Object.entries(parsed).map(([key, val]) => [key, Number(val)]));
  } catch {
    return {};
  }
}

function parseProducts(): Product[] {
  const rows = parseCsv(readText('products.csv'));
  const [header, ...data] = rows;
  const index = Object.fromEntries(header.map((name, i) => [name, i])) as Record<string, number>;

  return data.map((row) => ({
    product_id: row[index.product_id],
    title: row[index.title],
    vendor: row[index.vendor],
    price: Number(row[index.price]),
    compare_at_price: Number(row[index.compare_at_price]),
    tags: row[index.tags].split(',').map((s) => s.trim()).filter(Boolean),
    sizes_available: row[index.sizes_available].split('|').map((s) => s.trim()).filter(Boolean),
    stock_per_size: parseStock(row[index.stock_per_size]),
    is_sale: parseBool(row[index.is_sale]),
    is_clearance: parseBool(row[index.is_clearance]),
    bestseller_score: Number(row[index.bestseller_score]),
  }));
}

function parseOrders(): Order[] {
  const rows = parseCsv(readText('orders.csv'));
  const [header, ...data] = rows;
  const index = Object.fromEntries(header.map((name, i) => [name, i])) as Record<string, number>;

  return data.map((row) => ({
    order_id: row[index.order_id],
    order_date: row[index.order_date],
    product_id: row[index.product_id],
    size: row[index.size],
    price_paid: Number(row[index.price_paid]),
    customer_id: row[index.customer_id],
  }));
}

export function loadPolicyText() {
  return readText('policy.txt');
}

export function loadProducts() {
  return parseProducts();
}

export function loadOrders() {
  return parseOrders();
}

export function getOverview() {
  const products = loadProducts();
  const orders = loadOrders();
  const vendors = new Set(products.map((p) => p.vendor));
  const saleCount = products.filter((p) => p.is_sale).length;
  const clearanceCount = products.filter((p) => p.is_clearance).length;
  const topRated = [...products].sort((a, b) => b.bestseller_score - a.bestseller_score).slice(0, 5);

  return {
    productCount: products.length,
    orderCount: orders.length,
    vendorCount: vendors.size,
    saleCount,
    clearanceCount,
    topRated,
    policySummary: {
      normal: '14 days for a full refund',
      sale: '7 days for store credit only',
      clearance: 'final sale',
      nocturne: '21-day extended window',
      aurelia: 'exchanges only',
    },
  };
}

export function searchProducts({
  query = '',
  max_price,
  in_stock,
  top_k = 6,
}: {
  query?: string;
  max_price?: number | null;
  in_stock?: boolean | null;
  top_k?: number;
}) {
  const products = loadProducts();
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = products.filter((product) => {
    const stockTotal = Object.values(product.stock_per_size).reduce((sum, value) => sum + value, 0);
    if (typeof max_price === 'number' && product.price > max_price) return false;
    if (in_stock === true && stockTotal <= 0) return false;
    if (in_stock === false && stockTotal > 0) return false;
    if (!tokens.length) return true;
    const haystack = `${product.product_id} ${product.title} ${product.vendor} ${product.tags.join(' ')}`.toLowerCase();
    return tokens.some((token) => haystack.includes(token));
  });

  const ranked = filtered
    .map((product) => ({
      product,
      score: tokens.length
        ? tokens.reduce(
            (score, token) => score + Number(`${product.product_id} ${product.title} ${product.vendor} ${product.tags.join(' ')}`.toLowerCase().includes(token)),
            0,
          )
        : product.bestseller_score,
    }))
    .sort((a, b) => b.score - a.score || b.product.bestseller_score - a.product.bestseller_score || a.product.price - b.product.price)
    .slice(0, top_k)
    .map((entry) => entry.product);

  return {
    query,
    count: filtered.length,
    found: ranked.length > 0,
    results: ranked,
  };
}

export function getProduct(productId: string): ProductLookupResult {
  const product = loadProducts().find((item) => item.product_id === productId);
  if (!product) return { found: false, product_id: productId, error: 'Product not found' };
  return { found: true, ...product };
}

export function getOrder(orderId: string): OrderLookupResult {
  const order = loadOrders().find((item) => item.order_id === orderId);
  if (!order) return { found: false, order_id: orderId, error: 'Order not found' };
  const product = getProduct(order.product_id);
  return { found: true, ...order, product: product.found ? product : undefined };
}

function parseDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function daysBetween(a: string, b: string) {
  return Math.floor((parseDate(a).getTime() - parseDate(b).getTime()) / (1000 * 60 * 60 * 24));
}

export function evaluateReturn({
  order_id,
  reason = '',
  request_date,
}: {
  order_id: string;
  reason?: string;
  request_date?: string;
}): ReturnEvaluationResult {
  const orderResult = getOrder(order_id);
  if (!orderResult.found) {
    return {
      eligible: false,
      order_id,
      reason: 'Order not found',
      next_steps: ['Ask the customer for a valid order ID.'],
    };
  }

  const order = orderResult;
  const product = order.product as Product | undefined;
  const requestDate = request_date ?? new Date().toISOString().slice(0, 10);
  const policyText = loadPolicyText();
  const normalWindow = 14;
  const saleWindow = 7;
  const nocturneWindow = 21;
  const vendor = product?.vendor?.toLowerCase() ?? '';
  const isSale = Boolean(product?.is_sale);
  const isClearance = Boolean(product?.is_clearance);
  const ageDays = daysBetween(requestDate, order.order_date);

  if (isClearance) {
    return {
      eligible: false,
      order_id,
      request_date: requestDate,
      order_date: order.order_date,
      days_since_order: ageDays,
      return_window_days: 0,
      reason: 'Clearance items are final sale and are not eligible for return or exchange.',
      policy_excerpt: policyText,
      order,
      next_steps: ['Offer size-exchange support only if allowed by the inventory rules and the customer asks for it.'],
    };
  }

  if (vendor === 'aurelia couture') {
    return {
      eligible: false,
      order_id,
      request_date: requestDate,
      order_date: order.order_date,
      days_since_order: ageDays,
      return_window_days: 0,
      reason: 'Aurelia Couture allows exchanges only, with no refunds.',
      policy_excerpt: policyText,
      order,
      next_steps: ['Offer an exchange if the desired size is available.'],
    };
  }

  const returnWindow = vendor === 'nocturne' ? nocturneWindow : isSale ? saleWindow : normalWindow;
  const eligible = ageDays >= 0 && ageDays <= returnWindow;

  return {
    eligible,
    order_id,
    request_date: requestDate,
    order_date: order.order_date,
    days_since_order: ageDays,
    return_window_days: returnWindow,
    reason: eligible
      ? `Request is within the ${returnWindow}-day window based on the order date.`
      : `Request is outside the ${returnWindow}-day window based on the order date.`,
    customer_reason: reason || undefined,
    policy_excerpt: policyText,
    order,
    next_steps: eligible
      ? [isSale ? 'Process for store credit only.' : 'Proceed with return instructions for a refund.']
      : ['Explain the return window and offer exchange support if stock is available.'],
  };
}

export function toolSchemas() {
  return [
    {
      type: 'function' as const,
      function: {
        name: 'search_products',
        description: 'Search the product catalog by keywords and optional filters.',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            max_price: { type: ['number', 'null'] },
            in_stock: { type: ['boolean', 'null'] },
            top_k: { type: 'integer', default: 6 },
          },
          required: [],
        },
      },
    },
    {
      type: 'function' as const,
      function: {
        name: 'get_product',
        description: 'Fetch one product by product_id.',
        parameters: { type: 'object', properties: { product_id: { type: 'string' } }, required: ['product_id'] },
      },
    },
    {
      type: 'function' as const,
      function: {
        name: 'get_order',
        description: 'Fetch one order by order_id and include the matching product.',
        parameters: { type: 'object', properties: { order_id: { type: 'string' } }, required: ['order_id'] },
      },
    },
    {
      type: 'function' as const,
      function: {
        name: 'evaluate_return',
        description: 'Evaluate return eligibility using the provided policy and order date.',
        parameters: {
          type: 'object',
          properties: {
            order_id: { type: 'string' },
            reason: { type: 'string' },
            request_date: { type: 'string' },
          },
          required: ['order_id'],
        },
      },
    },
  ];
}

export function executeTool(name: string, args: Record<string, unknown>) {
  if (name === 'search_products') return searchProducts(args as any);
  if (name === 'get_product') return getProduct(String((args as any).product_id));
  if (name === 'get_order') return getOrder(String((args as any).order_id));
  if (name === 'evaluate_return') return evaluateReturn(args as any);
  throw new Error(`Unknown tool: ${name}`);
}

export function formatLocalResponse(query: string) {
  const orderMatch = query.match(/\bO\d{4}\b/i)?.[0];
  const productMatch = query.match(/\bP\d{4}\b/i)?.[0];
  const lower = query.toLowerCase();

  if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) {
    if (!orderMatch) return { text: 'Please share your order ID so I can check the return policy against the order record.', trace: [] };
    const result = evaluateReturn({ order_id: orderMatch, reason: query });
    return {
      text: result.eligible
        ? `Order ${orderMatch} is eligible for return. ${result.reason} ${result.next_steps?.[0] ?? ''}`
        : `Order ${orderMatch} is not eligible for return. ${result.reason} ${result.next_steps?.[0] ?? ''}`,
      trace: [{ tool: 'evaluate_return', args: { order_id: orderMatch, reason: query }, output: result }],
    };
  }

  if (orderMatch && (lower.includes('order') || lower.includes('status') || lower.includes('details'))) {
    const result = getOrder(orderMatch);
    return {
      text: result.found
        ? `Order ${orderMatch} is recorded for product ${result.product_id} on ${result.order_date}.`
        : `I could not find order ${orderMatch} in the data.`,
      trace: [{ tool: 'get_order', args: { order_id: orderMatch }, output: result }],
    };
  }

  if (productMatch) {
    const result = getProduct(productMatch);
    return {
      text: result.found
        ? `${result.title} by ${result.vendor} is priced at $${result.price}.`
        : `I could not find product ${productMatch} in the catalog.`,
      trace: [{ tool: 'get_product', args: { product_id: productMatch }, output: result }],
    };
  }

  const search = searchProducts({ query, top_k: 6 });
  return {
    text: search.found
      ? `I found ${search.count} matching products. The top options include ${search.results
          .slice(0, 3)
          .map((p) => `${p.title} (${p.product_id})`)
          .join(', ')}.`
      : 'I did not find a clear match in the catalog. Try a product ID, vendor name, or a specific style keyword.',
    trace: [{ tool: 'search_products', args: { query, top_k: 6 }, output: search }],
  };
}
