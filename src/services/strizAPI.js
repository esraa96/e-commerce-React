// Enhanced API service for Striz Fashion
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced product data with additional Striz-specific fields
const enhanceProduct = (product) => ({
  ...product,
  originalPrice: (product.price * 1.3).toFixed(2),
  discount: 23,
  isNew: Math.random() > 0.7,
  isBestSeller: Math.random() > 0.8,
  colors: ['Black', 'White', 'Navy', 'Gray'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  inStock: Math.floor(Math.random() * 50) + 10,
  brand: getBrandByCategory(product.category),
  tags: getTagsByCategory(product.category),
});

const getBrandByCategory = (category) => {
  const brands = {
    "men's clothing": ['Hugo Boss', 'Ralph Lauren', 'Calvin Klein', 'Tommy Hilfiger'],
    "women's clothing": ['Zara', 'H&M', 'Mango', 'COS'],
    "jewelery": ['Tiffany & Co', 'Pandora', 'Swarovski', 'Cartier'],
    "electronics": ['Apple', 'Samsung', 'Sony', 'Bose']
  };
  const categoryBrands = brands[category] || ['Striz'];
  return categoryBrands[Math.floor(Math.random() * categoryBrands.length)];
};

const getTagsByCategory = (category) => {
  const tags = {
    "men's clothing": ['casual', 'formal', 'business', 'weekend'],
    "women's clothing": ['trendy', 'elegant', 'casual', 'party'],
    "jewelery": ['luxury', 'elegant', 'gift', 'special'],
    "electronics": ['tech', 'gadget', 'modern', 'smart']
  };
  return tags[category] || ['fashion'];
};

export const strizAPI = {
  // Get all products with enhancements
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data.map(enhanceProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID with enhancements
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return enhanceProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get products by category with enhancements
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data.map(enhanceProduct);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get featured products (top rated)
  getFeaturedProducts: async (limit = 8) => {
    try {
      const products = await strizAPI.getAllProducts();
      return products
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Get new arrivals (random selection marked as new)
  getNewArrivals: async (limit = 8) => {
    try {
      const products = await strizAPI.getAllProducts();
      return products
        .filter(product => product.isNew)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  },

  // Get best sellers
  getBestSellers: async (limit = 8) => {
    try {
      const products = await strizAPI.getAllProducts();
      return products
        .filter(product => product.isBestSeller)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const products = await strizAPI.getAllProducts();
      return products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get products by price range
  getProductsByPriceRange: async (minPrice, maxPrice) => {
    try {
      const products = await strizAPI.getAllProducts();
      return products.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    } catch (error) {
      console.error('Error fetching products by price range:', error);
      throw error;
    }
  },

  // Get related products
  getRelatedProducts: async (productId, limit = 4) => {
    try {
      const product = await strizAPI.getProductById(productId);
      const allProducts = await strizAPI.getAllProducts();
      
      return allProducts
        .filter(p => p.id !== product.id && p.category === product.category)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching related products:', error);
      throw error;
    }
  }
};

// Mock user authentication (for demo purposes)
export const authAPI = {
  login: async (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 1,
            email,
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          },
          token: 'mock-jwt-token'
        });
      }, 1000);
    });
  },

  register: async (userData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: Date.now(),
            ...userData,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          },
          token: 'mock-jwt-token'
        });
      }, 1000);
    });
  }
};

export default strizAPI;