import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  tags: string[];
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    addToCart(product);
    setIsLoading(false);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link to={`/product/${product.id}`} className={`group block ${className}`}>
      <div className="bg-white rounded-lg shadow-card hover:shadow-luxury transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="bg-white text-secondary-800 p-3 rounded-full shadow-lg hover:bg-primary-50 hover:text-primary-700 transition-colors disabled:opacity-50"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button
                onClick={handleLike}
                className={`p-3 rounded-full shadow-lg transition-colors ${
                  isLiked
                    ? 'bg-accent-600 text-white'
                    : 'bg-white text-secondary-800 hover:bg-accent-50 hover:text-accent-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-accent-600 text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </div>
          )}

          {/* Stock Warning */}
          {product.stock <= 5 && (
            <div className="absolute top-3 right-3 bg-error-600 text-white px-2 py-1 rounded text-xs font-medium">
              Only {product.stock} left
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-serif text-lg font-medium text-secondary-800 group-hover:text-primary-700 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </div>

          <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-100 text-secondary-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xl text-secondary-800">
              ${product.price}
            </span>
            <span className="text-sm text-secondary-500 capitalize">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;