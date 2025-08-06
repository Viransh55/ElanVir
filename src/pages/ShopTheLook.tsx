import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, Search, X } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

interface ColorAnalysis {
  dominantColors: string[];
  brightness: number;
  saturation: number;
}

const ShopTheLook: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<ColorAnalysis | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        analyzeImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageUrl: string) => {
    setIsAnalyzing(true);
    
    // Simulate image analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Sample pixels for color analysis
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = extractDominantColors(imageData);
        
        const analysis: ColorAnalysis = {
          dominantColors: colors,
          brightness: calculateBrightness(imageData),
          saturation: calculateSaturation(imageData)
        };
        
        setAnalysisResults(analysis);
        generateRecommendations(analysis);
        setIsAnalyzing(false);
      };
      
      img.src = imageUrl;
    } catch (error) {
      console.error('Image analysis failed:', error);
      // Fallback to mock analysis
      const mockAnalysis: ColorAnalysis = {
        dominantColors: ['#8B4513', '#F5F5DC', '#2F4F4F'],
        brightness: 0.6,
        saturation: 0.4
      };
      
      setAnalysisResults(mockAnalysis);
      generateRecommendations(mockAnalysis);
      setIsAnalyzing(false);
    }
  };

  const extractDominantColors = (imageData: ImageData): string[] => {
    const data = imageData.data;
    const colorCounts: { [key: string]: number } = {};
    
    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Convert to hex
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }
    
    // Return top 3 colors
    return Object.entries(colorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([color]) => color);
  };

  const calculateBrightness = (imageData: ImageData): number => {
    const data = imageData.data;
    let totalBrightness = 0;
    let pixelCount = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate perceived brightness
      const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      totalBrightness += brightness;
      pixelCount++;
    }
    
    return totalBrightness / pixelCount;
  };

  const calculateSaturation = (imageData: ImageData): number => {
    const data = imageData.data;
    let totalSaturation = 0;
    let pixelCount = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max === 0 ? 0 : (max - min) / max;
      
      totalSaturation += saturation;
      pixelCount++;
    }
    
    return totalSaturation / pixelCount;
  };

  const generateRecommendations = (analysis: ColorAnalysis) => {
    // Filter products based on analysis
    let filtered = [...products];
    
    // Prefer certain categories based on brightness and saturation
    if (analysis.brightness > 0.7) {
      // Bright images - prefer lighter, elegant items
      filtered = filtered.filter(p => 
        p.tags.includes('timeless') || p.tags.includes('luxury')
      );
    } else if (analysis.brightness < 0.3) {
      // Dark images - prefer rich, dramatic items
      filtered = filtered.filter(p => 
        p.tags.includes('luxury') || p.tags.includes('handcrafted')
      );
    }
    
    if (analysis.saturation > 0.5) {
      // High saturation - prefer unique, artisanal items
      filtered = filtered.filter(p => 
        p.tags.includes('handcrafted') || p.tags.includes('limited edition')
      );
    }
    
    // If no matches, show featured products
    if (filtered.length === 0) {
      filtered = products.filter(p => p.featured);
    }
    
    // Shuffle and take top 6
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setRecommendedProducts(shuffled.slice(0, 6));
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysisResults(null);
    setRecommendedProducts([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Style Discovery
          </div>
          
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">
            Shop the Look
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Upload an image and let our AI curator find products that match your aesthetic vision. 
            Discover pieces that complement your style inspiration.
          </p>
        </div>

        {!selectedImage ? (
          /* Upload Section */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-luxury p-8">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-neutral-300 rounded-lg p-12 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary-700" />
                </div>
                
                <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-2">
                  Upload Your Inspiration
                </h3>
                <p className="text-secondary-600 mb-4">
                  Choose an image that captures the style you're looking for
                </p>
                
                <button className="inline-flex items-center px-6 py-3 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors">
                  <Camera className="w-4 h-4 mr-2" />
                  Select Image
                </button>
                
                <p className="text-xs text-secondary-500 mt-4">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        ) : (
          /* Analysis & Results */
          <div className="space-y-8">
            {/* Image Preview & Analysis */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-semibold text-secondary-800">
                  Style Analysis
                </h2>
                <button
                  onClick={clearImage}
                  className="p-2 text-secondary-400 hover:text-secondary-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedImage}
                    alt="Uploaded inspiration"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="font-medium text-secondary-800">Analyzing your style...</p>
                        <p className="text-sm text-secondary-600 mt-2">
                          Our AI is identifying colors, patterns, and aesthetic elements
                        </p>
                      </div>
                    </div>
                  ) : analysisResults ? (
                    <div>
                      <h3 className="font-semibold text-secondary-800 mb-3">Color Palette</h3>
                      <div className="flex space-x-2 mb-4">
                        {analysisResults.dominantColors.map((color, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-lg border border-neutral-200"
                            style={{ backgroundColor: color }}
                            title={color}
                          ></div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-neutral-50 rounded-lg">
                          <p className="text-sm font-medium text-secondary-800">Brightness</p>
                          <div className="w-full bg-neutral-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${analysisResults.brightness * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-neutral-50 rounded-lg">
                          <p className="text-sm font-medium text-secondary-800">Saturation</p>
                          <div className="w-full bg-neutral-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-accent-600 h-2 rounded-full"
                              style={{ width: `${analysisResults.saturation * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="font-serif text-2xl font-bold text-secondary-800 mb-4">
                    Curated Matches
                  </h2>
                  <p className="text-secondary-600">
                    Products that complement your style inspiration
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <button
                    onClick={clearImage}
                    className="inline-flex items-center px-6 py-3 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Try Another Image
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Hidden canvas for image analysis */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default ShopTheLook;