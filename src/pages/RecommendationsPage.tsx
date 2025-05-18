import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePreferences } from '../context/PreferencesContext';
import { Heart, ShoppingCart, Share2, Filter, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  relevance: number;
}

const RecommendationsPage: React.FC = () => {
  const { selectedPreferences, loading: preferencesLoading } = usePreferences();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        // In a real app, this would be an API call with the selectedPreferences
        // For demonstration, we'll mock the recommendations
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Premium Fitness Tracker',
            description: 'Advanced health monitoring with sleep tracking and workout analytics.',
            price: 129.99,
            category: 'fitness',
            image: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=600',
            rating: 4.7,
            relevance: 98
          },
          {
            id: '2',
            name: 'Wireless Earbuds Pro',
            description: 'Immersive sound quality with active noise cancellation and 20-hour battery life.',
            price: 89.99,
            category: 'technology',
            image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600',
            rating: 4.5,
            relevance: 95
          },
          {
            id: '3',
            name: 'Smart Home Hub',
            description: 'Control all your smart devices from one central interface with voice commands.',
            price: 149.99,
            category: 'technology',
            image: 'https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg?auto=compress&cs=tinysrgb&w=600',
            rating: 4.3,
            relevance: 87
          },
          {
            id: '4',
            name: 'Minimalist Leather Watch',
            description: 'Elegant timepiece with genuine leather strap and Japanese movement.',
            price: 199.99,
            category: 'fashion',
            image: 'https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg?auto=compress&cs=tinysrgb&w=600',
            rating: 4.8,
            relevance: 89
          },
          {
            id: '5',
            name: 'Ultralight Hiking Backpack',
            description: 'Durable, water-resistant backpack perfect for weekend adventures.',
            price: 79.99,
            category: 'travel',
            image: 'https://images.pexels.com/photos/2510906/pexels-photo-2510906.jpeg?auto=compress&cs=tinysrgb&w=600',
            rating: 4.6,
            relevance: 92
          },
          {
            id: '6',
            name: 'Professional Chef Knife Set',
            description: 'High-carbon stainless steel knives for precision cutting and meal preparation.',
            price: 129.99,
            category: 'cooking',
            image: 'https://images.pexels.com/photos/4253320/pexels-photo-4253320.jpeg?auto=compress&cs=tinysrgb&w=600',
            rating: 4.9,
            relevance: 85
          },
          {
            id: '7',
            name: 'Mechanical Gaming Keyboard',
            description: 'Customizable RGB lighting with tactile key response for gaming precision.',
            price: 119.99,
            category: 'gaming',
            image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=600',
            rating: 4.4,
            relevance: 93
          },
          {
            id: '8',
            name: 'Portable Bluetooth Speaker',
            description: 'Waterproof design with 360° sound and 12-hour battery life.',
            price: 69.99,
            category: 'music',
            image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600',
            rating: 4.2,
            relevance: 88
          },
        ];

        // Filter products based on selected preferences
        const relevantProducts = selectedPreferences.length > 0
          ? mockProducts.filter(product => 
              selectedPreferences.some(pref => 
                product.category.toLowerCase() === pref.name.toLowerCase()
              )
            )
          : mockProducts;

        setProducts(relevantProducts.length > 0 ? relevantProducts : mockProducts);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        toast.error('Failed to load recommendations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [selectedPreferences]);

  const toggleLike = (id: string) => {
    toast.success('Added to favorites!');
  };

  const addToCart = (id: string) => {
    toast.success('Added to cart!');
  };

  const shareProduct = (id: string) => {
    toast.info('Share link copied to clipboard!');
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default is relevance
    return b.relevance - a.relevance;
  });

  const categories = ['all', ...new Set(products.map(product => product.category))];

  if (preferencesLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading recommendations...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Personalized Recommendations</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {selectedPreferences.length > 0 
              ? `Based on your ${selectedPreferences.map(p => p.name).join(', ')} preferences`
              : 'Explore our top picks for you'}
          </p>
        </div>
        
        {selectedPreferences.length === 0 && (
          <Link
            to="/preferences"
            className="mt-4 md:mt-0 px-6 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 transition-colors"
          >
            Set Your Preferences
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={toggleFilter}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <Filter className="w-5 h-5 mr-2" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-gray-700 dark:text-gray-300">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="border rounded-md py-1 px-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        
        {filterOpen && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-60 overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.relevance > 90 && (
                  <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Top Pick
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md">
                  <button 
                    onClick={() => toggleLike(product.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h3>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">${product.price}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({product.rating})</span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md mr-2 flex items-center justify-center transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => shareProduct(product.id)}
                    className="p-2 text-gray-500 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">No recommendations found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find products matching your current filters or preferences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSortBy('relevance');
              }}
              className="px-6 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
            <Link
              to="/preferences"
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Update Preferences
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;