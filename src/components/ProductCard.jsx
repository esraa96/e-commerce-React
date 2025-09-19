import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../store/favorites/favoritesSlice';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product.id, 1, {
      product_meta: {
        image: product.image,
        title: product.title,
        price: product.price,
        category: product.category
      }
    });
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
    toast.success('Added to favorites!');
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-48 flex-shrink-0 bg-white">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">
              {product.category}
            </div>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-gray-900 font-medium text-base sm:text-lg mb-2 sm:mb-3 hover:text-gray-600 transition-colors duration-200 line-clamp-2">
                {product.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 hidden sm:block">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex items-center justify-between sm:justify-start sm:gap-4">
              <div className="text-lg sm:text-xl font-semibold text-black">
                ${product.price}
              </div>
              {product.rating && (
                <div className="text-xs sm:text-sm text-gray-500">
                  ★ {product.rating.rate} ({product.rating.count})
                </div>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-black text-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FiShoppingCart className="text-sm" />
              <span className="hidden sm:inline">ADD TO CART</span>
              <span className="sm:hidden">ADD</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-white aspect-square">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Quick Actions - Hidden on mobile */}
        <div className={`absolute top-4 right-4 hidden sm:flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button 
            onClick={handleAddToFavorites}
            className="w-8 h-8 lg:w-10 lg:h-10 bg-white shadow-md hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
          >
            <FiHeart className="text-xs lg:text-sm" />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="w-8 h-8 lg:w-10 lg:h-10 bg-white shadow-md hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
          >
            <FiEye className="text-xs lg:text-sm" />
          </Link>
        </div>
        
        {/* Add to Cart Button - Shows on Hover for desktop, always visible on mobile */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
          isHovered ? 'sm:opacity-100 sm:translate-y-0' : 'sm:opacity-0 sm:translate-y-4'
        } opacity-100 translate-y-0`}>
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-2 px-3 lg:px-4 text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FiShoppingCart className="text-xs sm:text-sm" />
            <span className="hidden sm:inline">ADD TO CART</span>
            <span className="sm:hidden">ADD</span>
          </button>
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="text-gray-500 text-xs uppercase tracking-wider mb-1 sm:mb-2">
          {product.category}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-gray-900 font-medium text-xs sm:text-sm mb-2 line-clamp-2 hover:text-gray-600 transition-colors duration-200">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="text-base sm:text-lg font-semibold text-black">
            ${product.price}
          </div>
          {product.rating && (
            <div className="text-xs text-gray-500 hidden sm:block">
              ★ {product.rating.rate} ({product.rating.count})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;