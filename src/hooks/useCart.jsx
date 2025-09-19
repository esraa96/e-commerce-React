import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get cart from localStorage
  const getLocalCart = () => {
    const localCart = localStorage.getItem('fakestore_cart');
    return localCart ? JSON.parse(localCart) : {
      id: 'local_cart',
      total_items: 0,
      subtotal: { formatted_with_symbol: "$0.00", raw: 0 },
      line_items: [],
    };
  };

  // Helper function to save cart to localStorage
  const saveLocalCart = (cartData) => {
    console.log('Saving cart to localStorage:', cartData);
    localStorage.setItem('fakestore_cart', JSON.stringify(cartData));
  };

  useEffect(() => {
    const localCart = getLocalCart();
    setCart(localCart);
    setLoading(false);
  }, []);

  const addToCart = async (productOrId, quantity, opts = {}) => {
    const currentCart = getLocalCart();
    const productData = opts.product_meta || {};
    
    console.log('Adding product to local cart:', { productOrId, productData });
    
    // Check if item already exists
    const existingItemIndex = currentCart.line_items.findIndex(
      item => item.product_id === productOrId
    );
    
    if (existingItemIndex >= 0) {
      // Update existing item
      currentCart.line_items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item with proper image handling
      const newItem = {
        id: `item_${Date.now()}`,
        product_id: productOrId,
        name: productData.title || `Product ${productOrId}`,
        quantity: quantity,
        price: { 
          raw: productData.price || 0,
          formatted_with_symbol: `$${(productData.price || 0).toFixed(2)}`
        },
        product_meta: {
          ...productData,
          image: productData.image // Ensure image is preserved
        }
      };
      console.log('Created new cart item:', newItem);
      currentCart.line_items.push(newItem);
    }
    
    // Recalculate totals
    currentCart.total_items = currentCart.line_items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalRaw = currentCart.line_items.reduce((sum, item) => sum + (item.price.raw * item.quantity), 0);
    currentCart.subtotal = {
      raw: subtotalRaw,
      formatted_with_symbol: `$${subtotalRaw.toFixed(2)}`
    };
    
    saveLocalCart(currentCart);
    setCart(currentCart);
    toast.success("Product added to cart!");
  };

  const updateCartQuantity = async (lineItemId, quantity) => {
    const currentCart = getLocalCart();
    const itemIndex = currentCart.line_items.findIndex(item => item.id === lineItemId);
    
    if (itemIndex >= 0) {
      currentCart.line_items[itemIndex].quantity = quantity;
      
      // Recalculate totals
      currentCart.total_items = currentCart.line_items.reduce((sum, item) => sum + item.quantity, 0);
      const subtotalRaw = currentCart.line_items.reduce((sum, item) => sum + (item.price.raw * item.quantity), 0);
      currentCart.subtotal = {
        raw: subtotalRaw,
        formatted_with_symbol: `$${subtotalRaw.toFixed(2)}`
      };
      
      saveLocalCart(currentCart);
      setCart(currentCart);
    }
  };

  const removeFromCart = async (lineItemId) => {
    const currentCart = getLocalCart();
    currentCart.line_items = currentCart.line_items.filter(item => item.id !== lineItemId);
    
    // Recalculate totals
    currentCart.total_items = currentCart.line_items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalRaw = currentCart.line_items.reduce((sum, item) => sum + (item.price.raw * item.quantity), 0);
    currentCart.subtotal = {
      raw: subtotalRaw,
      formatted_with_symbol: `$${subtotalRaw.toFixed(2)}`
    };
    
    saveLocalCart(currentCart);
    setCart(currentCart);
    toast.success("Product removed from cart");
  };

  const emptyCart = async () => {
    const emptyCart = {
      id: 'local_cart',
      total_items: 0,
      subtotal: { formatted_with_symbol: "$0.00", raw: 0 },
      line_items: [],
    };
    saveLocalCart(emptyCart);
    setCart(emptyCart);
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
