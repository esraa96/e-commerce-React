import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { FiShoppingCart, FiUser, FiHeart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Nav = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <span className="text-xs sm:text-sm">Free shipping on orders over $100</span>
            <span className="hidden md:block">|</span>
            <span className="hidden md:block">24/7 Customer Support</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <select className="bg-transparent text-white text-xs sm:text-sm border-none outline-none">
              <option value="en" className="text-black">EN</option>
              <option value="ar" className="text-black">AR</option>
            </select>
            <select className="bg-transparent text-white text-xs sm:text-sm border-none outline-none">
              <option value="usd" className="text-black">USD</option>
              <option value="eur" className="text-black">EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-[9999]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl sm:text-3xl font-bold text-black tracking-wider">
              STRIZ
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 relative group">
                HOME
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/collections" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 relative group">
                SHOP
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/shop" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 relative group">
                COLLECTIONS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/categories" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 relative group">
                CATEGORIES
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/about" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 relative group">
                ABOUT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/contact" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 relative group">
                CONTACT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
            
            {/* Search Bar */}
            {showSearch && (
              <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                    >
                      <FiSearch className="text-lg" />
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-800 hover:text-black p-1.5 sm:p-2 transition-colors duration-200 hidden sm:block"
              >
                <FiSearch className="text-lg sm:text-xl" />
              </button>
              
              <Link to={isAuthenticated ? "/account" : "/login"} className="text-gray-800 hover:text-black p-1.5 sm:p-2 transition-colors duration-200">
                <FiUser className="text-lg sm:text-xl" />
              </Link>
              
              <Link to="/favorites" className="text-gray-800 hover:text-black p-1.5 sm:p-2 transition-colors duration-200 hidden sm:block">
                <FiHeart className="text-lg sm:text-xl" />
              </Link>
              
              <Link to="/cart" className="relative text-gray-800 hover:text-black p-1.5 sm:p-2 transition-colors duration-200">
                <FiShoppingCart className="text-lg sm:text-xl" />
                {cart && cart.total_items > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                    {cart.total_items}
                  </span>
                )}
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden text-gray-800 hover:text-black p-1.5 sm:p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FiX className="text-lg sm:text-xl" /> : <FiMenu className="text-lg sm:text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
              {/* Search for mobile */}
              <div className="sm:hidden mb-3">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                    >
                      <FiSearch className="text-lg" />
                    </button>
                  </div>
                </form>
              </div>
              
              <Link to="/" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                HOME
              </Link>
              <div className="px-3 py-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Shop Categories</div>
                <Link to="/category/men's clothing" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md text-sm" onClick={() => setIsMenuOpen(false)}>
                  Men's Fashion
                </Link>
                <Link to="/category/women's clothing" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md text-sm" onClick={() => setIsMenuOpen(false)}>
                  Women's Fashion
                </Link>
                <Link to="/category/jewelery" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md text-sm" onClick={() => setIsMenuOpen(false)}>
                  Jewelry
                </Link>
                <Link to="/category/electronics" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md text-sm" onClick={() => setIsMenuOpen(false)}>
                  Electronics
                </Link>
              </div>
              <Link to="/collections" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                SHOP
              </Link>
              <Link to="/shop" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                COLLECTIONS
              </Link>
              <Link to="/categories" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                CATEGORIES
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                ABOUT
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                CONTACT
              </Link>
              <div className="border-t border-gray-200 pt-2 mt-2 sm:hidden">
                <Link to="/favorites" className="flex items-center px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-md text-sm" onClick={() => setIsMenuOpen(false)}>
                  <FiHeart className="text-lg mr-3" />
                  Favorites
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;