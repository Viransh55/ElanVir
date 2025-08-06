import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Truck, Shield, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import DailySpin from '../components/ui/DailySpin';
import LimitedDrop from '../components/ui/LimitedDrop';

const Home: React.FC = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  
  // Mock limited drop product
  const limitedDropProduct = {
    id: 999,
    name: "Exclusive Artisan Collection",
    price: 399,
    originalPrice: 499,
    image: "https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Limited edition handcrafted pieces from our master artisans. Only available for 24 hours.",
    stock: 7
  };
  
  // Set drop end time to 24 hours from now
  const dropEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover Your Personal Style
              </div>
              
              <h1 className="font-serif text-4xl lg:text-6xl font-bold text-secondary-800 mb-6 leading-tight">
                Luxury Redefined for the
                <span className="text-primary-700"> Modern Curator</span>
              </h1>
              
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Experience the intersection of timeless elegance and contemporary sophistication. 
                Our curated collection celebrates artisanal craftsmanship and sustainable luxury.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/style-quiz"
                  className="inline-flex items-center justify-center px-8 py-4 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
                >
                  Take Style Quiz
                </Link>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Luxury fashion lifestyle"
                  className="w-full h-[500px] lg:h-[600px] object-cover rounded-lg shadow-luxury"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Drop & Daily Spin */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LimitedDrop product={limitedDropProduct} endTime={dropEndTime} />
            </div>
            <div>
              <DailySpin />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-3">
                Curated Excellence
              </h3>
              <p className="text-secondary-600">
                Every piece is handpicked for its exceptional quality, timeless design, and artisanal craftsmanship.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-3">
                White Glove Service
              </h3>
              <p className="text-secondary-600">
                Complimentary worldwide shipping with premium packaging and personalized styling notes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-3">
                Lifetime Promise
              </h3>
              <p className="text-secondary-600">
                We stand behind every purchase with our comprehensive quality guarantee and expert care support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">
              Editor's Picks
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover our most coveted pieces, selected for their exceptional design and timeless appeal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-4 bg-secondary-800 text-white font-medium rounded-lg hover:bg-secondary-900 transition-colors"
            >
              View Full Collection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-6">
            Join the ElanVir Community
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Be the first to discover new arrivals, exclusive events, and personalized styling insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-primary-600 bg-primary-800 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-primary-700 font-medium rounded-lg hover:bg-neutral-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;