import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiShoppingBag, FiHeart, FiLogOut, FiEdit } from 'react-icons/fi';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-900 to-gold-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <FiUser className="text-2xl text-primary-900" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-primary-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* User Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-primary-900 mb-4">Account Information</h2>
                
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-primary-600">Full Name</label>
                      <p className="text-lg font-medium text-primary-900">{user.name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-primary-600">Email Address</label>
                      <p className="text-lg font-medium text-primary-900">{user.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-primary-600">Member Since</label>
                      <p className="text-lg font-medium text-primary-900">{new Date(user.id).toLocaleDateString('en-US')}</p>
                    </div>
                  </div>
                  
                  <button className="mt-4 flex items-center text-gold-600 hover:text-gold-700 font-medium">
                    <FiEdit className="mr-2" />
                    Edit Information
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-primary-900 mb-4">Quick Actions</h2>
                
                <div className="space-y-3">
                  <Link 
                    to="/orders" 
                    className="flex items-center p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors group"
                  >
                    <div className="bg-primary-900 p-2 rounded-lg mr-4">
                      <FiShoppingBag className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 group-hover:text-gold-600">My Orders</h3>
                      <p className="text-sm text-primary-600">View all previous orders</p>
                    </div>
                  </Link>

                  <Link 
                    to="/favorites" 
                    className="flex items-center p-4 bg-gold-50 hover:bg-gold-100 rounded-lg transition-colors group"
                  >
                    <div className="bg-gold-600 p-2 rounded-lg mr-4">
                      <FiHeart className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 group-hover:text-gold-600">Favorites</h3>
                      <p className="text-sm text-primary-600">Saved favorite products</p>
                    </div>
                  </Link>

                  <Link 
                    to="/cart" 
                    className="flex items-center p-4 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors group"
                  >
                    <div className="bg-primary-700 p-2 rounded-lg mr-4">
                      <FiShoppingBag className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 group-hover:text-gold-600">Shopping Cart</h3>
                      <p className="text-sm text-primary-600">View items in cart</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-8 pt-6 border-t border-primary-200">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;