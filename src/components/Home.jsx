import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fakeStoreAPI } from '../services/fakestore';
import ProductCard from './ProductCard';
import { FiArrowRight, FiShoppingBag, FiTruck, FiShield, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "MEN'S COLLECTION",
      subtitle: "STYLISH & MODERN",
      description: "Discover the latest trends in men's fashion with our exclusive collection",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      buttonText: "SHOP NOW",
      buttonLink: "/category/men's clothing"
    },
    {
      id: 2,
      title: "LUXURY ACCESSORIES",
      subtitle: "PREMIUM JEWELRY",
      description: "Complete your look with our stunning collection of jewelry and accessories",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      buttonText: "EXPLORE",
      buttonLink: "/category/jewelery"
    },
    {
      id: 3,
      title: "LATEST TECHNOLOGY",
      subtitle: "SMART ELECTRONICS",
      description: "Stay ahead with our cutting-edge electronics and smart devices",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      buttonText: "DISCOVER",
      buttonLink: "/category/electronics"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fakeStoreAPI.getAllProducts();
        setProducts(productsData);
        setFeaturedProducts(productsData.slice(0, 8));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Slider */}
      <div className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${slide.image}')` }}
            ></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
                <p className="text-sm sm:text-lg md:text-xl mb-3 sm:mb-4 font-light tracking-widest opacity-90">
                  {slide.subtitle}
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-wider leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto opacity-90">
                  {slide.description}
                </p>
                <Link 
                  to={slide.buttonLink}
                  className="inline-flex items-center bg-white text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-medium hover:bg-gray-100 transition-all duration-300 gap-2"
                >
                  {slide.buttonText} <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
        >
          <FiChevronLeft className="text-lg sm:text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
        >
          <FiChevronRight className="text-lg sm:text-2xl" />
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiTruck className="text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">FREE SHIPPING</h3>
              <p className="text-gray-600 text-sm sm:text-base">Free shipping on all orders over $100</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiShield className="text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">SECURE PAYMENT</h3>
              <p className="text-gray-600 text-sm sm:text-base">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiRefreshCw className="text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">EASY RETURNS</h3>
              <p className="text-gray-600 text-sm sm:text-base">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">SHOP BY CATEGORY</h2>
            <p className="text-gray-600 text-base sm:text-lg">Explore our collections</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link to="/category/women's clothing" className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Women's Fashion" 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">WOMEN</h3>
                  <p className="text-xs sm:text-sm opacity-90">Explore Collection</p>
                </div>
              </div>
            </Link>
            
            <Link to="/category/men's clothing" className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Men's Fashion" 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">MEN</h3>
                  <p className="text-xs sm:text-sm opacity-90">Explore Collection</p>
                </div>
              </div>
            </Link>
            
            <Link to="/category/jewelery" className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Jewelry" 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">JEWELRY</h3>
                  <p className="text-xs sm:text-sm opacity-90">Explore Collection</p>
                </div>
              </div>
            </Link>
            
            <Link to="/category/electronics" className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Electronics" 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">TECH</h3>
                  <p className="text-xs sm:text-sm opacity-90">Explore Collection</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">FEATURED PRODUCTS</h2>
            <p className="text-gray-600 text-base sm:text-lg">Handpicked favorites</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link 
              to="/collections"
              className="inline-flex items-center bg-black text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              VIEW ALL PRODUCTS <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-12 sm:py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">STAY IN THE LOOP</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90">Subscribe to get special offers, free giveaways, and updates</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 text-black focus:outline-none text-sm sm:text-base"
            />
            <button className="bg-white text-black px-6 sm:px-8 py-3 font-medium hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;