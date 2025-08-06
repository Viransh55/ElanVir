import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const { getItemCount } = useCart();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Style Quiz', href: '/style-quiz' },
    { name: 'Outfit Builder', href: '/outfit-builder' },
    { name: 'Shop the Look', href: '/shop-the-look' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-secondary-800 hover:text-primary-700 transition-colors">
              ElanVir
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-700 border-b-2 border-primary-700'
                    : 'text-secondary-600 hover:text-secondary-900'
                } pb-1`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-secondary-600 hover:text-secondary-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link
              to="/cart"
              className="relative p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-secondary-600 hover:text-secondary-900 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-luxury border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 py-4">
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between">
              <Link
                to="/cart"
                className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Cart ({getItemCount()})</span>
              </Link>

              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>{user?.name}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-secondary-600 hover:text-secondary-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;