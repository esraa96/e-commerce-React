import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fakeStoreAPI } from '../services/fakestore';
import ProductCard from './ProductCard';
import { FiArrowRight, FiGrid } from 'react-icons/fi';

const CategoriesOverview = () => {
  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categories = await fakeStoreAPI.getCategories();
        const categoriesWithProducts = {};

        // Fetch products for each category
        for (const category of categories) {
          const products = await fakeStoreAPI.getProductsByCategory(category);
          categoriesWithProducts[category] = {
            products: products.slice(0, 4), // Show only first 4 products
            totalCount: products.length
          };
        }

        setCategoriesData(categoriesWithProducts);
      } catch (error) {
        console.error('Error fetching categories data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      "men's clothing": "Men's Clothing",
      "women's clothing": "Women's Clothing",
      "jewelery": "Jewelry",
      "electronics": "Electronics"
    };
    return categoryNames[category] || category;
  };

  const getCategoryImage = (category) => {
    const categoryImages = {
      "men's clothing": "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "women's clothing": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "jewelery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "electronics": "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    };
    return categoryImages[category] || "https://via.placeholder.com/500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-4">Browse Categories</h1>
            <p className="text-gray-600 text-lg">Discover our diverse collection of products</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {Object.entries(categoriesData).map(([category, data]) => (
          <div key={category} className="mb-16">
            {/* Category Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="md:w-1/3">
                <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                  <img
                    src={getCategoryImage(category)}
                    alt={getCategoryDisplayName(category)}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <FiGrid className="text-4xl mx-auto mb-2" />
                      <h2 className="text-2xl font-bold">{getCategoryDisplayName(category)}</h2>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 text-center md:text-right">
                <h2 className="text-4xl font-bold text-black mb-4">
                  {getCategoryDisplayName(category)}
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  {data.totalCount} products available in this category
                </p>
                <Link
                  to={`/category/${category}`}
                  className="inline-flex items-center bg-black text-white px-8 py-3 text-lg font-medium hover:bg-gray-800 transition-colors duration-300 rounded-lg"
                >
                  View All Products
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Products Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View More Link */}
            <div className="text-center mt-8">
              <Link
                to={`/category/${category}`}
                className="inline-flex items-center text-black hover:text-gray-600 font-medium transition-colors duration-200"
              >
                View More {getCategoryDisplayName(category)}
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-xl mb-8 opacity-90">Browse all our products in one place</p>
          <Link
            to="/collections"
            className="inline-flex items-center bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-colors duration-300 rounded-lg"
          >
            View All Products
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesOverview;