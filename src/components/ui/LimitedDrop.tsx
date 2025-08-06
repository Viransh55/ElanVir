import React, { useState, useEffect } from 'react';
import { Clock, Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LimitedDropProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    description: string;
    stock: number;
  };
  endTime: Date;
}

const LimitedDrop: React.FC<LimitedDropProps> = ({ product, endTime }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        setIsExpired(true);
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  if (isExpired) {
    return (
      <div className="bg-gradient-to-r from-neutral-100 to-neutral-200 rounded-lg shadow-card p-6 opacity-75">
        <div className="text-center">
          <h3 className="font-serif text-xl font-semibold text-secondary-600 mb-2">
            Limited Drop Ended
          </h3>
          <p className="text-secondary-500">
            This exclusive offer has expired. Stay tuned for the next drop!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-error-50 to-accent-50 rounded-lg shadow-luxury p-6 border border-error-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-error-600 rounded-full flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-secondary-800">
              Limited Edition Drop
            </h3>
            <p className="text-sm text-error-600 font-medium">
              {discountPercentage}% OFF • Only {product.stock} left
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center text-error-600 mb-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Ends in</span>
          </div>
          <div className="flex space-x-1">
            <div className="bg-error-600 text-white px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <span className="text-error-600 font-bold">:</span>
            <div className="bg-error-600 text-white px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <span className="text-error-600 font-bold">:</span>
            <div className="bg-error-600 text-white px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-3 left-3 bg-error-600 text-white px-2 py-1 rounded text-xs font-bold">
            -{discountPercentage}%
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-xl font-semibold text-secondary-800 mb-2">
              {product.name}
            </h4>
            <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl font-bold text-error-600">
                ${product.price}
              </span>
              <span className="text-lg text-secondary-500 line-through">
                ${product.originalPrice}
              </span>
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-error-600 text-white font-semibold rounded-lg hover:bg-error-700 transition-colors"
          >
            Claim This Deal
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      <div className="mt-4 bg-white/50 rounded-lg p-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-secondary-600">Stock remaining:</span>
          <div className="flex items-center space-x-2">
            <div className="w-24 bg-neutral-200 rounded-full h-2">
              <div
                className="bg-error-600 h-2 rounded-full transition-all"
                style={{ width: `${(product.stock / 10) * 100}%` }}
              ></div>
            </div>
            <span className="font-medium text-error-600">{product.stock}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedDrop;