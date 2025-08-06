import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-neutral-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-secondary-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-secondary-600 mb-8">
            Discover our curated collection of luxury items and start building your perfect ensemble.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-4 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
          >
            Explore Collection
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">
            Shopping Cart
          </h1>
          <p className="text-lg text-secondary-600">
            Review your selected items and proceed to checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-card p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold text-secondary-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-secondary-600 text-sm mb-2">
                      ${item.price} each
                    </p>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-neutral-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-neutral-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-neutral-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <span className="font-semibold text-secondary-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-secondary-400 hover:text-error-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            
            <button
              onClick={clearCart}
              className="text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
            >
              Clear all items
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
              <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-6">
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Subtotal</span>
                  <span className="font-medium">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Shipping</span>
                  <span className="font-medium text-success-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Tax</span>
                  <span className="font-medium">${(getTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl text-secondary-800">
                      ${(getTotal() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="w-full flex items-center justify-center px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link
                to="/shop"
                className="w-full flex items-center justify-center px-8 py-4 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;