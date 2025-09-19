const API_BASE = 'https://fakestoreapi.com';

export const fakeStoreAPI = {
  getAllProducts: () => fetch(`${API_BASE}/products`).then(res => res.json()),
  getCategories: () => fetch(`${API_BASE}/products/categories`).then(res => res.json()),
  getProductsByCategory: (category) => fetch(`${API_BASE}/products/category/${category}`).then(res => res.json()),
  getProduct: (id) => fetch(`${API_BASE}/products/${id}`).then(res => res.json()),
};