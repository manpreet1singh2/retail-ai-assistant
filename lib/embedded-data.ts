// AUTO-GENERATED — do not edit manually
// Source: data/products.csv + data/orders.csv + data/policy.txt
// Embedded so Vercel serverless functions have zero filesystem dependency.

import type { Product, Order } from './retail';

export const PRODUCTS_RAW: Product[] = [
  {
    "product_id": "P0001",
    "title": "Silk Avenue Style 1",
    "vendor": "Silk Avenue",
    "price": 137.0,
    "compare_at_price": 137.0,
    "tags": [
      "cocktail",
      "lace",
      "flowy"
    ],
    "sizes_available": [
      "8",
      "4",
      "14",
      "2",
      "10"
    ],
    "stock_per_size": {
      "8": 18,
      "4": 13,
      "14": 1,
      "2": 0,
      "10": 2
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 72
  },
  {
    "product_id": "P0002",
    "title": "Velour House Style 2",
    "vendor": "Velour House",
    "price": 446.0,
    "compare_at_price": 506.0,
    "tags": [
      "evening",
      "cocktail",
      "modest"
    ],
    "sizes_available": [
      "16",
      "10",
      "6",
      "2"
    ],
    "stock_per_size": {
      "16": 5,
      "10": 13,
      "6": 10,
      "2": 8
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 49
  },
  {
    "product_id": "P0003",
    "title": "Aurelia Couture Style 3",
    "vendor": "Aurelia Couture",
    "price": 263.0,
    "compare_at_price": 303.0,
    "tags": [
      "lace",
      "bridal",
      "prom"
    ],
    "sizes_available": [
      "10",
      "14",
      "2",
      "8",
      "12",
      "4",
      "16"
    ],
    "stock_per_size": {
      "10": 17,
      "14": 9,
      "2": 20,
      "8": 19,
      "12": 11,
      "4": 18,
      "16": 6
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 99
  },
  {
    "product_id": "P0004",
    "title": "Lumiere Style 4",
    "vendor": "Lumiere",
    "price": 120.0,
    "compare_at_price": 140.0,
    "tags": [
      "modest",
      "lace",
      "cocktail"
    ],
    "sizes_available": [
      "14",
      "6",
      "8"
    ],
    "stock_per_size": {
      "14": 20,
      "6": 11,
      "8": 5
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 90
  },
  {
    "product_id": "P0005",
    "title": "Silk Avenue Style 5",
    "vendor": "Silk Avenue",
    "price": 411.0,
    "compare_at_price": 411.0,
    "tags": [
      "prom",
      "modest",
      "sleeve"
    ],
    "sizes_available": [
      "6",
      "10",
      "12",
      "4",
      "14",
      "8",
      "16"
    ],
    "stock_per_size": {
      "6": 8,
      "10": 20,
      "12": 17,
      "4": 7,
      "14": 10,
      "8": 1,
      "16": 7
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 28
  },
  {
    "product_id": "P0006",
    "title": "Eden Atelier Style 6",
    "vendor": "Eden Atelier",
    "price": 447.0,
    "compare_at_price": 487.0,
    "tags": [
      "lace",
      "flowy",
      "minimal"
    ],
    "sizes_available": [
      "16",
      "8",
      "12",
      "14"
    ],
    "stock_per_size": {
      "16": 4,
      "8": 8,
      "12": 4,
      "14": 7
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 75
  },
  {
    "product_id": "P0007",
    "title": "Nocturne Style 7",
    "vendor": "Nocturne",
    "price": 378.0,
    "compare_at_price": 438.0,
    "tags": [
      "minimal",
      "sleeve",
      "sparkle"
    ],
    "sizes_available": [
      "8",
      "4",
      "10",
      "16",
      "2"
    ],
    "stock_per_size": {
      "8": 1,
      "4": 3,
      "10": 4,
      "16": 20,
      "2": 5
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 49
  },
  {
    "product_id": "P0008",
    "title": "Eden Atelier Style 8",
    "vendor": "Eden Atelier",
    "price": 319.0,
    "compare_at_price": 359.0,
    "tags": [
      "flowy",
      "evening",
      "lace"
    ],
    "sizes_available": [
      "2",
      "12",
      "14",
      "16",
      "6",
      "8",
      "4"
    ],
    "stock_per_size": {
      "2": 3,
      "12": 9,
      "14": 13,
      "16": 5,
      "6": 14,
      "8": 0,
      "4": 8
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 81
  },
  {
    "product_id": "P0009",
    "title": "Lumiere Style 9",
    "vendor": "Lumiere",
    "price": 407.0,
    "compare_at_price": 427.0,
    "tags": [
      "fitted",
      "prom",
      "bridal"
    ],
    "sizes_available": [
      "12",
      "14",
      "4",
      "10"
    ],
    "stock_per_size": {
      "12": 16,
      "14": 0,
      "4": 19,
      "10": 10
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 40
  },
  {
    "product_id": "P0010",
    "title": "Velour House Style 10",
    "vendor": "Velour House",
    "price": 109.0,
    "compare_at_price": 129.0,
    "tags": [
      "sleeve",
      "cocktail",
      "flowy"
    ],
    "sizes_available": [
      "4",
      "2",
      "12",
      "8",
      "14",
      "6",
      "10"
    ],
    "stock_per_size": {
      "4": 4,
      "2": 15,
      "12": 17,
      "8": 5,
      "14": 8,
      "6": 16,
      "10": 19
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 89
  },
  {
    "product_id": "P0011",
    "title": "Velour House Style 11",
    "vendor": "Velour House",
    "price": 445.0,
    "compare_at_price": 485.0,
    "tags": [
      "cocktail",
      "sparkle",
      "lace"
    ],
    "sizes_available": [
      "12",
      "8",
      "10",
      "14",
      "2",
      "16"
    ],
    "stock_per_size": {
      "12": 7,
      "8": 2,
      "10": 10,
      "14": 0,
      "2": 18,
      "16": 17
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 91
  },
  {
    "product_id": "P0012",
    "title": "Silk Avenue Style 12",
    "vendor": "Silk Avenue",
    "price": 110.0,
    "compare_at_price": 130.0,
    "tags": [
      "quinceanera",
      "minimal",
      "fitted"
    ],
    "sizes_available": [
      "2",
      "14",
      "6"
    ],
    "stock_per_size": {
      "2": 2,
      "14": 16,
      "6": 7
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 17
  },
  {
    "product_id": "P0013",
    "title": "Silk Avenue Style 13",
    "vendor": "Silk Avenue",
    "price": 372.0,
    "compare_at_price": 432.0,
    "tags": [
      "sleeve",
      "lace",
      "fitted"
    ],
    "sizes_available": [
      "16",
      "14",
      "8",
      "4"
    ],
    "stock_per_size": {
      "16": 3,
      "14": 3,
      "8": 13,
      "4": 11
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 7
  },
  {
    "product_id": "P0014",
    "title": "Silk Avenue Style 14",
    "vendor": "Silk Avenue",
    "price": 414.0,
    "compare_at_price": 414.0,
    "tags": [
      "cocktail",
      "flowy",
      "fitted"
    ],
    "sizes_available": [
      "14",
      "12",
      "6"
    ],
    "stock_per_size": {
      "14": 3,
      "12": 7,
      "6": 6
    },
    "is_sale": false,
    "is_clearance": true,
    "bestseller_score": 24
  },
  {
    "product_id": "P0015",
    "title": "Lumiere Style 15",
    "vendor": "Lumiere",
    "price": 316.0,
    "compare_at_price": 336.0,
    "tags": [
      "flowy",
      "prom",
      "bridal"
    ],
    "sizes_available": [
      "16",
      "14",
      "10"
    ],
    "stock_per_size": {
      "16": 3,
      "14": 1,
      "10": 20
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 31
  },
  {
    "product_id": "P0016",
    "title": "Velour House Style 16",
    "vendor": "Velour House",
    "price": 288.0,
    "compare_at_price": 348.0,
    "tags": [
      "lace",
      "flowy",
      "fitted"
    ],
    "sizes_available": [
      "8",
      "14",
      "16",
      "2",
      "4",
      "12"
    ],
    "stock_per_size": {
      "8": 0,
      "14": 12,
      "16": 8,
      "2": 14,
      "4": 9,
      "12": 13
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 38
  },
  {
    "product_id": "P0017",
    "title": "Velour House Style 17",
    "vendor": "Velour House",
    "price": 109.0,
    "compare_at_price": 109.0,
    "tags": [
      "sparkle",
      "bridal",
      "cocktail"
    ],
    "sizes_available": [
      "2",
      "16",
      "10",
      "8",
      "4"
    ],
    "stock_per_size": {
      "2": 1,
      "16": 16,
      "10": 2,
      "8": 5,
      "4": 2
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 73
  },
  {
    "product_id": "P0018",
    "title": "Velour House Style 18",
    "vendor": "Velour House",
    "price": 376.0,
    "compare_at_price": 376.0,
    "tags": [
      "fitted",
      "modest",
      "bridal"
    ],
    "sizes_available": [
      "4",
      "8",
      "12",
      "10",
      "6",
      "16",
      "2"
    ],
    "stock_per_size": {
      "4": 10,
      "8": 7,
      "12": 8,
      "10": 12,
      "6": 4,
      "16": 20,
      "2": 9
    },
    "is_sale": false,
    "is_clearance": true,
    "bestseller_score": 80
  },
  {
    "product_id": "P0019",
    "title": "Eden Atelier Style 19",
    "vendor": "Eden Atelier",
    "price": 131.0,
    "compare_at_price": 131.0,
    "tags": [
      "minimal",
      "flowy",
      "prom"
    ],
    "sizes_available": [
      "8",
      "10",
      "6",
      "4",
      "12",
      "2",
      "16"
    ],
    "stock_per_size": {
      "8": 11,
      "10": 9,
      "6": 5,
      "4": 14,
      "12": 17,
      "2": 9,
      "16": 19
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 71
  },
  {
    "product_id": "P0020",
    "title": "Lumiere Style 20",
    "vendor": "Lumiere",
    "price": 419.0,
    "compare_at_price": 419.0,
    "tags": [
      "cocktail",
      "modest",
      "lace"
    ],
    "sizes_available": [
      "10",
      "2",
      "14",
      "16"
    ],
    "stock_per_size": {
      "10": 4,
      "2": 8,
      "14": 9,
      "16": 19
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 34
  },
  {
    "product_id": "P0021",
    "title": "Eden Atelier Style 21",
    "vendor": "Eden Atelier",
    "price": 330.0,
    "compare_at_price": 370.0,
    "tags": [
      "modest",
      "evening",
      "quinceanera"
    ],
    "sizes_available": [
      "4",
      "12",
      "8"
    ],
    "stock_per_size": {
      "4": 8,
      "12": 1,
      "8": 0
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 57
  },
  {
    "product_id": "P0022",
    "title": "Eden Atelier Style 22",
    "vendor": "Eden Atelier",
    "price": 441.0,
    "compare_at_price": 501.0,
    "tags": [
      "cocktail",
      "minimal",
      "lace"
    ],
    "sizes_available": [
      "2",
      "16",
      "14",
      "4",
      "12",
      "10",
      "8"
    ],
    "stock_per_size": {
      "2": 13,
      "16": 4,
      "14": 1,
      "4": 9,
      "12": 11,
      "10": 1,
      "8": 11
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 46
  },
  {
    "product_id": "P0023",
    "title": "Eden Atelier Style 23",
    "vendor": "Eden Atelier",
    "price": 288.0,
    "compare_at_price": 308.0,
    "tags": [
      "minimal",
      "cocktail",
      "quinceanera"
    ],
    "sizes_available": [
      "6",
      "14",
      "4",
      "8"
    ],
    "stock_per_size": {
      "6": 0,
      "14": 5,
      "4": 10,
      "8": 13
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 90
  },
  {
    "product_id": "P0024",
    "title": "Aurelia Couture Style 24",
    "vendor": "Aurelia Couture",
    "price": 275.0,
    "compare_at_price": 275.0,
    "tags": [
      "bridal",
      "quinceanera",
      "modest"
    ],
    "sizes_available": [
      "8",
      "4",
      "16",
      "6",
      "10",
      "2"
    ],
    "stock_per_size": {
      "8": 7,
      "4": 0,
      "16": 6,
      "6": 12,
      "10": 10,
      "2": 8
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 52
  },
  {
    "product_id": "P0025",
    "title": "Silk Avenue Style 25",
    "vendor": "Silk Avenue",
    "price": 354.0,
    "compare_at_price": 394.0,
    "tags": [
      "bridal",
      "sparkle",
      "sleeve"
    ],
    "sizes_available": [
      "4",
      "6",
      "16"
    ],
    "stock_per_size": {
      "4": 18,
      "6": 8,
      "16": 1
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 41
  },
  {
    "product_id": "P0026",
    "title": "Nocturne Style 26",
    "vendor": "Nocturne",
    "price": 390.0,
    "compare_at_price": 390.0,
    "tags": [
      "sparkle",
      "modest",
      "bridal"
    ],
    "sizes_available": [
      "8",
      "6",
      "2",
      "16",
      "12",
      "14"
    ],
    "stock_per_size": {
      "8": 17,
      "6": 6,
      "2": 11,
      "16": 13,
      "12": 2,
      "14": 10
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 39
  },
  {
    "product_id": "P0027",
    "title": "Eden Atelier Style 27",
    "vendor": "Eden Atelier",
    "price": 238.0,
    "compare_at_price": 298.0,
    "tags": [
      "sparkle",
      "quinceanera",
      "sleeve"
    ],
    "sizes_available": [
      "14",
      "12",
      "6",
      "10",
      "4"
    ],
    "stock_per_size": {
      "14": 6,
      "12": 13,
      "6": 12,
      "10": 5,
      "4": 19
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 1
  },
  {
    "product_id": "P0028",
    "title": "Lumiere Style 28",
    "vendor": "Lumiere",
    "price": 226.0,
    "compare_at_price": 246.0,
    "tags": [
      "sparkle",
      "modest",
      "bridal"
    ],
    "sizes_available": [
      "12",
      "8",
      "14",
      "16",
      "4",
      "6"
    ],
    "stock_per_size": {
      "12": 15,
      "8": 5,
      "14": 2,
      "16": 9,
      "4": 16,
      "6": 20
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 97
  },
  {
    "product_id": "P0029",
    "title": "Velour House Style 29",
    "vendor": "Velour House",
    "price": 424.0,
    "compare_at_price": 464.0,
    "tags": [
      "fitted",
      "sleeve",
      "sparkle"
    ],
    "sizes_available": [
      "8",
      "4",
      "2",
      "12"
    ],
    "stock_per_size": {
      "8": 7,
      "4": 15,
      "2": 19,
      "12": 2
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 90
  },
  {
    "product_id": "P0030",
    "title": "Nocturne Style 30",
    "vendor": "Nocturne",
    "price": 333.0,
    "compare_at_price": 393.0,
    "tags": [
      "lace",
      "flowy",
      "fitted"
    ],
    "sizes_available": [
      "6",
      "12",
      "14",
      "2"
    ],
    "stock_per_size": {
      "6": 3,
      "12": 13,
      "14": 7,
      "2": 5
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 32
  },
  {
    "product_id": "P0031",
    "title": "Aurelia Couture Style 31",
    "vendor": "Aurelia Couture",
    "price": 313.0,
    "compare_at_price": 333.0,
    "tags": [
      "minimal",
      "quinceanera",
      "flowy"
    ],
    "sizes_available": [
      "12",
      "14",
      "8",
      "10",
      "16",
      "6"
    ],
    "stock_per_size": {
      "12": 14,
      "14": 5,
      "8": 15,
      "10": 14,
      "16": 8,
      "6": 7
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 31
  },
  {
    "product_id": "P0032",
    "title": "Lumiere Style 32",
    "vendor": "Lumiere",
    "price": 305.0,
    "compare_at_price": 305.0,
    "tags": [
      "lace",
      "cocktail",
      "bridal"
    ],
    "sizes_available": [
      "8",
      "6",
      "14",
      "12",
      "2"
    ],
    "stock_per_size": {
      "8": 4,
      "6": 4,
      "14": 7,
      "12": 12,
      "2": 4
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 43
  },
  {
    "product_id": "P0033",
    "title": "Eden Atelier Style 33",
    "vendor": "Eden Atelier",
    "price": 318.0,
    "compare_at_price": 378.0,
    "tags": [
      "sparkle",
      "sleeve",
      "fitted"
    ],
    "sizes_available": [
      "8",
      "14",
      "16"
    ],
    "stock_per_size": {
      "8": 12,
      "14": 18,
      "16": 0
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 46
  },
  {
    "product_id": "P0034",
    "title": "Lumiere Style 34",
    "vendor": "Lumiere",
    "price": 279.0,
    "compare_at_price": 339.0,
    "tags": [
      "flowy",
      "prom",
      "sleeve"
    ],
    "sizes_available": [
      "8",
      "16",
      "4",
      "6",
      "14",
      "12",
      "2"
    ],
    "stock_per_size": {
      "8": 12,
      "16": 10,
      "4": 12,
      "6": 5,
      "14": 14,
      "12": 4,
      "2": 19
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 85
  },
  {
    "product_id": "P0035",
    "title": "Aurelia Couture Style 35",
    "vendor": "Aurelia Couture",
    "price": 122.0,
    "compare_at_price": 182.0,
    "tags": [
      "modest",
      "lace",
      "sleeve"
    ],
    "sizes_available": [
      "16",
      "4",
      "2",
      "6"
    ],
    "stock_per_size": {
      "16": 12,
      "4": 10,
      "2": 6,
      "6": 14
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 54
  },
  {
    "product_id": "P0036",
    "title": "Lumiere Style 36",
    "vendor": "Lumiere",
    "price": 121.0,
    "compare_at_price": 181.0,
    "tags": [
      "prom",
      "lace",
      "cocktail"
    ],
    "sizes_available": [
      "2",
      "6",
      "4"
    ],
    "stock_per_size": {
      "2": 20,
      "6": 2,
      "4": 20
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 3
  },
  {
    "product_id": "P0037",
    "title": "Eden Atelier Style 37",
    "vendor": "Eden Atelier",
    "price": 158.0,
    "compare_at_price": 178.0,
    "tags": [
      "evening",
      "sparkle",
      "minimal"
    ],
    "sizes_available": [
      "16",
      "12",
      "2",
      "10"
    ],
    "stock_per_size": {
      "16": 6,
      "12": 14,
      "2": 8,
      "10": 11
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 92
  },
  {
    "product_id": "P0038",
    "title": "Aurelia Couture Style 38",
    "vendor": "Aurelia Couture",
    "price": 163.0,
    "compare_at_price": 203.0,
    "tags": [
      "bridal",
      "sparkle",
      "cocktail"
    ],
    "sizes_available": [
      "2",
      "6",
      "10"
    ],
    "stock_per_size": {
      "2": 12,
      "6": 12,
      "10": 6
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 99
  },
  {
    "product_id": "P0039",
    "title": "Lumiere Style 39",
    "vendor": "Lumiere",
    "price": 430.0,
    "compare_at_price": 430.0,
    "tags": [
      "fitted",
      "evening",
      "sleeve"
    ],
    "sizes_available": [
      "2",
      "6",
      "10",
      "8",
      "14",
      "16",
      "4"
    ],
    "stock_per_size": {
      "2": 0,
      "6": 13,
      "10": 15,
      "8": 3,
      "14": 13,
      "16": 11,
      "4": 20
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 67
  },
  {
    "product_id": "P0040",
    "title": "Silk Avenue Style 40",
    "vendor": "Silk Avenue",
    "price": 218.0,
    "compare_at_price": 278.0,
    "tags": [
      "sparkle",
      "lace",
      "sleeve"
    ],
    "sizes_available": [
      "14",
      "16",
      "12",
      "10",
      "6",
      "4"
    ],
    "stock_per_size": {
      "14": 7,
      "16": 2,
      "12": 8,
      "10": 14,
      "6": 7,
      "4": 14
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 64
  },
  {
    "product_id": "P0041",
    "title": "Lumiere Style 41",
    "vendor": "Lumiere",
    "price": 173.0,
    "compare_at_price": 233.0,
    "tags": [
      "prom",
      "flowy",
      "cocktail"
    ],
    "sizes_available": [
      "12",
      "14",
      "6",
      "16"
    ],
    "stock_per_size": {
      "12": 8,
      "14": 19,
      "6": 8,
      "16": 17
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 93
  },
  {
    "product_id": "P0042",
    "title": "Nocturne Style 42",
    "vendor": "Nocturne",
    "price": 330.0,
    "compare_at_price": 350.0,
    "tags": [
      "flowy",
      "lace",
      "modest"
    ],
    "sizes_available": [
      "16",
      "8",
      "2",
      "12",
      "6",
      "10"
    ],
    "stock_per_size": {
      "16": 12,
      "8": 7,
      "2": 9,
      "12": 18,
      "6": 11,
      "10": 15
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 96
  },
  {
    "product_id": "P0043",
    "title": "Eden Atelier Style 43",
    "vendor": "Eden Atelier",
    "price": 249.0,
    "compare_at_price": 289.0,
    "tags": [
      "cocktail",
      "fitted",
      "quinceanera"
    ],
    "sizes_available": [
      "10",
      "6",
      "14",
      "4",
      "2",
      "12"
    ],
    "stock_per_size": {
      "10": 6,
      "6": 10,
      "14": 3,
      "4": 17,
      "2": 5,
      "12": 6
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 98
  },
  {
    "product_id": "P0044",
    "title": "Eden Atelier Style 44",
    "vendor": "Eden Atelier",
    "price": 385.0,
    "compare_at_price": 425.0,
    "tags": [
      "prom",
      "flowy",
      "evening"
    ],
    "sizes_available": [
      "8",
      "6",
      "4"
    ],
    "stock_per_size": {
      "8": 11,
      "6": 5,
      "4": 9
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 7
  },
  {
    "product_id": "P0045",
    "title": "Eden Atelier Style 45",
    "vendor": "Eden Atelier",
    "price": 229.0,
    "compare_at_price": 249.0,
    "tags": [
      "fitted",
      "bridal",
      "minimal"
    ],
    "sizes_available": [
      "4",
      "14",
      "2",
      "10",
      "6",
      "16"
    ],
    "stock_per_size": {
      "4": 15,
      "14": 14,
      "2": 10,
      "10": 5,
      "6": 1,
      "16": 8
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 10
  },
  {
    "product_id": "P0046",
    "title": "Eden Atelier Style 46",
    "vendor": "Eden Atelier",
    "price": 402.0,
    "compare_at_price": 402.0,
    "tags": [
      "sleeve",
      "sparkle",
      "minimal"
    ],
    "sizes_available": [
      "6",
      "14",
      "10",
      "16"
    ],
    "stock_per_size": {
      "6": 2,
      "14": 7,
      "10": 3,
      "16": 17
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 29
  },
  {
    "product_id": "P0047",
    "title": "Eden Atelier Style 47",
    "vendor": "Eden Atelier",
    "price": 274.0,
    "compare_at_price": 334.0,
    "tags": [
      "cocktail",
      "quinceanera",
      "bridal"
    ],
    "sizes_available": [
      "10",
      "14",
      "16",
      "8",
      "6",
      "12"
    ],
    "stock_per_size": {
      "10": 19,
      "14": 1,
      "16": 19,
      "8": 3,
      "6": 6,
      "12": 20
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 23
  },
  {
    "product_id": "P0048",
    "title": "Eden Atelier Style 48",
    "vendor": "Eden Atelier",
    "price": 118.0,
    "compare_at_price": 138.0,
    "tags": [
      "prom",
      "cocktail",
      "quinceanera"
    ],
    "sizes_available": [
      "14",
      "8",
      "12"
    ],
    "stock_per_size": {
      "14": 19,
      "8": 15,
      "12": 9
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 90
  },
  {
    "product_id": "P0049",
    "title": "Nocturne Style 49",
    "vendor": "Nocturne",
    "price": 116.0,
    "compare_at_price": 136.0,
    "tags": [
      "prom",
      "evening",
      "quinceanera"
    ],
    "sizes_available": [
      "8",
      "16",
      "2",
      "10",
      "4"
    ],
    "stock_per_size": {
      "8": 20,
      "16": 4,
      "2": 8,
      "10": 4,
      "4": 2
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 73
  },
  {
    "product_id": "P0050",
    "title": "Lumiere Style 50",
    "vendor": "Lumiere",
    "price": 304.0,
    "compare_at_price": 304.0,
    "tags": [
      "quinceanera",
      "prom",
      "bridal"
    ],
    "sizes_available": [
      "10",
      "12",
      "8",
      "6",
      "14",
      "4"
    ],
    "stock_per_size": {
      "10": 2,
      "12": 19,
      "8": 1,
      "6": 13,
      "14": 10,
      "4": 19
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 87
  },
  {
    "product_id": "P0051",
    "title": "Eden Atelier Style 51",
    "vendor": "Eden Atelier",
    "price": 380.0,
    "compare_at_price": 380.0,
    "tags": [
      "fitted",
      "bridal",
      "lace"
    ],
    "sizes_available": [
      "2",
      "14",
      "4",
      "8",
      "10"
    ],
    "stock_per_size": {
      "2": 8,
      "14": 5,
      "4": 18,
      "8": 13,
      "10": 20
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 43
  },
  {
    "product_id": "P0052",
    "title": "Lumiere Style 52",
    "vendor": "Lumiere",
    "price": 423.0,
    "compare_at_price": 423.0,
    "tags": [
      "fitted",
      "bridal",
      "modest"
    ],
    "sizes_available": [
      "12",
      "8",
      "16",
      "14"
    ],
    "stock_per_size": {
      "12": 9,
      "8": 12,
      "16": 17,
      "14": 1
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 15
  },
  {
    "product_id": "P0053",
    "title": "Nocturne Style 53",
    "vendor": "Nocturne",
    "price": 343.0,
    "compare_at_price": 343.0,
    "tags": [
      "quinceanera",
      "fitted",
      "minimal"
    ],
    "sizes_available": [
      "16",
      "8",
      "2",
      "4",
      "6",
      "14",
      "10"
    ],
    "stock_per_size": {
      "16": 20,
      "8": 14,
      "2": 1,
      "4": 6,
      "6": 8,
      "14": 17,
      "10": 4
    },
    "is_sale": false,
    "is_clearance": true,
    "bestseller_score": 81
  },
  {
    "product_id": "P0054",
    "title": "Eden Atelier Style 54",
    "vendor": "Eden Atelier",
    "price": 202.0,
    "compare_at_price": 222.0,
    "tags": [
      "fitted",
      "quinceanera",
      "flowy"
    ],
    "sizes_available": [
      "2",
      "10",
      "8",
      "16",
      "4"
    ],
    "stock_per_size": {
      "2": 3,
      "10": 14,
      "8": 3,
      "16": 20,
      "4": 4
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 54
  },
  {
    "product_id": "P0055",
    "title": "Nocturne Style 55",
    "vendor": "Nocturne",
    "price": 321.0,
    "compare_at_price": 341.0,
    "tags": [
      "quinceanera",
      "lace",
      "sparkle"
    ],
    "sizes_available": [
      "6",
      "8",
      "4",
      "10",
      "12",
      "2"
    ],
    "stock_per_size": {
      "6": 8,
      "8": 13,
      "4": 10,
      "10": 16,
      "12": 8,
      "2": 0
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 85
  },
  {
    "product_id": "P0056",
    "title": "Nocturne Style 56",
    "vendor": "Nocturne",
    "price": 156.0,
    "compare_at_price": 216.0,
    "tags": [
      "modest",
      "fitted",
      "sleeve"
    ],
    "sizes_available": [
      "16",
      "6",
      "14",
      "10",
      "8",
      "4",
      "12"
    ],
    "stock_per_size": {
      "16": 6,
      "6": 7,
      "14": 18,
      "10": 12,
      "8": 7,
      "4": 13,
      "12": 1
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 85
  },
  {
    "product_id": "P0057",
    "title": "Silk Avenue Style 57",
    "vendor": "Silk Avenue",
    "price": 157.0,
    "compare_at_price": 217.0,
    "tags": [
      "bridal",
      "flowy",
      "fitted"
    ],
    "sizes_available": [
      "6",
      "10",
      "14"
    ],
    "stock_per_size": {
      "6": 10,
      "10": 3,
      "14": 14
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 19
  },
  {
    "product_id": "P0058",
    "title": "Nocturne Style 58",
    "vendor": "Nocturne",
    "price": 415.0,
    "compare_at_price": 435.0,
    "tags": [
      "minimal",
      "bridal",
      "modest"
    ],
    "sizes_available": [
      "16",
      "14",
      "6"
    ],
    "stock_per_size": {
      "16": 10,
      "14": 19,
      "6": 12
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 69
  },
  {
    "product_id": "P0059",
    "title": "Nocturne Style 59",
    "vendor": "Nocturne",
    "price": 242.0,
    "compare_at_price": 302.0,
    "tags": [
      "prom",
      "lace",
      "modest"
    ],
    "sizes_available": [
      "2",
      "10",
      "16",
      "4",
      "6",
      "12",
      "8"
    ],
    "stock_per_size": {
      "2": 13,
      "10": 3,
      "16": 20,
      "4": 3,
      "6": 14,
      "12": 5,
      "8": 9
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 38
  },
  {
    "product_id": "P0060",
    "title": "Lumiere Style 60",
    "vendor": "Lumiere",
    "price": 271.0,
    "compare_at_price": 331.0,
    "tags": [
      "sparkle",
      "sleeve",
      "lace"
    ],
    "sizes_available": [
      "8",
      "10",
      "16",
      "14"
    ],
    "stock_per_size": {
      "8": 5,
      "10": 5,
      "16": 5,
      "14": 2
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 64
  },
  {
    "product_id": "P0061",
    "title": "Eden Atelier Style 61",
    "vendor": "Eden Atelier",
    "price": 153.0,
    "compare_at_price": 173.0,
    "tags": [
      "quinceanera",
      "minimal",
      "sleeve"
    ],
    "sizes_available": [
      "10",
      "8",
      "6",
      "2",
      "14",
      "4"
    ],
    "stock_per_size": {
      "10": 17,
      "8": 5,
      "6": 2,
      "2": 14,
      "14": 11,
      "4": 18
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 59
  },
  {
    "product_id": "P0062",
    "title": "Lumiere Style 62",
    "vendor": "Lumiere",
    "price": 181.0,
    "compare_at_price": 241.0,
    "tags": [
      "sparkle",
      "minimal",
      "prom"
    ],
    "sizes_available": [
      "4",
      "16",
      "8",
      "10",
      "6",
      "12"
    ],
    "stock_per_size": {
      "4": 9,
      "16": 9,
      "8": 0,
      "10": 12,
      "6": 8,
      "12": 0
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 96
  },
  {
    "product_id": "P0063",
    "title": "Nocturne Style 63",
    "vendor": "Nocturne",
    "price": 226.0,
    "compare_at_price": 246.0,
    "tags": [
      "prom",
      "sparkle",
      "modest"
    ],
    "sizes_available": [
      "12",
      "4",
      "16",
      "14",
      "6",
      "8",
      "2"
    ],
    "stock_per_size": {
      "12": 20,
      "4": 3,
      "16": 20,
      "14": 20,
      "6": 1,
      "8": 9,
      "2": 14
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 12
  },
  {
    "product_id": "P0064",
    "title": "Lumiere Style 64",
    "vendor": "Lumiere",
    "price": 247.0,
    "compare_at_price": 307.0,
    "tags": [
      "quinceanera",
      "fitted",
      "lace"
    ],
    "sizes_available": [
      "8",
      "4",
      "10",
      "6"
    ],
    "stock_per_size": {
      "8": 16,
      "4": 16,
      "10": 8,
      "6": 5
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 44
  },
  {
    "product_id": "P0065",
    "title": "Aurelia Couture Style 65",
    "vendor": "Aurelia Couture",
    "price": 319.0,
    "compare_at_price": 319.0,
    "tags": [
      "prom",
      "quinceanera",
      "flowy"
    ],
    "sizes_available": [
      "8",
      "14",
      "12",
      "16"
    ],
    "stock_per_size": {
      "8": 17,
      "14": 11,
      "12": 2,
      "16": 12
    },
    "is_sale": false,
    "is_clearance": true,
    "bestseller_score": 48
  },
  {
    "product_id": "P0066",
    "title": "Silk Avenue Style 66",
    "vendor": "Silk Avenue",
    "price": 424.0,
    "compare_at_price": 464.0,
    "tags": [
      "minimal",
      "bridal",
      "fitted"
    ],
    "sizes_available": [
      "14",
      "16",
      "12",
      "6",
      "2",
      "10",
      "8"
    ],
    "stock_per_size": {
      "14": 15,
      "16": 0,
      "12": 19,
      "6": 17,
      "2": 10,
      "10": 19,
      "8": 7
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 39
  },
  {
    "product_id": "P0067",
    "title": "Silk Avenue Style 67",
    "vendor": "Silk Avenue",
    "price": 289.0,
    "compare_at_price": 289.0,
    "tags": [
      "evening",
      "sleeve",
      "fitted"
    ],
    "sizes_available": [
      "2",
      "16",
      "6",
      "8"
    ],
    "stock_per_size": {
      "2": 3,
      "16": 3,
      "6": 7,
      "8": 17
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 96
  },
  {
    "product_id": "P0068",
    "title": "Silk Avenue Style 68",
    "vendor": "Silk Avenue",
    "price": 356.0,
    "compare_at_price": 416.0,
    "tags": [
      "modest",
      "bridal",
      "lace"
    ],
    "sizes_available": [
      "6",
      "8",
      "12",
      "2",
      "14",
      "16",
      "4"
    ],
    "stock_per_size": {
      "6": 8,
      "8": 1,
      "12": 11,
      "2": 6,
      "14": 14,
      "16": 14,
      "4": 7
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 83
  },
  {
    "product_id": "P0069",
    "title": "Lumiere Style 69",
    "vendor": "Lumiere",
    "price": 111.0,
    "compare_at_price": 171.0,
    "tags": [
      "modest",
      "cocktail",
      "evening"
    ],
    "sizes_available": [
      "8",
      "2",
      "16",
      "14",
      "4"
    ],
    "stock_per_size": {
      "8": 20,
      "2": 20,
      "16": 19,
      "14": 0,
      "4": 1
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 27
  },
  {
    "product_id": "P0070",
    "title": "Aurelia Couture Style 70",
    "vendor": "Aurelia Couture",
    "price": 363.0,
    "compare_at_price": 383.0,
    "tags": [
      "minimal",
      "prom",
      "evening"
    ],
    "sizes_available": [
      "8",
      "14",
      "4",
      "6",
      "12",
      "10",
      "2"
    ],
    "stock_per_size": {
      "8": 8,
      "14": 4,
      "4": 4,
      "6": 17,
      "12": 8,
      "10": 5,
      "2": 3
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 31
  },
  {
    "product_id": "P0071",
    "title": "Eden Atelier Style 71",
    "vendor": "Eden Atelier",
    "price": 245.0,
    "compare_at_price": 245.0,
    "tags": [
      "fitted",
      "modest",
      "flowy"
    ],
    "sizes_available": [
      "10",
      "2",
      "4",
      "8"
    ],
    "stock_per_size": {
      "10": 16,
      "2": 3,
      "4": 2,
      "8": 15
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 58
  },
  {
    "product_id": "P0072",
    "title": "Eden Atelier Style 72",
    "vendor": "Eden Atelier",
    "price": 193.0,
    "compare_at_price": 193.0,
    "tags": [
      "sparkle",
      "evening",
      "bridal"
    ],
    "sizes_available": [
      "10",
      "8",
      "12",
      "2",
      "16",
      "4",
      "6"
    ],
    "stock_per_size": {
      "10": 13,
      "8": 3,
      "12": 15,
      "2": 14,
      "16": 2,
      "4": 2,
      "6": 10
    },
    "is_sale": false,
    "is_clearance": true,
    "bestseller_score": 80
  },
  {
    "product_id": "P0073",
    "title": "Silk Avenue Style 73",
    "vendor": "Silk Avenue",
    "price": 379.0,
    "compare_at_price": 419.0,
    "tags": [
      "fitted",
      "cocktail",
      "sleeve"
    ],
    "sizes_available": [
      "10",
      "8",
      "16",
      "12",
      "14",
      "2"
    ],
    "stock_per_size": {
      "10": 3,
      "8": 20,
      "16": 20,
      "12": 17,
      "14": 6,
      "2": 13
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 59
  },
  {
    "product_id": "P0074",
    "title": "Nocturne Style 74",
    "vendor": "Nocturne",
    "price": 292.0,
    "compare_at_price": 292.0,
    "tags": [
      "bridal",
      "sleeve",
      "lace"
    ],
    "sizes_available": [
      "14",
      "6",
      "12",
      "16",
      "10"
    ],
    "stock_per_size": {
      "14": 4,
      "6": 15,
      "12": 2,
      "16": 2,
      "10": 2
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 48
  },
  {
    "product_id": "P0075",
    "title": "Velour House Style 75",
    "vendor": "Velour House",
    "price": 364.0,
    "compare_at_price": 364.0,
    "tags": [
      "flowy",
      "cocktail",
      "evening"
    ],
    "sizes_available": [
      "12",
      "16",
      "2",
      "8",
      "6",
      "10",
      "4"
    ],
    "stock_per_size": {
      "12": 1,
      "16": 9,
      "2": 19,
      "8": 9,
      "6": 11,
      "10": 3,
      "4": 18
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 29
  },
  {
    "product_id": "P0076",
    "title": "Aurelia Couture Style 76",
    "vendor": "Aurelia Couture",
    "price": 259.0,
    "compare_at_price": 299.0,
    "tags": [
      "sparkle",
      "minimal",
      "flowy"
    ],
    "sizes_available": [
      "10",
      "16",
      "4"
    ],
    "stock_per_size": {
      "10": 13,
      "16": 17,
      "4": 19
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 85
  },
  {
    "product_id": "P0077",
    "title": "Silk Avenue Style 77",
    "vendor": "Silk Avenue",
    "price": 216.0,
    "compare_at_price": 216.0,
    "tags": [
      "sparkle",
      "minimal",
      "sleeve"
    ],
    "sizes_available": [
      "10",
      "12",
      "6",
      "14"
    ],
    "stock_per_size": {
      "10": 11,
      "12": 0,
      "6": 5,
      "14": 4
    },
    "is_sale": false,
    "is_clearance": true,
    "bestseller_score": 95
  },
  {
    "product_id": "P0078",
    "title": "Silk Avenue Style 78",
    "vendor": "Silk Avenue",
    "price": 95.0,
    "compare_at_price": 95.0,
    "tags": [
      "evening",
      "sparkle",
      "prom"
    ],
    "sizes_available": [
      "8",
      "16",
      "14",
      "12",
      "6",
      "2",
      "4"
    ],
    "stock_per_size": {
      "8": 9,
      "16": 10,
      "14": 18,
      "12": 19,
      "6": 2,
      "2": 1,
      "4": 4
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 35
  },
  {
    "product_id": "P0079",
    "title": "Nocturne Style 79",
    "vendor": "Nocturne",
    "price": 418.0,
    "compare_at_price": 478.0,
    "tags": [
      "minimal",
      "quinceanera",
      "prom"
    ],
    "sizes_available": [
      "16",
      "8",
      "6",
      "4",
      "2",
      "10"
    ],
    "stock_per_size": {
      "16": 13,
      "8": 3,
      "6": 9,
      "4": 18,
      "2": 15,
      "10": 16
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 77
  },
  {
    "product_id": "P0080",
    "title": "Aurelia Couture Style 80",
    "vendor": "Aurelia Couture",
    "price": 83.0,
    "compare_at_price": 103.0,
    "tags": [
      "evening",
      "lace",
      "sleeve"
    ],
    "sizes_available": [
      "8",
      "14",
      "4",
      "6",
      "10"
    ],
    "stock_per_size": {
      "8": 10,
      "14": 3,
      "4": 0,
      "6": 15,
      "10": 13
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 30
  },
  {
    "product_id": "P0081",
    "title": "Eden Atelier Style 81",
    "vendor": "Eden Atelier",
    "price": 366.0,
    "compare_at_price": 406.0,
    "tags": [
      "fitted",
      "bridal",
      "modest"
    ],
    "sizes_available": [
      "14",
      "16",
      "12"
    ],
    "stock_per_size": {
      "14": 1,
      "16": 13,
      "12": 0
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 74
  },
  {
    "product_id": "P0082",
    "title": "Nocturne Style 82",
    "vendor": "Nocturne",
    "price": 443.0,
    "compare_at_price": 503.0,
    "tags": [
      "bridal",
      "cocktail",
      "sleeve"
    ],
    "sizes_available": [
      "4",
      "8",
      "2",
      "6",
      "16"
    ],
    "stock_per_size": {
      "4": 19,
      "8": 14,
      "2": 11,
      "6": 2,
      "16": 13
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 68
  },
  {
    "product_id": "P0083",
    "title": "Aurelia Couture Style 83",
    "vendor": "Aurelia Couture",
    "price": 282.0,
    "compare_at_price": 322.0,
    "tags": [
      "lace",
      "minimal",
      "evening"
    ],
    "sizes_available": [
      "8",
      "6",
      "4",
      "2",
      "10"
    ],
    "stock_per_size": {
      "8": 16,
      "6": 16,
      "4": 6,
      "2": 11,
      "10": 11
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 19
  },
  {
    "product_id": "P0084",
    "title": "Lumiere Style 84",
    "vendor": "Lumiere",
    "price": 181.0,
    "compare_at_price": 201.0,
    "tags": [
      "sparkle",
      "modest",
      "minimal"
    ],
    "sizes_available": [
      "6",
      "14",
      "12",
      "2",
      "4",
      "16",
      "8"
    ],
    "stock_per_size": {
      "6": 14,
      "14": 18,
      "12": 18,
      "2": 14,
      "4": 18,
      "16": 20,
      "8": 20
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 9
  },
  {
    "product_id": "P0085",
    "title": "Nocturne Style 85",
    "vendor": "Nocturne",
    "price": 306.0,
    "compare_at_price": 346.0,
    "tags": [
      "quinceanera",
      "bridal",
      "minimal"
    ],
    "sizes_available": [
      "2",
      "6",
      "10",
      "16",
      "14"
    ],
    "stock_per_size": {
      "2": 14,
      "6": 14,
      "10": 1,
      "16": 1,
      "14": 11
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 65
  },
  {
    "product_id": "P0086",
    "title": "Nocturne Style 86",
    "vendor": "Nocturne",
    "price": 316.0,
    "compare_at_price": 316.0,
    "tags": [
      "evening",
      "prom",
      "cocktail"
    ],
    "sizes_available": [
      "8",
      "6",
      "10",
      "16",
      "4",
      "2"
    ],
    "stock_per_size": {
      "8": 14,
      "6": 3,
      "10": 10,
      "16": 2,
      "4": 16,
      "2": 20
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 57
  },
  {
    "product_id": "P0087",
    "title": "Eden Atelier Style 87",
    "vendor": "Eden Atelier",
    "price": 347.0,
    "compare_at_price": 367.0,
    "tags": [
      "bridal",
      "modest",
      "lace"
    ],
    "sizes_available": [
      "12",
      "6",
      "8",
      "16",
      "14"
    ],
    "stock_per_size": {
      "12": 19,
      "6": 1,
      "8": 20,
      "16": 20,
      "14": 10
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 50
  },
  {
    "product_id": "P0088",
    "title": "Lumiere Style 88",
    "vendor": "Lumiere",
    "price": 209.0,
    "compare_at_price": 229.0,
    "tags": [
      "lace",
      "bridal",
      "quinceanera"
    ],
    "sizes_available": [
      "4",
      "10",
      "12",
      "16",
      "6"
    ],
    "stock_per_size": {
      "4": 9,
      "10": 20,
      "12": 12,
      "16": 4,
      "6": 19
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 83
  },
  {
    "product_id": "P0089",
    "title": "Lumiere Style 89",
    "vendor": "Lumiere",
    "price": 145.0,
    "compare_at_price": 145.0,
    "tags": [
      "bridal",
      "quinceanera",
      "lace"
    ],
    "sizes_available": [
      "12",
      "2",
      "6",
      "16",
      "4",
      "14"
    ],
    "stock_per_size": {
      "12": 10,
      "2": 15,
      "6": 6,
      "16": 7,
      "4": 4,
      "14": 4
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 70
  },
  {
    "product_id": "P0090",
    "title": "Silk Avenue Style 90",
    "vendor": "Silk Avenue",
    "price": 349.0,
    "compare_at_price": 349.0,
    "tags": [
      "sleeve",
      "modest",
      "cocktail"
    ],
    "sizes_available": [
      "6",
      "10",
      "8",
      "4",
      "14"
    ],
    "stock_per_size": {
      "6": 5,
      "10": 19,
      "8": 5,
      "4": 14,
      "14": 1
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 79
  },
  {
    "product_id": "P0091",
    "title": "Lumiere Style 91",
    "vendor": "Lumiere",
    "price": 309.0,
    "compare_at_price": 329.0,
    "tags": [
      "cocktail",
      "sparkle",
      "evening"
    ],
    "sizes_available": [
      "8",
      "6",
      "16",
      "4",
      "14",
      "12",
      "10"
    ],
    "stock_per_size": {
      "8": 14,
      "6": 9,
      "16": 12,
      "4": 16,
      "14": 16,
      "12": 13,
      "10": 5
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 7
  },
  {
    "product_id": "P0092",
    "title": "Silk Avenue Style 92",
    "vendor": "Silk Avenue",
    "price": 326.0,
    "compare_at_price": 366.0,
    "tags": [
      "fitted",
      "modest",
      "prom"
    ],
    "sizes_available": [
      "4",
      "12",
      "10",
      "2",
      "6",
      "14",
      "8"
    ],
    "stock_per_size": {
      "4": 8,
      "12": 14,
      "10": 16,
      "2": 4,
      "6": 13,
      "14": 2,
      "8": 7
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 51
  },
  {
    "product_id": "P0093",
    "title": "Eden Atelier Style 93",
    "vendor": "Eden Atelier",
    "price": 271.0,
    "compare_at_price": 291.0,
    "tags": [
      "fitted",
      "evening",
      "lace"
    ],
    "sizes_available": [
      "4",
      "6",
      "16",
      "2",
      "14",
      "10"
    ],
    "stock_per_size": {
      "4": 20,
      "6": 10,
      "16": 4,
      "2": 4,
      "14": 1,
      "10": 9
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 1
  },
  {
    "product_id": "P0094",
    "title": "Aurelia Couture Style 94",
    "vendor": "Aurelia Couture",
    "price": 89.0,
    "compare_at_price": 129.0,
    "tags": [
      "cocktail",
      "quinceanera",
      "bridal"
    ],
    "sizes_available": [
      "6",
      "10",
      "12",
      "14"
    ],
    "stock_per_size": {
      "6": 16,
      "10": 13,
      "12": 3,
      "14": 9
    },
    "is_sale": true,
    "is_clearance": true,
    "bestseller_score": 54
  },
  {
    "product_id": "P0095",
    "title": "Silk Avenue Style 95",
    "vendor": "Silk Avenue",
    "price": 398.0,
    "compare_at_price": 458.0,
    "tags": [
      "minimal",
      "flowy",
      "sparkle"
    ],
    "sizes_available": [
      "4",
      "14",
      "8"
    ],
    "stock_per_size": {
      "4": 19,
      "14": 17,
      "8": 0
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 19
  },
  {
    "product_id": "P0096",
    "title": "Lumiere Style 96",
    "vendor": "Lumiere",
    "price": 299.0,
    "compare_at_price": 299.0,
    "tags": [
      "flowy",
      "prom",
      "sleeve"
    ],
    "sizes_available": [
      "12",
      "4",
      "10",
      "8",
      "14",
      "6",
      "2"
    ],
    "stock_per_size": {
      "12": 16,
      "4": 11,
      "10": 2,
      "8": 16,
      "14": 17,
      "6": 16,
      "2": 16
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 6
  },
  {
    "product_id": "P0097",
    "title": "Silk Avenue Style 97",
    "vendor": "Silk Avenue",
    "price": 278.0,
    "compare_at_price": 318.0,
    "tags": [
      "prom",
      "modest",
      "flowy"
    ],
    "sizes_available": [
      "2",
      "6",
      "16",
      "14",
      "4"
    ],
    "stock_per_size": {
      "2": 20,
      "6": 3,
      "16": 18,
      "14": 10,
      "4": 4
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 83
  },
  {
    "product_id": "P0098",
    "title": "Velour House Style 98",
    "vendor": "Velour House",
    "price": 430.0,
    "compare_at_price": 490.0,
    "tags": [
      "quinceanera",
      "flowy",
      "sleeve"
    ],
    "sizes_available": [
      "6",
      "14",
      "4",
      "2",
      "8",
      "10"
    ],
    "stock_per_size": {
      "6": 9,
      "14": 6,
      "4": 1,
      "2": 6,
      "8": 1,
      "10": 10
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 70
  },
  {
    "product_id": "P0099",
    "title": "Nocturne Style 99",
    "vendor": "Nocturne",
    "price": 209.0,
    "compare_at_price": 209.0,
    "tags": [
      "sleeve",
      "fitted",
      "lace"
    ],
    "sizes_available": [
      "10",
      "6",
      "2",
      "14"
    ],
    "stock_per_size": {
      "10": 8,
      "6": 3,
      "2": 11,
      "14": 13
    },
    "is_sale": false,
    "is_clearance": false,
    "bestseller_score": 24
  },
  {
    "product_id": "P0100",
    "title": "Nocturne Style 100",
    "vendor": "Nocturne",
    "price": 434.0,
    "compare_at_price": 494.0,
    "tags": [
      "modest",
      "bridal",
      "minimal"
    ],
    "sizes_available": [
      "10",
      "14",
      "2",
      "8",
      "12"
    ],
    "stock_per_size": {
      "10": 13,
      "14": 19,
      "2": 5,
      "8": 17,
      "12": 9
    },
    "is_sale": true,
    "is_clearance": false,
    "bestseller_score": 38
  }
];

export const ORDERS_RAW: Order[] = [
  {
    "order_id": "O0001",
    "order_date": "2026-01-28",
    "product_id": "P0015",
    "size": "14",
    "price_paid": 298.0,
    "customer_id": "C011"
  },
  {
    "order_id": "O0002",
    "order_date": "2026-02-03",
    "product_id": "P0064",
    "size": "6",
    "price_paid": 205.0,
    "customer_id": "C003"
  },
  {
    "order_id": "O0003",
    "order_date": "2026-02-03",
    "product_id": "P0018",
    "size": "16",
    "price_paid": 376.0,
    "customer_id": "C040"
  },
  {
    "order_id": "O0004",
    "order_date": "2026-02-08",
    "product_id": "P0086",
    "size": "16",
    "price_paid": 316.0,
    "customer_id": "C004"
  },
  {
    "order_id": "O0005",
    "order_date": "2026-01-31",
    "product_id": "P0001",
    "size": "8",
    "price_paid": 137.0,
    "customer_id": "C024"
  },
  {
    "order_id": "O0006",
    "order_date": "2026-02-15",
    "product_id": "P0061",
    "size": "14",
    "price_paid": 151.0,
    "customer_id": "C002"
  },
  {
    "order_id": "O0007",
    "order_date": "2026-01-18",
    "product_id": "P0022",
    "size": "16",
    "price_paid": 437.0,
    "customer_id": "C029"
  },
  {
    "order_id": "O0008",
    "order_date": "2026-02-17",
    "product_id": "P0087",
    "size": "12",
    "price_paid": 225.0,
    "customer_id": "C016"
  },
  {
    "order_id": "O0009",
    "order_date": "2026-02-02",
    "product_id": "P0059",
    "size": "8",
    "price_paid": 191.0,
    "customer_id": "C025"
  },
  {
    "order_id": "O0010",
    "order_date": "2026-01-18",
    "product_id": "P0041",
    "size": "12",
    "price_paid": 122.0,
    "customer_id": "C029"
  },
  {
    "order_id": "O0011",
    "order_date": "2026-02-02",
    "product_id": "P0070",
    "size": "4",
    "price_paid": 330.0,
    "customer_id": "C005"
  },
  {
    "order_id": "O0012",
    "order_date": "2026-01-23",
    "product_id": "P0035",
    "size": "4",
    "price_paid": 96.0,
    "customer_id": "C026"
  },
  {
    "order_id": "O0013",
    "order_date": "2026-02-08",
    "product_id": "P0055",
    "size": "4",
    "price_paid": 255.0,
    "customer_id": "C008"
  },
  {
    "order_id": "O0014",
    "order_date": "2026-02-14",
    "product_id": "P0012",
    "size": "2",
    "price_paid": 97.0,
    "customer_id": "C034"
  },
  {
    "order_id": "O0015",
    "order_date": "2026-01-21",
    "product_id": "P0015",
    "size": "14",
    "price_paid": 219.0,
    "customer_id": "C017"
  },
  {
    "order_id": "O0016",
    "order_date": "2026-01-28",
    "product_id": "P0025",
    "size": "6",
    "price_paid": 266.0,
    "customer_id": "C040"
  },
  {
    "order_id": "O0017",
    "order_date": "2026-01-25",
    "product_id": "P0029",
    "size": "2",
    "price_paid": 305.0,
    "customer_id": "C008"
  },
  {
    "order_id": "O0018",
    "order_date": "2026-02-21",
    "product_id": "P0054",
    "size": "10",
    "price_paid": 178.0,
    "customer_id": "C012"
  },
  {
    "order_id": "O0019",
    "order_date": "2026-01-28",
    "product_id": "P0072",
    "size": "4",
    "price_paid": 193.0,
    "customer_id": "C006"
  },
  {
    "order_id": "O0020",
    "order_date": "2026-02-03",
    "product_id": "P0085",
    "size": "10",
    "price_paid": 273.0,
    "customer_id": "C005"
  },
  {
    "order_id": "O0021",
    "order_date": "2026-01-22",
    "product_id": "P0012",
    "size": "6",
    "price_paid": 84.0,
    "customer_id": "C020"
  },
  {
    "order_id": "O0022",
    "order_date": "2026-02-14",
    "product_id": "P0045",
    "size": "14",
    "price_paid": 183.0,
    "customer_id": "C033"
  },
  {
    "order_id": "O0023",
    "order_date": "2026-02-18",
    "product_id": "P0048",
    "size": "14",
    "price_paid": 82.0,
    "customer_id": "C009"
  },
  {
    "order_id": "O0024",
    "order_date": "2026-01-25",
    "product_id": "P0086",
    "size": "6",
    "price_paid": 316.0,
    "customer_id": "C002"
  },
  {
    "order_id": "O0025",
    "order_date": "2026-01-21",
    "product_id": "P0003",
    "size": "2",
    "price_paid": 230.0,
    "customer_id": "C024"
  },
  {
    "order_id": "O0026",
    "order_date": "2026-01-21",
    "product_id": "P0030",
    "size": "2",
    "price_paid": 232.0,
    "customer_id": "C040"
  },
  {
    "order_id": "O0027",
    "order_date": "2026-02-21",
    "product_id": "P0021",
    "size": "4",
    "price_paid": 277.0,
    "customer_id": "C026"
  },
  {
    "order_id": "O0028",
    "order_date": "2026-01-26",
    "product_id": "P0096",
    "size": "6",
    "price_paid": 299.0,
    "customer_id": "C034"
  },
  {
    "order_id": "O0029",
    "order_date": "2026-01-30",
    "product_id": "P0080",
    "size": "6",
    "price_paid": 53.0,
    "customer_id": "C009"
  },
  {
    "order_id": "O0030",
    "order_date": "2026-02-21",
    "product_id": "P0044",
    "size": "6",
    "price_paid": 346.0,
    "customer_id": "C030"
  },
  {
    "order_id": "O0031",
    "order_date": "2026-02-03",
    "product_id": "P0097",
    "size": "4",
    "price_paid": 182.0,
    "customer_id": "C036"
  },
  {
    "order_id": "O0032",
    "order_date": "2026-01-19",
    "product_id": "P0053",
    "size": "14",
    "price_paid": 343.0,
    "customer_id": "C012"
  },
  {
    "order_id": "O0033",
    "order_date": "2026-01-29",
    "product_id": "P0024",
    "size": "4",
    "price_paid": 275.0,
    "customer_id": "C033"
  },
  {
    "order_id": "O0034",
    "order_date": "2026-02-22",
    "product_id": "P0019",
    "size": "16",
    "price_paid": 131.0,
    "customer_id": "C008"
  },
  {
    "order_id": "O0035",
    "order_date": "2026-02-16",
    "product_id": "P0058",
    "size": "6",
    "price_paid": 326.0,
    "customer_id": "C011"
  },
  {
    "order_id": "O0036",
    "order_date": "2026-02-05",
    "product_id": "P0075",
    "size": "16",
    "price_paid": 364.0,
    "customer_id": "C015"
  },
  {
    "order_id": "O0037",
    "order_date": "2026-01-23",
    "product_id": "P0083",
    "size": "4",
    "price_paid": 205.0,
    "customer_id": "C006"
  },
  {
    "order_id": "O0038",
    "order_date": "2026-02-13",
    "product_id": "P0078",
    "size": "14",
    "price_paid": 95.0,
    "customer_id": "C036"
  },
  {
    "order_id": "O0039",
    "order_date": "2026-02-17",
    "product_id": "P0024",
    "size": "16",
    "price_paid": 275.0,
    "customer_id": "C020"
  },
  {
    "order_id": "O0040",
    "order_date": "2026-01-22",
    "product_id": "P0066",
    "size": "2",
    "price_paid": 277.0,
    "customer_id": "C033"
  },
  {
    "order_id": "O0041",
    "order_date": "2026-02-15",
    "product_id": "P0093",
    "size": "10",
    "price_paid": 237.0,
    "customer_id": "C038"
  },
  {
    "order_id": "O0042",
    "order_date": "2026-02-15",
    "product_id": "P0096",
    "size": "4",
    "price_paid": 299.0,
    "customer_id": "C040"
  },
  {
    "order_id": "O0043",
    "order_date": "2026-01-18",
    "product_id": "P0079",
    "size": "10",
    "price_paid": 336.0,
    "customer_id": "C037"
  },
  {
    "order_id": "O0044",
    "order_date": "2026-02-24",
    "product_id": "P0035",
    "size": "16",
    "price_paid": 78.0,
    "customer_id": "C003"
  },
  {
    "order_id": "O0045",
    "order_date": "2026-01-20",
    "product_id": "P0026",
    "size": "14",
    "price_paid": 390.0,
    "customer_id": "C017"
  },
  {
    "order_id": "O0046",
    "order_date": "2026-01-20",
    "product_id": "P0065",
    "size": "14",
    "price_paid": 319.0,
    "customer_id": "C027"
  },
  {
    "order_id": "O0047",
    "order_date": "2026-02-24",
    "product_id": "P0059",
    "size": "6",
    "price_paid": 208.0,
    "customer_id": "C035"
  },
  {
    "order_id": "O0048",
    "order_date": "2026-02-06",
    "product_id": "P0057",
    "size": "10",
    "price_paid": 155.0,
    "customer_id": "C016"
  },
  {
    "order_id": "O0049",
    "order_date": "2026-01-31",
    "product_id": "P0033",
    "size": "16",
    "price_paid": 266.0,
    "customer_id": "C030"
  },
  {
    "order_id": "O0050",
    "order_date": "2026-02-22",
    "product_id": "P0068",
    "size": "6",
    "price_paid": 253.0,
    "customer_id": "C029"
  },
  {
    "order_id": "O0051",
    "order_date": "2026-01-26",
    "product_id": "P0008",
    "size": "16",
    "price_paid": 309.0,
    "customer_id": "C014"
  },
  {
    "order_id": "O0052",
    "order_date": "2026-01-18",
    "product_id": "P0069",
    "size": "16",
    "price_paid": 75.0,
    "customer_id": "C021"
  },
  {
    "order_id": "O0053",
    "order_date": "2026-02-05",
    "product_id": "P0043",
    "size": "12",
    "price_paid": 242.0,
    "customer_id": "C023"
  },
  {
    "order_id": "O0054",
    "order_date": "2026-02-17",
    "product_id": "P0038",
    "size": "6",
    "price_paid": 144.0,
    "customer_id": "C033"
  },
  {
    "order_id": "O0055",
    "order_date": "2026-02-05",
    "product_id": "P0013",
    "size": "16",
    "price_paid": 284.0,
    "customer_id": "C030"
  },
  {
    "order_id": "O0056",
    "order_date": "2026-02-08",
    "product_id": "P0064",
    "size": "8",
    "price_paid": 205.0,
    "customer_id": "C016"
  },
  {
    "order_id": "O0057",
    "order_date": "2026-02-19",
    "product_id": "P0086",
    "size": "6",
    "price_paid": 316.0,
    "customer_id": "C004"
  },
  {
    "order_id": "O0058",
    "order_date": "2026-02-01",
    "product_id": "P0014",
    "size": "12",
    "price_paid": 414.0,
    "customer_id": "C040"
  },
  {
    "order_id": "O0059",
    "order_date": "2026-02-10",
    "product_id": "P0012",
    "size": "14",
    "price_paid": 76.0,
    "customer_id": "C021"
  },
  {
    "order_id": "O0060",
    "order_date": "2026-02-05",
    "product_id": "P0012",
    "size": "6",
    "price_paid": 78.0,
    "customer_id": "C011"
  },
  {
    "order_id": "O0061",
    "order_date": "2026-01-24",
    "product_id": "P0099",
    "size": "14",
    "price_paid": 209.0,
    "customer_id": "C030"
  },
  {
    "order_id": "O0062",
    "order_date": "2026-02-06",
    "product_id": "P0093",
    "size": "2",
    "price_paid": 225.0,
    "customer_id": "C002"
  },
  {
    "order_id": "O0063",
    "order_date": "2026-01-31",
    "product_id": "P0062",
    "size": "4",
    "price_paid": 172.0,
    "customer_id": "C030"
  },
  {
    "order_id": "O0064",
    "order_date": "2026-02-12",
    "product_id": "P0040",
    "size": "16",
    "price_paid": 204.0,
    "customer_id": "C023"
  },
  {
    "order_id": "O0065",
    "order_date": "2026-02-22",
    "product_id": "P0081",
    "size": "14",
    "price_paid": 291.0,
    "customer_id": "C032"
  },
  {
    "order_id": "O0066",
    "order_date": "2026-01-26",
    "product_id": "P0073",
    "size": "14",
    "price_paid": 300.0,
    "customer_id": "C035"
  },
  {
    "order_id": "O0067",
    "order_date": "2026-02-19",
    "product_id": "P0072",
    "size": "10",
    "price_paid": 193.0,
    "customer_id": "C028"
  },
  {
    "order_id": "O0068",
    "order_date": "2026-02-09",
    "product_id": "P0039",
    "size": "6",
    "price_paid": 430.0,
    "customer_id": "C024"
  },
  {
    "order_id": "O0069",
    "order_date": "2026-02-02",
    "product_id": "P0086",
    "size": "16",
    "price_paid": 316.0,
    "customer_id": "C003"
  },
  {
    "order_id": "O0070",
    "order_date": "2026-02-22",
    "product_id": "P0034",
    "size": "6",
    "price_paid": 239.0,
    "customer_id": "C036"
  },
  {
    "order_id": "O0071",
    "order_date": "2026-02-02",
    "product_id": "P0043",
    "size": "6",
    "price_paid": 219.0,
    "customer_id": "C019"
  },
  {
    "order_id": "O0072",
    "order_date": "2026-02-01",
    "product_id": "P0013",
    "size": "16",
    "price_paid": 352.0,
    "customer_id": "C029"
  },
  {
    "order_id": "O0073",
    "order_date": "2026-01-17",
    "product_id": "P0023",
    "size": "4",
    "price_paid": 259.0,
    "customer_id": "C040"
  },
  {
    "order_id": "O0074",
    "order_date": "2026-02-17",
    "product_id": "P0031",
    "size": "12",
    "price_paid": 311.0,
    "customer_id": "C007"
  },
  {
    "order_id": "O0075",
    "order_date": "2026-02-02",
    "product_id": "P0003",
    "size": "8",
    "price_paid": 258.0,
    "customer_id": "C022"
  },
  {
    "order_id": "O0076",
    "order_date": "2026-02-02",
    "product_id": "P0028",
    "size": "4",
    "price_paid": 153.0,
    "customer_id": "C013"
  },
  {
    "order_id": "O0077",
    "order_date": "2026-01-24",
    "product_id": "P0078",
    "size": "6",
    "price_paid": 95.0,
    "customer_id": "C026"
  },
  {
    "order_id": "O0078",
    "order_date": "2026-02-23",
    "product_id": "P0049",
    "size": "4",
    "price_paid": 71.0,
    "customer_id": "C003"
  },
  {
    "order_id": "O0079",
    "order_date": "2026-02-04",
    "product_id": "P0017",
    "size": "16",
    "price_paid": 109.0,
    "customer_id": "C031"
  },
  {
    "order_id": "O0080",
    "order_date": "2026-02-16",
    "product_id": "P0030",
    "size": "2",
    "price_paid": 330.0,
    "customer_id": "C009"
  },
  {
    "order_id": "O0081",
    "order_date": "2026-01-17",
    "product_id": "P0032",
    "size": "14",
    "price_paid": 305.0,
    "customer_id": "C021"
  },
  {
    "order_id": "O0082",
    "order_date": "2026-01-31",
    "product_id": "P0081",
    "size": "14",
    "price_paid": 295.0,
    "customer_id": "C038"
  },
  {
    "order_id": "O0083",
    "order_date": "2026-01-24",
    "product_id": "P0048",
    "size": "8",
    "price_paid": 102.0,
    "customer_id": "C035"
  },
  {
    "order_id": "O0084",
    "order_date": "2026-01-20",
    "product_id": "P0063",
    "size": "14",
    "price_paid": 173.0,
    "customer_id": "C031"
  },
  {
    "order_id": "O0085",
    "order_date": "2026-02-02",
    "product_id": "P0094",
    "size": "6",
    "price_paid": 74.0,
    "customer_id": "C008"
  },
  {
    "order_id": "O0086",
    "order_date": "2026-01-19",
    "product_id": "P0021",
    "size": "12",
    "price_paid": 276.0,
    "customer_id": "C002"
  },
  {
    "order_id": "O0087",
    "order_date": "2026-02-09",
    "product_id": "P0020",
    "size": "16",
    "price_paid": 419.0,
    "customer_id": "C038"
  },
  {
    "order_id": "O0088",
    "order_date": "2026-02-11",
    "product_id": "P0072",
    "size": "16",
    "price_paid": 193.0,
    "customer_id": "C004"
  },
  {
    "order_id": "O0089",
    "order_date": "2026-01-26",
    "product_id": "P0093",
    "size": "14",
    "price_paid": 183.0,
    "customer_id": "C034"
  },
  {
    "order_id": "O0090",
    "order_date": "2026-02-01",
    "product_id": "P0097",
    "size": "4",
    "price_paid": 184.0,
    "customer_id": "C016"
  },
  {
    "order_id": "O0091",
    "order_date": "2026-01-20",
    "product_id": "P0043",
    "size": "10",
    "price_paid": 238.0,
    "customer_id": "C008"
  },
  {
    "order_id": "O0092",
    "order_date": "2026-02-24",
    "product_id": "P0090",
    "size": "10",
    "price_paid": 349.0,
    "customer_id": "C029"
  },
  {
    "order_id": "O0093",
    "order_date": "2026-01-30",
    "product_id": "P0065",
    "size": "12",
    "price_paid": 319.0,
    "customer_id": "C010"
  },
  {
    "order_id": "O0094",
    "order_date": "2026-02-12",
    "product_id": "P0075",
    "size": "8",
    "price_paid": 364.0,
    "customer_id": "C027"
  },
  {
    "order_id": "O0095",
    "order_date": "2026-01-17",
    "product_id": "P0001",
    "size": "10",
    "price_paid": 137.0,
    "customer_id": "C031"
  },
  {
    "order_id": "O0096",
    "order_date": "2026-02-17",
    "product_id": "P0054",
    "size": "2",
    "price_paid": 187.0,
    "customer_id": "C014"
  },
  {
    "order_id": "O0097",
    "order_date": "2026-01-26",
    "product_id": "P0067",
    "size": "6",
    "price_paid": 289.0,
    "customer_id": "C034"
  },
  {
    "order_id": "O0098",
    "order_date": "2026-02-05",
    "product_id": "P0035",
    "size": "6",
    "price_paid": 84.0,
    "customer_id": "C030"
  },
  {
    "order_id": "O0099",
    "order_date": "2026-02-04",
    "product_id": "P0018",
    "size": "6",
    "price_paid": 376.0,
    "customer_id": "C035"
  },
  {
    "order_id": "O0100",
    "order_date": "2026-02-09",
    "product_id": "P0015",
    "size": "14",
    "price_paid": 312.0,
    "customer_id": "C013"
  }
];

export const POLICY_TEXT = `Return Policy

Normal Items:
Returns accepted within 14 days of delivery for a full refund.

Sale Items:
Returnable within 7 days. Store credit only.

Clearance Items:
Final sale. Not eligible for return or exchange.

Vendor Exceptions:
Aurelia Couture: Exchanges only, no refunds.
Nocturne: Extended return window of 21 days.

Exchange Rules:
Size exchanges allowed if stock available.
Customer pays return shipping unless defective.
`;
