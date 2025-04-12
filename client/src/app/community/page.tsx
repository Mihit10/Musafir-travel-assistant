// pages/community.tsx
"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeartIcon, GlobeIcon, HomeIcon, ClockIcon } from 'lucide-react';

// Types
type StateType = 'Goa' | 'Kerala' | 'Himachal' | 'Uttarakhand' | 'Rajasthan';
type CategoryType = 'all' | 'attractions' | 'reviews' | 'gems' | 'tours';

interface Category {
  id: CategoryType;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface DiscoveryItem {
  id: string;
  type: CategoryType;
  title: string;
  description: string;
  imageSrc: string; 
  tags: string[];
}

interface StateData {
  [key: string]: DiscoveryItem[];
}

// Component for the state dropdown
const StateDropdown = ({ 
  selected, 
  states, 
  onChange 
}: { 
  selected: StateType; 
  states: StateType[]; 
  onChange: (state: StateType) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-20 w-full md:w-64">
      <button 
        className="bg-white shadow-md rounded-lg px-6 py-3 text-lg font-medium flex items-center justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <svg className={`w-5 h-5 ml-2 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute w-full bg-white shadow-lg rounded-lg mt-1 py-2 z-30"
        >
          {states.map(state => (
            <button 
              key={state}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              onClick={() => {
                onChange(state);
                setIsOpen(false);
              }}
            >
              {state}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

// Component for category filter tags
const CategoryTags = ({ 
  categories, 
  selected, 
  onChange 
}: { 
  categories: Category[]; 
  selected: CategoryType; 
  onChange: (category: CategoryType) => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center md:justify-end gap-2">
      {categories.map(category => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === category.id
              ? 'bg-teal-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          onClick={() => onChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

// Discovery card component
const DiscoveryCard = ({ 
  item, 
  isFavorite, 
  onToggleFavorite 
}: { 
  item: DiscoveryItem; 
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={item.imageSrc} 
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <button 
            onClick={onToggleFavorite}
            className="focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <HeartIcon 
              className={`w-6 h-6 transition-all duration-300 ${
                isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {item.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// SustainabilityFeature component
const SustainabilityFeature = ({
  icon: Icon,
  title,
  description,
  bgColor,
  iconColor,
}: {
  icon: any;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
      <div className={`${iconColor} mb-4`}>
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

// Main community page component
export default function CommunityPage() {
  const [selectedState, setSelectedState] = useState<StateType>('Goa');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  const states: StateType[] = ['Goa', 'Kerala', 'Himachal', 'Uttarakhand', 'Rajasthan'];
  
  const categories: Category[] = [
    { id: 'all', name: 'All Updates' },
    { id: 'attractions', name: 'New Attractions' },
    { id: 'reviews', name: 'Recent Reviews' },
    { id: 'gems', name: 'Hidden Gems' },
    { id: 'tours', name: 'Exclusive Tours' }
  ];
  
  // Mock data for community discoveries
  const stateData: StateData = {
    'Goa': [
      {
        id: 'goa1',
        type: 'attractions',
        title: 'Butterfly Conservatory of Goa',
        description: 'A newly expanded sanctuary home to over 100 butterfly species',
        imageSrc: '/images/goa-butterfly.jpg',
        tags: ['eco-friendly', 'family', 'nature']
      },
      {
        id: 'goa2',
        type: 'gems',
        title: 'Secret Beach Trail in Arambol',
        description: 'Local fishermen reveal hidden coastal path with breathtaking views',
        imageSrc: '/images/goa-beach-trail.jpg',
        tags: ['adventure', 'local-experience', 'beach']
      },
      {
        id: 'goa3',
        type: 'tours',
        title: 'Spice Farm Lunch with Local Family',
        description: 'Experience authentic Goan cuisine prepared with freshly harvested spices',
        imageSrc: '/images/goa-spice-farm.jpg',
        tags: ['food', 'cultural', 'local-experience']
      },
      {
        id: 'goa4',
        type: 'reviews',
        title: 'Divar Island Cycling Tour',
        description: 'Visitors rave about this sustainable tour through peaceful villages',
        imageSrc: '/images/goa-cycling.jpg',
        tags: ['eco-friendly', 'adventure', 'rural']
      }
    ],
    'Kerala': [
      {
        id: 'kerala1',
        type: 'attractions',
        title: 'Jatayu Earth Center',
        description: 'Adventure park with world\'s largest bird sculpture and sustainability focus',
        imageSrc: '/images/kerala-jatayu.jpg',
        tags: ['eco-friendly', 'adventure', 'cultural']
      },
      {
        id: 'kerala2',
        type: 'gems',
        title: 'Kumarakom Bird Sanctuary',
        description: 'Recently expanded trails showcase rare migratory birds',
        imageSrc: '/images/kerala-birds.jpg',
        tags: ['eco-friendly', 'nature', 'photography']
      },
      {
        id: 'kerala3',
        type: 'tours',
        title: 'Traditional Fishing with Locals',
        description: 'Learn ancient fishing techniques and enjoy fresh catch for lunch',
        imageSrc: '/images/kerala-fishing.jpg',
        tags: ['cultural', 'food', 'local-experience']
      },
      {
        id: 'kerala4',
        type: 'reviews',
        title: 'Munnar Tea Estate Stay',
        description: 'Sustainable accommodations among the rolling hills of tea plantations',
        imageSrc: '/images/kerala-tea.jpg',
        tags: ['eco-friendly', 'luxury', 'rural']
      }
    ],
    'Himachal': [
      {
        id: 'himachal1',
        type: 'attractions',
        title: 'Himalayan Bird Park',
        description: 'Conservation center featuring rare Himalayan bird species',
        imageSrc: '/images/himachal-birds.jpg',
        tags: ['eco-friendly', 'nature', 'family']
      },
      {
        id: 'himachal2',
        type: 'gems',
        title: 'Malana Ancient Village',
        description: 'Preserved cultural heritage site with unique architecture',
        imageSrc: '/images/himachal-malana.jpg',
        tags: ['cultural', 'photography', 'heritage']
      },
      {
        id: 'himachal3',
        type: 'tours',
        title: 'Apple Harvest Experience',
        description: 'Join local farmers to pick and process apples during harvest season',
        imageSrc: '/images/himachal-apples.jpg',
        tags: ['food', 'local-experience', 'rural']
      },
      {
        id: 'himachal4',
        type: 'reviews',
        title: 'Kalka-Shimla Railway Journey',
        description: 'UNESCO heritage train ride through stunning mountain landscapes',
        imageSrc: '/images/himachal-train.jpg',
        tags: ['heritage', 'scenic', 'train-journey']
      }
    ],
    'Uttarakhand': [
      {
        id: 'uttarakhand1',
        type: 'attractions',
        title: 'Valley of Flowers Extension',
        description: 'Newly accessible areas of this UNESCO World Heritage site',
        imageSrc: '/images/uttarakhand-flowers.jpg',
        tags: ['eco-friendly', 'nature', 'trekking']
      },
      {
        id: 'uttarakhand2',
        type: 'gems',
        title: 'Mukteshwar Sunrise Point',
        description: 'Lesser-known viewpoint with panoramic Himalayan vistas',
        imageSrc: '/images/uttarakhand-sunrise.jpg',
        tags: ['scenic', 'photography', 'peaceful']
      },
      {
        id: 'uttarakhand3',
        type: 'tours',
        title: 'Traditional Craft Workshops',
        description: 'Learn wool weaving and woodcarving from local artisans',
        imageSrc: '/images/uttarakhand-crafts.jpg',
        tags: ['cultural', 'handicrafts', 'local-experience']
      },
      {
        id: 'uttarakhand4',
        type: 'reviews',
        title: 'Binsar Wildlife Sanctuary Stay',
        description: 'Eco-lodges with minimal environmental impact and maximum views',
        imageSrc: '/images/uttarakhand-binsar.jpg',
        tags: ['eco-friendly', 'wildlife', 'luxury']
      }
    ],
    'Rajasthan': [
      {
        id: 'rajasthan1',
        type: 'attractions',
        title: 'Jaisalmer Desert National Park',
        description: 'Newly designated conservation area with desert wildlife tours',
        imageSrc: '/images/rajasthan-desert.jpg',
        tags: ['wildlife', 'eco-friendly', 'adventure']
      },
      {
        id: 'rajasthan2',
        type: 'gems',
        title: 'Shekhawati Haveli Circuit',
        description: 'Restored mansions showcasing incredible frescos and architecture',
        imageSrc: '/images/rajasthan-haveli.jpg',
        tags: ['heritage', 'art', 'photography']
      },
      {
        id: 'rajasthan3',
        type: 'tours',
        title: 'Bishnoi Village Safari',
        description: 'Visit communities known for their ecological conservation traditions',
        imageSrc: '/images/rajasthan-bishnoi.jpg',
        tags: ['eco-friendly', 'cultural', 'local-experience']
      },
      {
        id: 'rajasthan4',
        type: 'reviews',
        title: 'Palace on Wheels Experience',
        description: 'Luxury train journey through rural Rajasthan with local interactions',
        imageSrc: '/images/rajasthan-train.jpg',
        tags: ['luxury', 'train-journey', 'heritage']
      }
    ]
  };
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    // Optional: Save to localStorage or sync with API
    if (typeof window !== 'undefined') {
      localStorage.setItem('communityFavorites', JSON.stringify({
        ...favorites,
        [id]: !favorites[id]
      }));
    }
  };
  
  // Filter discoveries based on selected category
  const filteredData = stateData[selectedState]?.filter(item => 
    selectedCategory === 'all' || item.type === selectedCategory
  ) || [];

  // Load favorites from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('communityFavorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Community Discoveries | Explore Local India</title>
        <meta name="description" content="Connect with local experiences and sustainable tourism opportunities across India" />
      </Head>

      <div className="min-h-screen">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-blue-800 to-teal-500 text-white py-16 text-center">
          <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Community Discoveries
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto"
            >
              Connect with local experiences and sustainable tourism opportunities across India
            </motion.p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* State Selection & Filters */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col md:flex-row justify-between items-center mb-12"
          >
            {/* State Dropdown */}
            <StateDropdown 
              selected={selectedState} 
              states={states}
              onChange={setSelectedState}
            />
            
            {/* Category Tags */}
            <div className="mt-6 md:mt-0">
              <CategoryTags 
                categories={categories}
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </motion.div>
          
          {/* Content Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((item, index) => (
                <DiscoveryCard
                  key={item.id}
                  item={item}
                  isFavorite={!!favorites[item.id]}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No discoveries found for the selected filters.</p>
            </div>
          )}
          
          {/* Sustainability Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-20 mb-12"
          >
            <h2 className="text-3xl font-semibold text-center mb-12">Make Your Trip Matter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SustainabilityFeature
                icon={GlobeIcon}
                title="Eco-Friendly Tours"
                description="Support conservation efforts and reduce your carbon footprint with our curated eco-friendly experiences."
                bgColor="bg-green-50"
                iconColor="text-green-600"
              />
              
              <SustainabilityFeature
                icon={HomeIcon}
                title="Home-Cooked Meals"
                description="Experience authentic cuisine while dining with local families and supporting community businesses."
                bgColor="bg-blue-50"
                iconColor="text-blue-600"
              />
              
              <SustainabilityFeature
                icon={ClockIcon}
                title="Heritage Train Journeys"
                description="Discover India's scenic beauty on historic train routes that support local economies along the way."
                bgColor="bg-purple-50"
                iconColor="text-purple-600"
              />
            </div>
          </motion.div>
          
          {/* Newsletter Signup */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-xl p-8 text-center mt-12"
          >
            <h3 className="text-2xl font-semibold mb-4">Stay Updated with Local Discoveries</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Subscribe to receive personalized recommendations and support sustainable tourism initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg flex-grow shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <button className="bg-teal-600 hover:bg-teal-700 transition-colors text-white px-6 py-3 rounded-lg shadow-sm font-medium">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Explore Local India</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Connecting travelers with authentic experiences while supporting local communities and sustainable tourism.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12.07c0-5.525-4.475-10-10-10s-10 4.475-10 10c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54v-2.891h2.54V9.796c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.771l-.443 2.891h-2.328v6.988C18.343 21.198 22 17.061 22 12.07z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2c-2.716 0-3.056.012-4.123.06-1.064.049-1.791.218-2.427.465a4.902 4.902 0 00-1.772 1.153A4.902 4.902 0 002.525 5.45c-.247.636-.416 1.363-.465 2.427C2.012 8.944 2 9.284 2 12s.012 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 00-1.153-1.772 4.902 4.902 0 00-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2zm0 1.802c2.67 0 2.986.01 4.04.058.976.045 1.505.207 1.858.344.466.181.8.398 1.15.748.35.35.566.684.748 1.15.137.353.3.882.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.207 1.505-.344 1.858-.181.466-.398.8-.748 1.15-.35.35-.684.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.976-.045-1.505-.207-1.858-.344-.466-.181-.8-.398-1.15-.748-.35-.35-.566-.684-.748-1.15-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.207-1.505.344-1.858.181-.466.398-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.055-.048 1.37-.058 4.041-.058z"/>
                    <path d="M12 15.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm0-8.468a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27z"/>
                    <circle cx="17.334" cy="6.666" r="1.2"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
