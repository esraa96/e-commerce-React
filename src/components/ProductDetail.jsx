import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fakeStoreAPI } from "../services/fakestore";
import { useCart } from "../hooks/useCart";
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../store/favorites/favoritesSlice';
import { FiStar, FiHeart, FiShoppingCart, FiArrowLeft, FiTruck, FiRotateCcw, FiShield, FiAward } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await fakeStoreAPI.getProduct(id);
        setProduct(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, {
      product_meta: {
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      }
    });
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
    toast.success('Added to favorites!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-xl text-gray-700">Loading product...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">404</div>
          <div className="text-xl text-gray-700 mb-6">Product not found</div>
          <Link to="/" className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collections" className="hover:text-gray-900 transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Link to="/collections" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <FiArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {product.category}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating?.rate || 4) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  ({product.rating?.rate || 4}) • {product.rating?.count || 127} reviews
                </span>
              </div>

              <div className="text-3xl font-bold text-black mb-6">
                ${product.price}
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-900">
                  Quantity:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-black focus:border-black transition-colors"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-4 px-8 rounded-lg hover:bg-gray-800 transition-all duration-300 font-bold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <FiShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button 
                  onClick={handleAddToFavorites}
                  className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FiHeart className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <FiTruck className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiRotateCcw className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700">30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiShield className="h-4 w-4 text-purple-500" />
                  <span className="text-gray-700">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiAward className="h-4 w-4 text-yellow-500" />
                  <span className="text-gray-700">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;