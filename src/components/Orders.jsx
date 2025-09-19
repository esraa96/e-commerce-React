import React from 'react';
import { FiPackage, FiClock, FiCheck } from 'react-icons/fi';

const Orders = () => {
  // Mock orders data
  const orders = [
    {
      id: '12345',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: 3
    },
    {
      id: '12346',
      date: '2024-01-10',
      status: 'shipped',
      total: 159.50,
      items: 2
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheck className="text-gold-600" />;
      case 'shipped':
        return <FiPackage className="text-primary-600" />;
      default:
        return <FiClock className="text-primary-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="text-6xl text-primary-300 mx-auto mb-4" />
            <p className="text-xl text-primary-500">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900">Order #{order.id}</h3>
                    <p className="text-primary-600">{new Date(order.date).toLocaleDateString('en-US')}</p>
                    <p className="text-primary-600">{order.items} items</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center mb-2">
                      {getStatusIcon(order.status)}
                      <span className="mr-2 font-medium text-primary-700">{getStatusText(order.status)}</span>
                    </div>
                    <p className="text-xl font-bold text-gold-600">${order.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;