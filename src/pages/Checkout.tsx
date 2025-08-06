import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface FormErrors {
  [key: string]: string;
}

const Checkout: React.FC = () => {
  const { items, getTotal, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }
    
    if (step === 2) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to success
    clearCart();
    navigate('/order-success');
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: Truck },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/cart"
          className="inline-flex items-center text-secondary-600 hover:text-secondary-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">
            Secure Checkout
          </h1>
          <p className="text-lg text-secondary-600">
            Complete your purchase with confidence.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-success-600 text-white' :
                    isActive ? 'bg-primary-600 text-white' :
                    'bg-neutral-200 text-neutral-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 font-medium ${
                    isActive ? 'text-primary-600' : 'text-secondary-600'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-6">
                    Shipping Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.email ? 'border-error-500' : 'border-neutral-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-error-600 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.firstName ? 'border-error-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.firstName && <p className="text-error-600 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.lastName ? 'border-error-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.lastName && <p className="text-error-600 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.address ? 'border-error-500' : 'border-neutral-300'
                      }`}
                    />
                    {errors.address && <p className="text-error-600 text-sm mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.city ? 'border-error-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.city && <p className="text-error-600 text-sm mt-1">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.state ? 'border-error-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.state && <p className="text-error-600 text-sm mt-1">{errors.state}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.zipCode ? 'border-error-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.zipCode && <p className="text-error-600 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-6">
                    Payment Information
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="w-5 h-5 text-success-600" />
                    <span className="text-sm text-secondary-600">
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.cardNumber ? 'border-error-500' : 'border-neutral-300'
                      }`}
                    />
                    {errors.cardNumber && <p className="text-error-600 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.expiryDate ? 'border-error-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.expiryDate && <p className="text-error-600 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.cvv ? 'border-error-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.cvv && <p className="text-error-600 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.cardName ? 'border-error-500' : 'border-neutral-300'
                      }`}
                    />
                    {errors.cardName && <p className="text-error-600 text-sm mt-1">{errors.cardName}</p>}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 px-8 py-4 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
                    >
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        `Complete Order - $${(getTotal() * 1.08).toFixed(2)}`
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
              <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-6">
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-secondary-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t border-neutral-200 pt-4">
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
                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl text-secondary-800">
                      ${(getTotal() * 1.08).toFixed(2)}
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