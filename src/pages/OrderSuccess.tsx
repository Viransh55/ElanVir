import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
  
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-luxury p-8 mb-8">
          <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success-600" />
          </div>
          
          <h1 className="font-serif text-3xl font-bold text-secondary-800 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-secondary-600 mb-6">
            Thank you for your purchase. Your order has been successfully placed and is being prepared for shipment.
          </p>
          
          <div className="bg-neutral-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm font-medium text-secondary-700 mb-1">Order Number</p>
                <p className="font-semibold text-secondary-800">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700 mb-1">Estimated Delivery</p>
                <p className="font-semibold text-secondary-800">3-5 business days</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg">
              <Package className="w-6 h-6 text-primary-600" />
              <div className="text-left">
                <p className="font-medium text-primary-800">Free Shipping</p>
                <p className="text-sm text-primary-600">White glove delivery included</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-accent-50 rounded-lg">
              <Mail className="w-6 h-6 text-accent-600" />
              <div className="text-left">
                <p className="font-medium text-accent-800">Order Updates</p>
                <p className="text-sm text-accent-600">Tracking info sent to your email</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
            >
              View Order Details
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-secondary-600 mb-2">
            Questions about your order?
          </p>
          <p className="text-sm text-secondary-500">
            Contact our curator team at{' '}
            <a href="mailto:hello@elanvir.com" className="text-primary-600 hover:text-primary-700 transition-colors">
              hello@elanvir.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;