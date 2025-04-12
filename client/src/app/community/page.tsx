"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, Star, Calendar, Compass, Users, Coffee, Leaf, HandHeart, ShoppingBag } from 'lucide-react';

// Types for our data
type City = 'Goa' | 'Kerala' | 'Himachal' | 'Uttarakhand' | 'Rajasthan' | 'All';
type Category = 'New Attractions' | 'Reviews' | 'Hidden Gems' | 'Exclusive Tours' | 'Local Experiences';

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  city: City;
  category: Category;
  tags: string[];
  rating: number;
  date: string;
  isFavorite: boolean;
}

// City-specific theme colors
const cityThemes = {
  'Goa': {
    primary: '#DFF6F5',     // Soft aqua – ocean breeze
    secondary: '#26A69A',   // Teal – coconut trees & water sports
    tertiary: '#FF7043'     // Warm orange – sunset party energy
  },
  'Kerala': {
    primary: '#E7F4EC',     // Backwater mist green
    secondary: '#4CAF50',   // Kerala green – forests & farms
    tertiary: '#1976D2'     // Backwater blue – clean and cool
  },
  'Himachal': {
    primary: '#E3F2FD',     // Clear mountain sky
    secondary: '#6D4C41',   // Forest brown – wood & hills  
    tertiary: '#3F51B5'     // Crisp blue – cool elevation
  },
  'Uttarakhand': {
    primary: '#F3E5F5',     // Lavender – peaceful/spiritual
    secondary: '#4CAF50',   // Forest green – Himalayan range
    tertiary: '#1E88E5'     // Glacier river blue
  },
  'Rajasthan': {
    primary: '#FFF3E0',     // Desert sand cream
    secondary: '#D84315',   // Fort terracotta
    tertiary: '#C2185B'     // Bold pink – traditional textiles
  },
  'All': {
    primary: '#F5F7FA',     // Neutral light background
    secondary: '#26A69A',   // Teal as default accent
    tertiary: '#3F51B5'     // Blue as default secondary
  }
};

export default function CommunityPage() {
  const [selectedCity, setSelectedCity] = useState<City>('All');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  
  // Get current theme colors based on selected city
  const currentTheme = cityThemes[selectedCity];

  // Tags for filtering
  const availableTags = [
    { name: 'Eco-Friendly', icon: <Leaf className="w-4 h-4" /> },
    { name: 'Train Journeys', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'Local Food', icon: <Coffee className="w-4 h-4" /> },
    { name: 'Meet Locals', icon: <Users className="w-4 h-4" /> },
    { name: 'Adventure', icon: <Compass className="w-4 h-4" /> },
  ];

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    // Simulating API call
    const fetchPosts = async () => {
      // Mock data
      const mockPosts: Post[] = [
        {
          id: '1',
          title: 'Newly Opened Butterfly Sanctuary',
          description: 'Experience the wonder of hundreds of butterfly species in this eco-friendly sanctuary operated by local communities.',
          imageUrl: 'https://inditales.com/wp-content/uploads/2014/05/butterfly-conservatory-direction-board.jpg',
          city: 'Goa',
          category: 'New Attractions',
          tags: ['Eco-Friendly', 'Adventure'],
          rating: 4.8,
          date: '2025-04-02',
          isFavorite: false
        },
        {
          id: '2',
          title: 'Traditional Spice Garden Tour',
          description: 'Walk through aromatic spice plantations with a local farmer and learn about sustainable agriculture practices.',
          imageUrl: 'https://www.birdsholiday.com/media/activity/e802b73436d5de5348f6c33e2b4b4d6c.jpg',
          city: 'Kerala',
          category: 'Exclusive Tours',
          tags: ['Eco-Friendly', 'Meet Locals'],
          rating: 4.9,
          date: '2025-03-28',
          isFavorite: false
        },
        {
          id: '3',
          title: 'Hidden Mountain Village Stay',
          description: 'Experience authentic Himalayan life in this remote village where you can stay with local families.',
          imageUrl: 'https://assets.cntraveller.in/photos/60ba23f4f27d46df614fc8e0/master/w_1600%2Cc_limit/Nabakov-Cottage-866x578.jpg',
          city: 'Himachal',
          category: 'Hidden Gems',
          tags: ['Meet Locals', 'Local Food'],
          rating: 4.7,
          date: '2025-04-05',
          isFavorite: false
        },
        {
          id: '4',
          title: 'Valley of Flowers Trek',
          description: 'Join local guides on this stunning trek through the UNESCO World Heritage site with minimal environmental impact.',
          imageUrl: 'https://trekthehimalayas.com/images/ValleyofFlowersTrek/Slider/b3d630fb-3f9a-4cc6-9fef-1be72e135695_VOF.jpg',
          city: 'Uttarakhand',
          category: 'Exclusive Tours',
          tags: ['Eco-Friendly', 'Adventure'],
          rating: 4.9,
          date: '2025-03-25',
          isFavorite: false
        },
        {
          id: '5',
          title: 'Desert Home Cooking Class',
          description: 'Learn traditional Rajasthani recipes in a local home using ancient cooking methods.',
          imageUrl: 'https://images.myguide-cdn.com/rajasthan/companies/jaipur-home-cooking-class-and-dinner-with-a-local-family/large/jaipur-home-cooking-class-and-dinner-with-a-local-family-2828714.jpg',
          city: 'Rajasthan',
          category: 'Local Experiences',
          tags: ['Local Food', 'Meet Locals'],
          rating: 4.8,
          date: '2025-04-10',
          isFavorite: false
        },
        {
          id: '6',
          title: 'Heritage Train Journey',
          description: 'Travel on a restored narrow-gauge train through scenic landscapes with a local historian as your guide.',
          imageUrl: 'https://informationsite.in/wp-content/uploads/2024/08/Valley-Queen-Heritage-Train.jpg',
          city: 'Rajasthan',
          category: 'Hidden Gems',
          tags: ['Train Journeys', 'Eco-Friendly'],
          rating: 4.6,
          date: '2025-04-08',
          isFavorite: false
        },
        {
          id: '7',
          title: 'Backwater Village Lunch',
          description: 'Enjoy a home-cooked meal with a local family while supporting sustainable tourism in Kerala\'s backwaters.',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzPMNXJG66E9PIJvfGMvG8ERtmsoRURCxO9A&s',
          city: 'Kerala',
          category: 'Local Experiences',
          tags: ['Local Food', 'Meet Locals', 'Eco-Friendly'],
          rating: 4.9,
          date: '2025-04-01',
          isFavorite: false
        },
        {
          id: '8',
          title: 'Beach Cleanup Initiative',
          description: 'Join locals in preserving Goa\'s beautiful beaches through this community-led conservation effort.',
          imageUrl: 'https://growbilliontrees.com/cdn/shop/files/iStock-472102653-beach-cleaning.jpg?v=1734761735&width=1500',
          city: 'Goa',
          category: 'New Attractions',
          tags: ['Eco-Friendly', 'Meet Locals'],
          rating: 4.7,
          date: '2025-04-09',
          isFavorite: false
        },
      ];

      setPosts(mockPosts);
    };

    fetchPosts();
  }, []);

  // Filter posts based on selected filters
  useEffect(() => {
    let filtered = [...posts];
    
    // Filter by city if not "All"
    if (selectedCity !== 'All') {
      filtered = filtered.filter(post => post.city === selectedCity);
    }
    
    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Filter by tags if any selected
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.every(tag => post.tags.includes(tag))
      );
    }
    
    setFilteredPosts(filtered);
  }, [posts, selectedCity, selectedCategory, selectedTags]);

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, isFavorite: !post.isFavorite } : post
    ));
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.primary }}>
      {/* Hero Section with Title */}
      <motion.div 
        className="relative h-64 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(to right, ${currentTheme.secondary}, ${currentTheme.tertiary})`,
          opacity: 0.8 
        }}></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-2"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Community Discoveries
          </motion.h1>
          <motion.p 
            className="text-xl text-white max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Explore local experiences and sustainable travel across India
          </motion.p>
        </div>
      </motion.div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* City Dropdown */}
            <div>
              <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <select
                  id="city-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value as City)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
                >
                  <option value="All">All Destinations</option>
                  <option value="Goa">Goa</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Himachal">Himachal</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400 mr-4" />
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  id="category-select"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value as Category || null)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
                >
                  <option value="">All Categories</option>
                  <option value="New Attractions">New Attractions</option>
                  <option value="Reviews">Reviews</option>
                  <option value="Hidden Gems">Hidden Gems</option>
                  <option value="Exclusive Tours">Exclusive Tours</option>
                  <option value="Local Experiences">Local Experiences</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Compass className="h-5 w-5 text-gray-400 mr-4" />
                </div>
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <motion.button
                    key={tag.name}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedTags.includes(tag.name)
                        ? 'bg-teal-100 text-teal-800 border border-teal-300'
                        : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleTag(tag.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-1">{tag.icon}</span>
                    {tag.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: currentTheme.secondary }}>
            <span className="mr-2">
              {selectedCity === 'All' ? 'Discovering India' : `Discovering ${selectedCity}`}
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Compass className="h-5 w-5" style={{ color: currentTheme.tertiary }} />
            </motion.div>
          </h2>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  layout
                >
                  <div className="relative">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <motion.button
                        className={`p-2 rounded-full ${
                          post.isFavorite ? 'bg-red-50' : 'bg-white'
                        }`}
                        onClick={() => toggleFavorite(post.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            post.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
                          }`} 
                        />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-2"
                        style={{ backgroundColor: cityThemes[post.city].secondary }}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" style={{ color: cityThemes[post.city].secondary }} />
                        <span className="text-sm text-gray-600">{post.city}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{post.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-block px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: `${cityThemes[post.city].primary}`, 
                            color: `${cityThemes[post.city].secondary}` 
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <motion.button 
                        className="text-sm font-medium"
                        style={{ color: cityThemes[post.city].tertiary }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(`${post.title} ${post.city}`)}`, '_blank')}
                      >
                        Read more
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 text-lg">No experiences found with current filters.</p>
              <p className="text-gray-400">Try adjusting your filters or check back later!</p>
            </motion.div>
          )}
        </div>

        {/* Eco-Friendly Initiative Section */}
        <motion.div 
          className="rounded-lg p-6 shadow-md mb-8"
          style={{ backgroundColor: `${currentTheme.primary}40` }} // Adding 40 for 25% opacity
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Leaf className="h-16 w-16 mx-auto mb-2" style={{ color: currentTheme.secondary }} />
                <h3 className="text-xl font-bold text-center" style={{ color: currentTheme.secondary }}>
                  Eco-Travel Initiative
                </h3>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Supporting Sustainable Travel</h3>
              <p className="text-gray-600 mb-4">
                Our community pages highlight eco-friendly experiences that minimize environmental impact while 
                maximizing positive contributions to local communities.
              </p>
              <div className="flex flex-wrap gap-2">
                
                <motion.button 
                  className="inline-flex items-center px-4 py-2 text-white rounded-md text-sm font-medium transition-colors"
                  style={{ backgroundColor: currentTheme.secondary }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('http://www.ecoindia.com/eco-tourism-in-india.html', '_blank')}
                >
                  <Leaf className="h-4 w-4 mr-2" />
                  Learn More About Eco-Tourism
                </motion.button>
                <motion.button 
                  className="inline-flex items-center px-4 py-2 bg-white rounded-md text-sm font-medium border transition-colors"
                  style={{ color: currentTheme.secondary, borderColor: `${currentTheme.secondary}80` }}
                  whileHover={{ scale: 1.05, backgroundColor: `${currentTheme.primary}60` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('http://www.ecoindia.com/eco-tourism-in-india.html', '_blank')}
                >
                  <HandHeart className="h-4 w-4 mr-2" />
                  Join Community Initiatives
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Community Engagement Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Support Local Communities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 text-white text-center" style={{ backgroundColor: currentTheme.secondary }}>
                <Users className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-bold">Local Guides</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">
                  Book tours with local guides who share authentic insights and support their communities.
                </p>
                <motion.a 
                  href="/local-guides"
                  className="block w-full py-2 text-sm font-medium rounded-md text-center transition-colors border-2"
                  style={{ 
                    backgroundColor: `${currentTheme.primary}80`, 
                    color: currentTheme.secondary 
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Find Local Guides
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 text-white text-center" style={{ backgroundColor: currentTheme.tertiary }}>
                <Coffee className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-bold">Homestays</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">
                  Experience authentic local culture by staying with families in their homes and enjoying home-cooked meals.
                </p>
                <motion.a
                  href="/homestays"
                  className="block w-full py-2 text-sm font-medium rounded-md text-center transition-colors border-2"
                  style={{ 
                    backgroundColor: `${currentTheme.primary}80`, 
                    color: currentTheme.tertiary 
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discover Homestays
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 text-white text-center" style={{ backgroundColor: currentTheme.secondary }}>
                <HandHeart className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-bold">Support Local NGOs</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">
                  Contribute to local conservation and community development initiatives through trusted NGO partners.
                </p>
                <motion.button 
                  className="w-full py-2 text-sm font-medium rounded-md text-center transition-colors border-2"
                  style={{ 
                    backgroundColor: `${currentTheme.primary}80`, 
                    color: currentTheme.secondary 
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://www.helplocal.in/', '_blank')}
                >
                  Find NGO Partners
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}