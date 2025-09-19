import { useState, useEffect, useMemo } from "react";
import commerce from "../services/commerce";

export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  // stable stringified options for deps
  const optionsKey = useMemo(() => JSON.stringify(options), [options]);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      setLoader(true);
      try {
        // commerce.products.list accepts query options like { limit, page, category_slug, sort_by }
        const response = await commerce.products.list(options);
        // response.data follows Commerce.js format
        const data = response.data || [];
        if (mounted) setProducts(data);
      } catch (err) {
        console.error("Error fetching products from Commerce.js:", err);
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoader(false);
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [optionsKey, options]);

  // derive categories from Commerce.js product.categories (may be array)
  const categories = Array.from(
    new Set(
      products
        .flatMap((p) => (p.categories || []).map((c) => c.slug || c.name))
        .filter(Boolean)
    )
  );

  return { products, loader, error, categories };
};
