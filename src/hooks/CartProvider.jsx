import React, { useState, useEffect } from 'react';
import commerce from '../services/commerce';
import { toast } from 'react-toastify';
import { CartContext } from './cartContext';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
        // If Commerce.js is unreachable (dev without .env), use a safe empty cart shape
        setCart({
          id: null,
          total_items: 0,
          subtotal: { formatted_with_symbol: '$0.00' },
          line_items: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (productOrId, quantity, opts = {}) => {
    try {
      const response = await commerce.cart.add(productOrId, quantity, opts);
      setCart(response.cart);
      toast.success('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  const updateCartQuantity = async (lineItemId, quantity) => {
    try {
      const response = await commerce.cart.update(lineItemId, { quantity });
      setCart(response.cart);
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const removeFromCart = async (lineItemId) => {
    try {
      const response = await commerce.cart.remove(lineItemId);
      setCart(response.cart);
      toast.success('Product removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove product from cart');
    }
  };

  const emptyCart = async () => {
    try {
      const response = await commerce.cart.empty();
      setCart(response.cart);
    } catch (error) {
      console.error('Error emptying cart:', error);
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    emptyCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
