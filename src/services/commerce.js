// Lightweight adapter that uses OpenFoodFacts as the products source
// and a localStorage-backed cart/checkout shim so the rest of the app
// can keep using the same client interface (products.*, cart.*, checkout.*).

const OFF_SEARCH_URL = "https://world.openfoodfacts.org/cgi/search.pl";
const OFF_PRODUCT_URL = "https://world.openfoodfacts.org/api/v0/product";
const CART_STORAGE_KEY = "off_cart_v1";

const formatPrice = (n) => ({ formatted_with_symbol: `$${n.toFixed(2)}` });

const randomPrice = (seed) => {
  // deterministic-ish random price from product code if provided
  let base =
    10 +
    (seed
      ? Array.from(seed).reduce((s, c) => s + c.charCodeAt(0), 0) % 90
      : Math.floor(Math.random() * 90));
  return parseFloat((base + Math.random()).toFixed(2));
};

const mapOffProduct = (p) => {
  if (!p) return null;
  const code = p.code || p.id || p._id || p.barcode;
  const name =
    p.product_name || p.name || p.generic_name || p.brands || "Unknown Product";
  const description = p.generic_name || p.ingredients_text || p.brands || "";
  const image =
    p.image_front_small_url ||
    p.image_small_url ||
    p.image_url ||
    p.image_front_url ||
    "/src/assets/react.svg";
  const priceValue = randomPrice(code);

  return {
    id: String(code),
    name,
    description,
    price: formatPrice(priceValue),
    assets: [{ url: image }],
    image: { url: image },
    categories: (p.categories_tags || []).map((t) => ({
      slug: t,
      name: t.replace(/^[a-z]{2}:/, "").replace(/-/g, " "),
    })),
    // raw will keep the original OFF object if needed
    raw: p,
  };
};

// ---------- Products API backed by OpenFoodFacts ----------
const products = {
  // options: { limit, page, query }
  list: async (options = {}) => {
    const limit = options.limit || options.page_size || 20;
    const page = options.page || 1;
    const query = options.query || options.search_terms || "";

    const params = new URLSearchParams({
      search_simple: "1",
      action: "process",
      json: "1",
      page_size: String(limit),
      page: String(page),
    });

    if (query) params.set("search_terms", query);

    const url = `${OFF_SEARCH_URL}?${params.toString()}`;
    try {
      const res = await fetch(url);
      if (!res.ok) return { data: [] };
      const data = await res.json();
      const list = (data.products || []).map(mapOffProduct).filter(Boolean);
      return { data: list };
    } catch (e) {
      console.error("OpenFoodFacts search error:", e);
      return { data: [] };
    }
  },

  retrieve: async (id) => {
    if (!id) throw new Error("Product id is required");
    // OFF product endpoint expects barcode/code
    const url = `${OFF_PRODUCT_URL}/${encodeURIComponent(id)}.json`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        return {
          id,
          name: "Unknown Product",
          description: "Product data could not be fetched from OpenFoodFacts.",
          price: formatPrice(randomPrice(id)),
          assets: [{ url: "/src/assets/react.svg" }],
        };
      }
      const json = await res.json();
      if (json.status === 0) {
        return {
          id,
          name: "Unknown Product",
          description: "Product not found on OpenFoodFacts.",
          price: formatPrice(randomPrice(id)),
          assets: [{ url: "/src/assets/react.svg" }],
        };
      }

      return mapOffProduct(json.product);
    } catch (e) {
      console.error("OpenFoodFacts product fetch error:", e);
      return {
        id,
        name: "Unknown Product",
        description: "Product data could not be fetched from OpenFoodFacts.",
        price: formatPrice(randomPrice(id)),
        assets: [{ url: "/src/assets/react.svg" }],
      };
    }
  },
};

// ---------- Local cart shim (localStorage) ----------
const readCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw)
      return {
        id: null,
        total_items: 0,
        subtotal: formatPrice(0),
        line_items: [],
      };
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read cart from localStorage", e);
    return {
      id: null,
      total_items: 0,
      subtotal: formatPrice(0),
      line_items: [],
    };
  }
};

const writeCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to write cart to localStorage", e);
  }
};

const recalcCart = (cart) => {
  const items = cart.line_items || [];
  const total_items = items.reduce((s, it) => s + (it.quantity || 0), 0);
  const subtotalValue = items.reduce(
    (s, it) =>
      s + parseFloat((it.price && (it.price.raw || it.price.value)) || 0) * (it.quantity || 0),
    0
  );
  return {
    ...cart,
    total_items,
    subtotal: formatPrice(subtotalValue),
  };
};

const cart = {
  retrieve: async () => {
    return readCart();
  },

  add: async (productOrId, quantity = 1, opts = {}) => {
    // productOrId can be either an id (string/number) or a product object
    let productId = productOrId;
    let prod = null;

    if (productOrId && typeof productOrId === 'object') {
      prod = productOrId;
      productId = productOrId.id || productOrId.product_id || productOrId.code;
    } else {
      // fetch product info to include name/price
      prod = await products.retrieve(productOrId).catch(() => null);
    }

    const priceValue =
      prod && prod.price && (prod.price.value || prod.price.formatted_with_symbol)
        ? // try to normalize different shapes: { value } or { formatted_with_symbol }
          prod.price.value
          ? parseFloat(prod.price.value)
          : parseFloat(String(prod.price.formatted_with_symbol).replace(/[^0-9.]/g, ""))
        : randomPrice(productId);

    const cartObj = readCart();
    const existing = cartObj.line_items.find(
      (li) => li.product_id === String(productId)
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      const id = `li-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      cartObj.line_items.push({
        id,
        product_id: String(productId),
        name: prod ? prod.name || prod.title || `Product ${productId}` : `Product ${productId}`,
        quantity,
        price: {
          formatted_with_symbol: formatPrice(priceValue).formatted_with_symbol,
          raw: priceValue,
          value: priceValue,
        },
        product_meta: {
          image: prod && (prod.image?.url || prod.image || (prod.assets && prod.assets[0]?.url)) || "/src/assets/react.svg",
          ...opts
        },
      });
    }

    const updated = recalcCart(cartObj);
    writeCart(updated);
    return { cart: updated };
  },

  update: async (lineId, { quantity }) => {
    const cartObj = readCart();
    const li = cartObj.line_items.find((it) => it.id === lineId);
    if (li) li.quantity = quantity;
    const updated = recalcCart(cartObj);
    writeCart(updated);
    return { cart: updated };
  },

  remove: async (lineId) => {
    const cartObj = readCart();
    cartObj.line_items = cartObj.line_items.filter((it) => it.id !== lineId);
    const updated = recalcCart(cartObj);
    writeCart(updated);
    return { cart: updated };
  },

  empty: async () => {
    const emptyCart = {
      id: null,
      total_items: 0,
      subtotal: formatPrice(0),
      line_items: [],
    };
    writeCart(emptyCart);
    return { cart: emptyCart };
  },
};

// ---------- Checkout shim ----------
const checkout = {
  generateToken: async (_cartId, _opts) => {
    void _cartId;
    void _opts;
    // read local cart and convert to a checkout token-like object
    const c = readCart();
    return {
      id: `off-checkout-${Date.now()}`,
      line_items: (c.line_items || []).map((li) => ({
        id: li.id,
        name: li.name,
        quantity: li.quantity,
        line_total: { formatted_with_symbol: li.price.formatted_with_symbol },
      })),
      subtotal: c.subtotal,
      shipping_methods: [],
    };
  },

  capture: async (id, orderData) => {
    // very small shim: return an order object merging provided data and a generated id
    return { id: `off-order-${Date.now()}`, ...orderData };
  },
};

const client = { products, cart, checkout };

export default client;
