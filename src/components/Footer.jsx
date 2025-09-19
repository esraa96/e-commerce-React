import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold tracking-wider">
              STRIZ
            </div>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Premium fashion destination offering the latest trends and timeless classics for the modern lifestyle.
            </p>
            <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300">
                <FiFacebook className="text-sm sm:text-lg" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300">
                <FiInstagram className="text-sm sm:text-lg" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300">
                <FiTwitter className="text-sm sm:text-lg" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300">
                <FiYoutube className="text-sm sm:text-lg" />
              </a>
            </div>
          </div>
          
          {/* Shop Section */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wide">Shop</h3>
            <div className="space-y-2 sm:space-y-3">
              <Link to="/category/women's clothing" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">Women's Fashion</Link>
              <Link to="/category/men's clothing" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">Men's Fashion</Link>
              <Link to="/category/jewelery" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">Jewelry</Link>
              <Link to="/category/electronics" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">Electronics</Link>
              <Link to="/collections" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">All Collections</Link>
            </div>
          </div>
          
          {/* Customer Care Section */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wide">Customer Care</h3>
            <div className="space-y-2 sm:space-y-3">
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">About Us</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">Contact Us</Link>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">Size Guide</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">Shipping Info</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">Returns & Exchanges</a>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wide">Get in Touch</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 text-gray-400 justify-center sm:justify-start">
                <FiMapPin className="text-white mt-1 flex-shrink-0" />
                <span className="text-sm sm:text-base">123 Fashion Street<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 justify-center sm:justify-start">
                <FiPhone className="text-white flex-shrink-0" />
                <span className="text-sm sm:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 justify-center sm:justify-start">
                <FiMail className="text-white flex-shrink-0" />
                <span className="text-sm sm:text-base">hello@striz.com</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide">Newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-700 text-sm sm:text-base"
                />
                <button className="bg-white text-black px-3 sm:px-4 py-2 font-medium hover:bg-gray-200 transition-colors duration-300 text-xs sm:text-sm">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            <p>&copy; 2024 STRIZ. All rights reserved.</p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-3 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;