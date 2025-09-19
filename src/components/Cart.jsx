import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ShoppingBagIcon, TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { cart, loading, updateCartQuantity, removeFromCart } = useCart();
  
  // Debug: log cart data
  console.log('Cart data:', cart);
  if (cart?.line_items) {
    cart.line_items.forEach((item, index) => {
      console.log(`Item ${index}:`, item);
      console.log(`Image source:`, item.product_meta?.image);
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <div className="text-xl text-primary-700 font-body">Loading cart...</div>
        </div>
      </div>
    );
  }

  if (!cart || cart.total_items === 0) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBagIcon className="h-24 w-24 text-primary-400 mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold text-primary-900 mb-4">Your cart is empty</h2>
          <p className="text-primary-600 mb-8 font-body">You haven't added any products to your cart yet</p>
          <Link
            to="/"
            className="inline-flex items-center bg-gold-600 text-white px-8 py-3 rounded-lg hover:bg-gold-700 transition-all duration-300 font-body font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ShoppingBagIcon className="h-5 w-5 ml-2" />
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0 && newQuantity <= 10) {
      updateCartQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-primary-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-primary-900 mb-2">Shopping Cart</h1>
          <p className="text-primary-600 font-body text-sm sm:text-base">({cart.total_items} items in cart)</p>
          <button 
            onClick={() => {
              localStorage.removeItem('fakestore_cart');
              window.location.reload();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2 text-sm"
          >
            Clear Cart (Debug)
          </button>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-display font-bold text-white">Cart Items</h2>
              </div>
              
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {cart.line_items.map((item, index) => (
                  <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center p-3 sm:p-4 rounded-xl transition-all duration-300 hover:shadow-md ${index % 2 === 0 ? 'bg-primary-50' : 'bg-white'} border border-primary-200 gap-4 sm:gap-0`}>
                    <div className="relative group flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={item.product_meta?.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA0NUw5MCA2MEw3NSA3NUw2MCA2MEw3NSA0NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          console.log('Image failed to load:', item.product_meta?.image);
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA0NUw5MCA2MEw3NSA3NUw2MCA2MEw3NSA0NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-300"></div>
                    </div>
                    
                    <div className="flex-1 sm:ml-4 sm:mr-6 text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-display font-semibold text-primary-900 mb-1 sm:mb-2">{item.name}</h3>
                      <p className="text-gold-600 font-body font-bold text-lg">{item.price.formatted_with_symbol}</p>
                      <p className="text-primary-500 text-xs sm:text-sm font-body mt-1">Price per item</p>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-primary-100 rounded-lg p-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="p-1.5 sm:p-2 text-primary-600 hover:text-gold-600 hover:bg-white rounded-md transition-all duration-200"
                          disabled={item.quantity <= 1}
                        >
                          <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 font-body font-bold text-primary-900 min-w-[2.5rem] sm:min-w-[3rem] text-center text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="p-1.5 sm:p-2 text-primary-600 hover:text-gold-600 hover:bg-white rounded-md transition-all duration-200"
                          disabled={item.quantity >= 10}
                        >
                          <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 sm:p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                        title="Remove from cart"
                      >
                        <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden sticky top-4 sm:top-8">
              <div className="bg-gradient-to-r from-primary-800 to-primary-900 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-display font-bold text-white">Order Summary</h2>
              </div>
              
              <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  {cart.line_items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs sm:text-sm font-body">
                      <span className="text-primary-700 truncate pr-2">{item.name} × {item.quantity}</span>
                      <span className="text-primary-900 font-semibold flex-shrink-0">
                        ${(item.price.raw * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-primary-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-primary-600 font-body text-sm sm:text-base">Subtotal:</span>
                    <span className="text-primary-900 font-body font-semibold text-sm sm:text-base">{cart.subtotal.formatted_with_symbol}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary-600 font-body text-sm sm:text-base">Shipping:</span>
                    <span className="text-green-600 font-body font-semibold text-sm sm:text-base">Free</span>
                  </div>
                  <div className="border-t border-primary-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-xl font-display font-bold text-primary-900">Total:</span>
                      <span className="text-lg sm:text-xl font-display font-bold text-gold-600">{cart.subtotal.formatted_with_symbol}</span>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all duration-300 font-body font-bold text-center block shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  to="/"
                  className="w-full bg-primary-100 text-primary-700 py-3 px-6 rounded-xl hover:bg-primary-200 transition-all duration-300 font-body font-medium text-center block mt-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;