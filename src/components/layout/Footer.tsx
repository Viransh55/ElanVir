import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-semibold mb-4">ElanVir</h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              Curating luxury experiences through timeless design and exceptional craftsmanship. 
              Discover your personal style with our editorial approach to modern living.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop?category=Apparel" className="text-neutral-300 hover:text-white transition-colors text-sm">Apparel</Link></li>
              <li><Link to="/shop?category=Home" className="text-neutral-300 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/shop?category=Accessories" className="text-neutral-300 hover:text-white transition-colors text-sm">Accessories</Link></li>
              <li><Link to="/shop?featured=true" className="text-neutral-300 hover:text-white transition-colors text-sm">Featured</Link></li>
              <li><Link to="/style-quiz" className="text-neutral-300 hover:text-white transition-colors text-sm">Style Quiz</Link></li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4 className="font-medium text-lg mb-4">Experience</h4>
            <ul className="space-y-3">
              <li><Link to="/outfit-builder" className="text-neutral-300 hover:text-white transition-colors text-sm">Outfit Builder</Link></li>
              <li><Link to="/shop-the-look" className="text-neutral-300 hover:text-white transition-colors text-sm">Shop the Look</Link></li>
              <li><Link to="/dashboard" className="text-neutral-300 hover:text-white transition-colors text-sm">Curator Program</Link></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors text-sm">Size Guide</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors text-sm">Care Instructions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-neutral-300 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                hello@elanvir.com
              </li>
              <li className="flex items-center text-neutral-300 text-sm">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start text-neutral-300 text-sm">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>
                  123 Design District<br />
                  New York, NY 10013
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2024 ElanVir. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;