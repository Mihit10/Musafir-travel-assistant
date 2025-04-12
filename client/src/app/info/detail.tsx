"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Simulated data - in a real app, this would come from an API or CMS
const tajMahalData = {
  title: "Taj Mahal",
  location: "Agra, India",
  mainImage: "/api/placeholder/800/800", // Made taller for longer card
  thingsToDo: [
    { name: "Mehtab Bagh", distance: "1.2 km", time: "15 min walk" },
    { name: "Agra Fort", distance: "2.5 km", time: "10 min drive" },
    { name: "Fatehpur Sikri", distance: "40 km", time: "1 hour drive" }
  ],
  nearbyAttractions: [
    { name: "Agra Fort", image: "/api/placeholder/200/200" },
    { name: "Itimad-ud-Daulah", image: "/api/placeholder/200/200" },
    { name: "Mehtab Bagh", image: "/api/placeholder/200/200" },
    { name: "Fatehpur Sikri", image: "/api/placeholder/200/200" }
  ],
  proTip: "Visit during sunrise to avoid crowds and capture the marble changing colors in the morning light.",
  localFood: [
    {
      name: "Petha",
      image: "/api/placeholder/200/200", // Using placeholder instead of /images/petha.jpg
      description: "A translucent sweet made from ash gourd, native to Agra."
    },
    {
      name: "Gajak",
      image: "/api/placeholder/200/200", // Using placeholder instead of /images/gajak.jpg
      description: "Crispy sesame sweet, popular during winters."
    }
  ],
  history: "Built between 1632 and 1653 by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the Taj Mahal is considered the greatest architectural achievement in the whole range of Indo-Islamic architecture. The marble mausoleum stands on a raised platform with four identical facades, each with a massive arch in the center. Its central dome reaches a height of 240 feet.",
  placeInfo: {
    entryFee: "₹1,100 for foreigners, ₹50 for Indians",
    openHours: "Sunrise to sunset (closed on Fridays)",
    restrictions: "No tripods, food, or smoking",
    dressCode: "Modest clothing recommended"
  },
  realtimeData: {
    crowdStatus: "Moderate",
    visitorCount: "~450 visitors now",
    weather: "28°C, Sunny"
  }
};

// Custom animation variants for directional gradient transitions
const leftToRightGradient = {
    hidden: { 
      backgroundPosition: "0% 0%",
      backgroundSize: "200% 100%", 
      opacity: 0.7
    },
    visible: { 
      backgroundPosition: "100% 0%",
      backgroundSize: "100% 100%",
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

const rightToLeftGradient = {
  hidden: { 
    backgroundPosition: "100% 0%", 
    backgroundSize: "200% 100%", 
    opacity: 0.7 
  },
  visible: { 
    backgroundPosition: "0% 0%",
    backgroundSize: "100% 100%",
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const topToBottomGradient = {
  hidden: { 
    backgroundPosition: "0% 0%", 
    backgroundSize: "100% 200%", 
    opacity: 0.7 
  },
  visible: { 
    backgroundPosition: "0% 100%",
    backgroundSize: "100% 100%",
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const bottomToTopGradient = {
  hidden: { 
    backgroundPosition: "0% 100%", 
    backgroundSize: "100% 200%", 
    opacity: 0.7 
  },
  visible: { 
    backgroundPosition: "0% 0%",
    backgroundSize: "100% 100%",
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.7 }
  }
};

export default function BenitoGrid() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render animations on client side to avoid hydration mismatch
  if (!isClient) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">{tajMahalData.title}</h1>
      
      {/* Benito Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 md:gap-6">
        
        {/* Top Row Cards */}
        <motion.div 
            className="md:col-span-2 lg:col-span-7 rounded-xl p-4 overflow-hidden"
            style={{
              background: "linear-gradient(to right, #fff1e6, #fde4cf)",
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 0%",
            }}
            initial={{ 
              backgroundPosition: "0% 0%",
              backgroundSize: "200% 100%", 
              opacity: 0.7 
            }}
            animate={{ 
              backgroundPosition: "100% 0%",
              backgroundSize: "100% 100%",
              opacity: 1,
              transition: { duration: 0.8, delay: 0.1 }
            }}
          >
          <h2 className="text-xl font-semibold mb-3">Things To Do Around</h2>
          <div className="flex items-start">
            <img src="/api/placeholder/300/200" alt="Things to do" className="rounded-lg w-1/3 mr-4" />
            <div className="flex-1">
              <ul className="mb-4">
                {tajMahalData.thingsToDo.map((item, index) => (
                  <li key={index} className="mb-2 flex items-start">
                    <span className="mr-2 text-amber-600">•</span>
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <p className="text-sm text-gray-600">{item.distance} • {item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <h3 className="font-medium text-lg mb-2">Nearby Attractions</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {tajMahalData.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                    <span className="text-sm">{attraction.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:col-span-1 lg:col-span-5 rounded-xl p-4"
          style={{
            background: "linear-gradient(to left, #feeedc, #fff0be)",
            backgroundSize: "200% 100%",
            backgroundPosition: "100% 0%"
          }}
          variants={rightToLeftGradient}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-3">Pro Tip</h2>
          <div className="flex flex-col h-full justify-between">
            <p className="italic text-gray-700">{tajMahalData.proTip}</p>
            <div className="mt-4 text-sm text-amber-700 font-medium">
              Best time to visit: October to March (Winter)
            </div>
          </div>
        </motion.div>
        
        {/* Main Center Image - Now taller */}
        <motion.div 
          className="md:col-span-6 lg:col-span-8 row-span-3 relative overflow-hidden rounded-xl h-120 md:h-auto"
          variants={fadeInScale}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.01 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
          <img 
            src={tajMahalData.mainImage} 
            alt={tajMahalData.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white z-20">
            <h2 className="text-2xl font-bold">{tajMahalData.title}</h2>
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {tajMahalData.location}
            </p>
          </div>
        </motion.div>
        
        {/* Must Eat Sweets Card */}
        <motion.div 
          className="md:col-span-2 lg:col-span-4 col-start-9 rounded-xl p-4"
          style={{
            background: "linear-gradient(to bottom, #e6f7ec, #d1f1dd)",
            backgroundSize: "100% 200%",
            backgroundPosition: "0% 0%"
          }}
          variants={topToBottomGradient}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-center">Must Eat Sweets</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tajMahalData.localFood.map((food, index) => (
              <div key={index} className="flex flex-col items-center">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  className="rounded-lg w-full h-32 object-cover mb-2"
                />
                <h3 className="font-medium text-center">{food.name}</h3>
                <p className="text-sm text-gray-600 text-center">{food.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Bottom Row Cards */}
        <motion.div 
          className="md:col-span-2 lg:col-span-8 rounded-xl p-4"
          style={{
            background: "linear-gradient(to top, #ede9fe, #ddd6fe)",
            backgroundSize: "100% 200%",
            backgroundPosition: "0% 100%"
          }}
          variants={bottomToTopGradient}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-3">History & Legacy</h2>
          <div className="flex flex-col md:flex-row items-center">
            <img src="/api/placeholder/300/200" alt="Historical image" className="rounded-lg md:w-1/3 w-full h-40 object-cover mb-4 md:mb-0 md:mr-4" />
            <p className="text-gray-700 md:flex-1">{tajMahalData.history}</p>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mx-auto">1632</div>
                <p className="text-xs mt-1">Construction began</p>
              </div>
              <div className="w-12 h-0.5 bg-indigo-300"></div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mx-auto">1653</div>
                <p className="text-xs mt-1">Completed</p>
              </div>
              <div className="w-12 h-0.5 bg-indigo-300"></div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mx-auto">1983</div>
                <p className="text-xs mt-1">UNESCO site</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:col-span-1 lg:col-span-4 rounded-xl p-4"
          style={{
            background: "linear-gradient(to right, #f3f4f6, #e5e7eb)",
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%"
          }}
          variants={leftToRightGradient}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-3">About This Place</h2>
          <ul className="space-y-2">
            <li className="flex">
              <span className="font-medium w-1/3">Entry Fee:</span>
              <span className="text-gray-700">{tajMahalData.placeInfo.entryFee}</span>
            </li>
            <li className="flex">
              <span className="font-medium w-1/3">Open Hours:</span>
              <span className="text-gray-700">{tajMahalData.placeInfo.openHours}</span>
            </li>
            <li className="flex">
              <span className="font-medium w-1/3">Restrictions:</span>
              <span className="text-gray-700">{tajMahalData.placeInfo.restrictions}</span>
            </li>
            <li className="flex">
              <span className="font-medium w-1/3">Dress Code:</span>
              <span className="text-gray-700">{tajMahalData.placeInfo.dressCode}</span>
            </li>
          </ul>
        </motion.div>
      </div>
      
      {/* Floating Real-Time Data Card */}
      <motion.div 
        className="fixed top-6 right-6 w-64 bg-white shadow-lg rounded-xl p-4 z-50"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h3 className="text-lg font-medium mb-2">Real-Time Info</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Crowd Status:</span>
            <span className="font-medium text-amber-600">{tajMahalData.realtimeData.crowdStatus}</span>
          </div>
          <div className="flex justify-between">
            <span>Visitors:</span>
            <span className="font-medium">{tajMahalData.realtimeData.visitorCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Weather:</span>
            <span className="font-medium">{tajMahalData.realtimeData.weather}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}