import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';
import { CreditCardIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Checkout = () => {
  const { cart, emptyCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate processing
    setTimeout(() => {
      emptyCart();
      toast.success('تم تأكيد الطلب بنجاح!');
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-primary-900 mb-2">إتمام الشراء</h1>
          <p className="text-primary-600 font-body">أكمل بياناتك لإتمام عملية الشراء</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-6">
                <div className="flex items-center">
                  <TruckIcon className="h-6 w-6 text-white ml-3" />
                  <h2 className="text-xl font-display font-bold text-white">معلومات الشحن</h2>
                </div>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body font-medium text-primary-700 mb-2">الاسم الأول</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="أدخل الاسم الأول"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-primary-700 mb-2">اسم العائلة</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="أدخل اسم العائلة"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-body font-medium text-primary-700 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="أدخل البريد الإلكتروني"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-body font-medium text-primary-700 mb-2">العنوان</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="أدخل العنوان الكامل"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body font-medium text-primary-700 mb-2">المدينة</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="أدخل المدينة"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-primary-700 mb-2">الرمز البريدي</label>
                      <input
                        type="text"
                        name="zip"
                        placeholder="أدخل الرمز البريدي"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary-800 to-primary-900 p-6">
                <div className="flex items-center">
                  <CreditCardIcon className="h-6 w-6 text-white ml-3" />
                  <h3 className="text-xl font-display font-bold text-white">معلومات الدفع</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-body font-medium text-primary-700 mb-2">رقم البطاقة</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-body font-medium text-primary-700 mb-2">اسم حامل البطاقة</label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="أدخل الاسم كما هو مكتوب على البطاقة"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-primary-700 mb-2">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-primary-700 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 font-body"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-4 px-6 rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all duration-300 font-body font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-5 w-5 ml-2" />
                      تأكيد الطلب
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-fit sticky top-8">
            <div className="bg-gradient-to-r from-primary-800 to-primary-900 p-6">
              <h2 className="text-xl font-display font-bold text-white">ملخص الطلب</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {cart?.line_items?.length > 0 ? (
                  cart.line_items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={item.product_meta?.image || 'https://via.placeholder.com/150'}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg ml-3"
                        />
                        <div>
                          <h4 className="font-body font-semibold text-primary-900 text-sm">{item.name}</h4>
                          <p className="text-primary-600 text-xs">الكمية: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-body font-bold text-gold-600">
                        ${(item.price.raw * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-primary-500 py-8">
                    <p className="font-body">لا توجد منتجات في السلة</p>
                  </div>
                )}
              </div>
              
              <div className="border-t border-primary-200 pt-4 space-y-3">
                <div className="flex justify-between font-body">
                  <span className="text-primary-600">المجموع الفرعي:</span>
                  <span className="text-primary-900 font-semibold">{cart?.subtotal?.formatted_with_symbol || '$0.00'}</span>
                </div>
                <div className="flex justify-between font-body">
                  <span className="text-primary-600">الشحن:</span>
                  <span className="text-green-600 font-semibold">مجاني</span>
                </div>
                <div className="flex justify-between font-body">
                  <span className="text-primary-600">الضرائب:</span>
                  <span className="text-primary-900 font-semibold">$0.00</span>
                </div>
                <div className="border-t border-primary-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-display font-bold text-primary-900">الإجمالي:</span>
                    <span className="text-xl font-display font-bold text-gold-600">
                      {cart?.subtotal?.formatted_with_symbol || '$0.00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;