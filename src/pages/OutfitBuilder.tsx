import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Save, Share2, Trash2, Plus, Eye } from 'lucide-react';
import { products } from '../data/products';
import { useAuth } from '../contexts/AuthContext';

interface OutfitItem {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  position: { x: number; y: number };
}

interface SavedOutfit {
  id: string;
  name: string;
  items: OutfitItem[];
  createdAt: string;
  isPublic: boolean;
}

const OutfitBuilder: React.FC = () => {
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState<OutfitItem[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [outfitName, setOutfitName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Apparel', 'Accessories', 'Home'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'products' && destination.droppableId === 'canvas') {
      const product = filteredProducts[source.index];
      const newItem: OutfitItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
        position: { x: 50, y: 50 + (selectedItems.length * 20) }
      };

      if (!selectedItems.find(item => item.id === product.id)) {
        setSelectedItems(prev => [...prev, newItem]);
      }
    }

    if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
      const items = Array.from(selectedItems);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setSelectedItems(items);
    }
  };

  const removeItem = (id: number) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const saveOutfit = () => {
    if (!outfitName.trim() || selectedItems.length === 0) return;

    const newOutfit: SavedOutfit = {
      id: Date.now().toString(),
      name: outfitName,
      items: selectedItems,
      createdAt: new Date().toISOString(),
      isPublic: false
    };

    setSavedOutfits(prev => [...prev, newOutfit]);
    setOutfitName('');
    setShowSaveModal(false);
    
    // Save to localStorage
    const existingOutfits = JSON.parse(localStorage.getItem('elanvir_outfits') || '[]');
    localStorage.setItem('elanvir_outfits', JSON.stringify([...existingOutfits, newOutfit]));
  };

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  const shareOutfit = () => {
    const shareData = {
      title: `Check out my ElanVir outfit: ${outfitName || 'My Curated Look'}`,
      text: `I created this amazing outfit using ElanVir's Outfit Builder. Total value: $${getTotalPrice().toFixed(2)}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`);
      alert('Outfit link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">
            Outfit Builder
          </h1>
          <p className="text-lg text-secondary-600">
            Create and curate your perfect looks by dragging products onto the canvas.
          </p>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Product Catalog */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
                <h3 className="font-serif text-lg font-semibold text-secondary-800 mb-4">
                  Product Catalog
                </h3>

                {/* Category Filter */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activeCategory === category
                            ? 'bg-primary-600 text-white'
                            : 'bg-neutral-100 text-secondary-600 hover:bg-neutral-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <Droppable droppableId="products">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3 max-h-96 overflow-y-auto"
                    >
                      {filteredProducts.slice(0, 10).map((product, index) => (
                        <Draggable
                          key={product.id}
                          draggableId={product.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg cursor-grab transition-all ${
                                snapshot.isDragging ? 'shadow-lg scale-105' : 'hover:bg-neutral-100'
                              }`}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-secondary-800 truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-secondary-600">${product.price}</p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>

            {/* Canvas */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-card p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-semibold text-secondary-800">
                    Your Outfit Canvas
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedItems([])}
                      className="p-2 text-secondary-400 hover:text-error-600 transition-colors"
                      title="Clear canvas"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Droppable droppableId="canvas">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-96 border-2 border-dashed rounded-lg p-4 transition-colors ${
                        snapshot.isDraggingOver
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-neutral-300 bg-neutral-50'
                      }`}
                    >
                      {selectedItems.length === 0 ? (
                        <div className="flex items-center justify-center h-96 text-center">
                          <div>
                            <Plus className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                            <p className="text-secondary-600 font-medium">
                              Drag products here to start building your outfit
                            </p>
                            <p className="text-sm text-secondary-500 mt-2">
                              Mix and match items to create your perfect look
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedItems.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={`canvas-${item.id}`}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`relative group ${
                                    snapshot.isDragging ? 'scale-105 shadow-lg' : ''
                                  }`}
                                >
                                  <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-card">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-error-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                  <div className="mt-2">
                                    <p className="font-medium text-sm text-secondary-800 truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-secondary-600">${item.price}</p>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                {selectedItems.length > 0 && (
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg text-secondary-800">
                        Total: ${getTotalPrice().toFixed(2)}
                      </p>
                      <p className="text-sm text-secondary-600">
                        {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={shareOutfit}
                        className="flex items-center px-4 py-2 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </button>
                      
                      <button
                        onClick={() => setShowSaveModal(true)}
                        className="flex items-center px-4 py-2 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Outfit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Saved Outfits */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
                <h3 className="font-serif text-lg font-semibold text-secondary-800 mb-4">
                  Saved Outfits
                </h3>

                {savedOutfits.length === 0 ? (
                  <div className="text-center py-8">
                    <Eye className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-secondary-600">
                      No saved outfits yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedOutfits.map((outfit) => (
                      <div key={outfit.id} className="p-3 bg-neutral-50 rounded-lg">
                        <h4 className="font-medium text-secondary-800 mb-1">
                          {outfit.name}
                        </h4>
                        <p className="text-xs text-secondary-600 mb-2">
                          {outfit.items.length} items • ${outfit.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                        </p>
                        <div className="flex -space-x-2">
                          {outfit.items.slice(0, 3).map((item) => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                          {outfit.items.length > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-neutral-200 flex items-center justify-center">
                              <span className="text-xs font-medium text-secondary-600">
                                +{outfit.items.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DragDropContext>

        {/* Save Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-luxury p-6 w-full max-w-md">
              <h3 className="font-serif text-xl font-semibold text-secondary-800 mb-4">
                Save Your Outfit
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Outfit Name
                </label>
                <input
                  type="text"
                  value={outfitName}
                  onChange={(e) => setOutfitName(e.target.value)}
                  placeholder="Enter outfit name..."
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 px-4 py-2 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  onClick={saveOutfit}
                  disabled={!outfitName.trim() || selectedItems.length === 0}
                  className="flex-1 px-4 py-2 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitBuilder;