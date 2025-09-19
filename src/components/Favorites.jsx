import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../store/favorites/favoritesSlice";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useCart } from '../hooks/useCart';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product.id, 1, {
      product_meta: {
        image: product.image,
        title: product.title,
        price: product.price,
        category: product.category
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">My Favorites</h1>
          <p className="text-gray-600">{favorites.length} items in your wishlist</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <FiHeart className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-8">
              Start adding products you love to your wishlist
            </p>
            <Link
              to="/collections"
              className="inline-flex items-center bg-black text-white px-8 py-3 text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden bg-white aspect-square">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <button
                    onClick={() => dispatch(removeFromFavorites(product.id))}
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                    title="Remove from favorites"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                    {product.category}
                  </div>
                  
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-gray-900 font-medium text-sm mb-2 line-clamp-2 hover:text-gray-600 transition-colors duration-200">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold text-black">
                      ${product.price}
                    </div>
                    {product.rating && (
                      <div className="text-xs text-gray-500">
                        ★ {product.rating.rate} ({product.rating.count})
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart className="text-sm" />
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
