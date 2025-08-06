import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, Truck, Shield, RotateCcw, Share2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-secondary-800 mb-4">
            Product not found
          </h2>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    addToCart(product);
    setIsLoading(false);
  };

  const mockImages = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-secondary-600 mb-8">
          <Link to="/" className="hover:text-secondary-900 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-secondary-900 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-secondary-400">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
              <img
                src={mockImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {mockImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-neutral-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary-600' : 'border-transparent hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked
                      ? 'bg-accent-600 text-white'
                      : 'bg-neutral-100 text-secondary-600 hover:bg-neutral-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">
                {product.name}
              </h1>
              
              <div className="text-3xl font-bold text-secondary-800 mb-4">
                ${product.price}
              </div>
              
              <p className="text-lg text-secondary-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-neutral-100 text-secondary-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 5 ? 'bg-success-500' : 'bg-warning-500'}`}></div>
              <span className="text-sm text-secondary-600">
                {product.stock > 5 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={isLoading || product.stock === 0}
                className="w-full flex items-center justify-center px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <ShoppingBag className="w-5 h-5 mr-2" />
                )}
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <button className="w-full flex items-center justify-center px-8 py-4 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                Share Product
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-primary-600" />
                <span className="text-secondary-700">Free worldwide shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className="text-secondary-700">Lifetime quality guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-primary-600" />
                <span className="text-secondary-700">30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 border-t border-neutral-200 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-4">
                Craftsmanship
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                Each piece is meticulously crafted by skilled artisans using time-honored techniques 
                and the finest materials sourced from around the world.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-4">
                Materials
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                We use only premium, sustainably sourced materials that are carefully selected 
                for their quality, durability, and environmental responsibility.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-4">
                Care Instructions
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                Proper care ensures your piece maintains its beauty for years to come. 
                Detailed care instructions are included with every purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;