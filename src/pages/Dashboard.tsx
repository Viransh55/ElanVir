import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, Award, Calendar, ShoppingBag, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, updateUser } = useAuth();

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 485.00,
      status: 'Delivered',
      items: [
        { name: 'Cashmere Harmony Sweater', price: 285, quantity: 1 },
        { name: 'Heritage Leather Handbag', price: 200, quantity: 1 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-08',
      total: 320.00,
      status: 'Shipped',
      items: [
        { name: 'Crystal Wine Decanter', price: 320, quantity: 1 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2023-12-22',
      total: 165.00,
      status: 'Delivered',
      items: [
        { name: 'Artisan Ceramic Vase', price: 165, quantity: 1 }
      ]
    }
  ];

  const achievements = [
    { title: 'First Purchase', description: 'Welcome to ElanVir', icon: ShoppingBag, earned: true },
    { title: 'Style Curator', description: 'Completed style quiz', icon: Star, earned: true },
    { title: 'Loyal Customer', description: '5+ orders placed', icon: Heart, earned: false },
    { title: 'Trendsetter', description: 'Shared 3+ outfits', icon: TrendingUp, earned: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-success-600 bg-success-50';
      case 'Shipped': return 'text-accent-600 bg-accent-50';
      case 'Processing': return 'text-warning-600 bg-warning-50';
      default: return 'text-secondary-600 bg-secondary-50';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-secondary-800 mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-lg text-secondary-600">
            Your personal curator dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Overview */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-semibold text-secondary-800">
                  Profile Overview
                </h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Edit Profile
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-secondary-800">{user?.name}</h3>
                  <p className="text-secondary-600">{user?.email}</p>
                  <p className="text-sm text-primary-600 font-medium">{user?.level}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <div className="font-bold text-2xl text-secondary-800">{user?.points}</div>
                  <div className="text-sm text-secondary-600">ElanVir Points</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <div className="font-bold text-2xl text-secondary-800">
                    {new Date(user?.joinDate || '').toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-secondary-600">Member Since</div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-semibold text-secondary-800">
                  Order History
                </h2>
                <Link 
                  to="/orders" 
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold text-secondary-800">Order {order.id}</p>
                          <p className="text-sm text-secondary-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-secondary-800">${order.total.toFixed(2)}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm text-secondary-600">
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="font-serif text-xl font-semibold text-secondary-800 mb-6">
                Achievements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        achievement.earned 
                          ? 'border-success-200 bg-success-50' 
                          : 'border-neutral-200 bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.earned 
                            ? 'bg-success-600 text-white' 
                            : 'bg-neutral-300 text-neutral-600'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`font-medium ${
                            achievement.earned ? 'text-success-800' : 'text-neutral-600'
                          }`}>
                            {achievement.title}
                          </p>
                          <p className={`text-sm ${
                            achievement.earned ? 'text-success-600' : 'text-neutral-500'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h3 className="font-serif text-lg font-semibold text-secondary-800 mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Link
                  to="/style-quiz"
                  className="w-full flex items-center justify-center px-4 py-3 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Retake Style Quiz
                </Link>
                
                <Link
                  to="/outfit-builder"
                  className="w-full flex items-center justify-center px-4 py-3 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Create Outfit
                </Link>
                
                <Link
                  to="/shop"
                  className="w-full flex items-center justify-center px-4 py-3 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Collection
                </Link>
              </div>
            </div>

            {/* Curator Level Progress */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h3 className="font-serif text-lg font-semibold text-secondary-800 mb-4">
                Curator Progress
              </h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary-600">Current Level</span>
                  <span className="font-medium text-primary-600">{user?.level}</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-secondary-500 mt-2">
                  150 more points to reach Gold Curator
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-800">{user?.points}</div>
                <div className="text-sm text-secondary-600">Total Points</div>
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h3 className="font-serif text-lg font-semibold text-secondary-800 mb-4">
                For You
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm font-medium text-primary-800 mb-1">
                    New Arrivals Match Your Style
                  </p>
                  <p className="text-xs text-primary-600">
                    Based on your style quiz results
                  </p>
                </div>
                
                <div className="p-3 bg-accent-50 rounded-lg">
                  <p className="text-sm font-medium text-accent-800 mb-1">
                    Limited Edition Drop
                  </p>
                  <p className="text-xs text-accent-600">
                    Exclusive pieces available now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;