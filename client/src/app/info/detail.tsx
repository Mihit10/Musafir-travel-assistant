"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import { toast } from "react-toastify"; // For toast notifications



// Simulated data - in a real app, this would come from an API or CMS

const API_URL = "https://rhino-frank-tightly.ngrok-free.app/homestays"; // Your backend API



const placeData = {
  title: "Taj Mahal",
  location: "Agra, India",
  mainImage: "/api/placeholder/800/800",
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
  history: "Built between 1632 and 1653 by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the Taj Mahal is considered the greatest architectural achievement in the whole range of Indo-Islamic architecture.",
  placeInfo: {
    entryFee: "₹1,100 for foreigners, ₹50 for Indians",
    openHours: "Sunrise to sunset (closed on Fridays)",
    restrictions: "No tripods, food, or smoking",
    dressCode: "Modest clothing recommended"
  },
};


interface ThingToDo {
  name: string;
  distance: string;
  time: string;
}

interface NearbyAttraction {
  name: string;
  time: string;
}

interface PlaceData {
  thingsToDo: ThingToDo[];
  nearbyAttractions: NearbyAttraction[];
}

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

interface BenitoFlexboxProps {
  place: string;
}

export default function BenitoFlexbox({ place }: BenitoFlexboxProps) {
  const [response, setResponse] = useState("");
  const [placeData, setPlaceData] = useState<{ [key: string]: any } | null>(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  useEffect(() => {
    if (!prompt) return;

    const callGroq = async () => {
      setLoading(true);
      setResponse("");

      const prompt = `
You are an expert travel assistant.
No field should be None. Give N/A if not applicable. 
If no history found fill history with fun facts.
If open hours not found fill open hours with preferable hours.
Place info should be very concise. Dont use round brackets in place info. 
Given a tourist location, generate a structured JSON object containing detailed and organized information about the location. The output must follow **exactly** the following format and field structure:

{
  title: string,
  location: string,
  mainImage: "/api/placeholder/800/800",
  thingsToDo: [
    { name: string, distance: string, time: string }
  ],
  nearbyAttractions: [
    { name: string, image: "/api/placeholder/200/200" }
  ],
  proTip: string,
  history: string,
  placeInfo: {
    entryFee: string,
    openHours: string,
    restrictions: string,
    dressCode: string
  }
}

Generate this JSON for the following tourist place: **${place}**

Only output a valid JSON object — do not include any extra commentary.
`;

      try {
        console.log(prompt)
        console.log(apiKey)
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${apiKey}` // ⚠️ Replace with your key (safe only in dev)
          },
          body: JSON.stringify({
            model: "llama3-70b-8192",
            messages: [{ role: "user", content: prompt }],
          }),
        });

        const data = await res.json();
        console.log(data.choices[0]?.message?.content)
        setResponse(data.choices[0]?.message?.content || "No response");
        try {
          const placeData = JSON.parse(data.choices[0]?.message?.content || '{}');
          setPlaceData(placeData); // Set placeData as the parsed JSON
        } catch (error) {
          console.error("Error parsing response as JSON:", error);
          setPlaceData(null); // If the content is not valid JSON, set placeData to null or default value
        }
      } catch (err) {
        if (err instanceof Error) {
          setResponse("Error calling Groq: " + err.message);
        } else {
          setResponse("Unknown error occurred.");
        }
      }
      setLoading(false);
    };

    callGroq();
  }, [place]);


  const [homestays, setHomestays] = useState([]);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        setHomestays(response.data);
        console.log(response.data)
      } catch (error) {
        toast.error("Failed to load homestays");
      }
    };

    fetchHomestays();
  }, []);

  // Only render animations on client side to avoid hydration mismatch
  if (!isClient) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader or spinner component
  }

  return placeData ? (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">{placeData.title}</h1>
      
      {/* Benito Flexbox Layout */}
      <div className="flex flex-col gap-4 md:gap-6">
        
        {/* First Row: Main Image and Pro Tips */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 max-h-screen">
  <motion.div
    className="flex-1 md:flex-grow-3 min-h-56 md:min-h-64 max-h-3/4 relative overflow-hidden rounded-xl"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
    <img
      src="/taj-mahal.webp"
      alt={placeData.title}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-4 left-4 text-white z-20">
      <h2 className="text-2xl font-bold">{placeData.title}</h2>
      <p className="flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        {placeData.location}
      </p>
    </div>
  </motion.div>
  
  <motion.div 
    className="flex-1 md:w-1/3 flex flex-col gap-3 max-h-3/4 overflow-auto"
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {/* Pro Tip Card */}
    <motion.div
      className="rounded-xl p-4 flex flex-col"
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
      <p className="italic text-gray-700">{placeData.proTip}</p>
    </motion.div>

    {/* About This Place Card */}
    <motion.div 
      className="rounded-xl p-4"
      style={{
        background: "linear-gradient(to right, #f3f4f6, #e5e7eb)",
        backgroundSize: "200% 100%",
        backgroundPosition: "0% 0%"
      }}
      variants={leftToRightGradient}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-3">About This Place</h2>
      <ul className="space-y-2">
        <li className="flex flex-col sm:flex-row">
          <span className="font-medium sm:w-1/3">Entry Fee:</span>
          <span className="text-gray-700">{placeData.placeInfo.entryFee}</span>
        </li>
        <li className="flex flex-col sm:flex-row">
          <span className="font-medium sm:w-1/3">Open Hours:</span>
          <span className="text-gray-700">{placeData.placeInfo.openHours}</span>
        </li>
        <li className="flex flex-col sm:flex-row">
          <span className="text-gray-700">{placeData.placeInfo.restrictions}</span>
        </li>
        <li className="flex flex-col sm:flex-row">
          <span className="text-gray-700">{placeData.placeInfo.dressCode}</span>
        </li>
      </ul>
    </motion.div>

    {/* History & Legacy Card - Simplified */}
    <motion.div 
      className="rounded-xl p-4"
      style={{
        background: "linear-gradient(to top, #ede9fe, #ddd6fe)",
        backgroundSize: "100% 200%",
        backgroundPosition: "0% 100%"
      }}
      variants={bottomToTopGradient}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-3">Fun Facts</h2>
      <p className="text-gray-700">{placeData.history}</p>
    </motion.div>
  </motion.div>
</div>
        
        {/* Second Row: Things To Do and Must Eat Sweets */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
  {/* Nearby Homestays */}
  <motion.div 
    className="flex-1 rounded-xl p-4 overflow-hidden"
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
      transition: { duration: 0.8, delay: 0.3 }
    }}
  >
    <h2 className="text-xl font-semibold mb-3">Nearby Homestays</h2>
    <div className="grid grid-cols-1 gap-3">
      {homestays.slice(0, 3).map((homestay:any) => (
        <div key={homestay.id} className="bg-white rounded-lg p-3 shadow-sm">
          <h3 className="font-medium text-lg">{homestay.owner_name}</h3>
          <div className="mt-2 text-sm space-y-1">
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              {homestay.phone_number}
            </p>
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              {homestay.place}, {homestay.city}
            </p>
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1H7zM4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z"></path>
              </svg>
              {homestay.room_category} {homestay.is_ac ? "(AC)" : "(Non-AC)"}
            </p>
            <p className="flex items-center text-amber-600 font-medium">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418l.639-.79-1.473-1.473-2.27.656.719-.719 2.123-.613-1.442-1.442-.65 2.008-.72-.72.647-2.22-1.44 1.44-.619 2.155-.702-.702.646-2.122L2.1 3.746l.638.79c-1.334 1.757-1.153 4.328.404 5.885 1.557 1.556 4.128 1.737 5.885.404l-.56.697 1.473 1.473 2.267-.654-.717.717-2.121.613 1.44 1.44.649-2.006.72.72-.646 2.22 1.44-1.44.617-2.155.702.702-.646 2.123 1.573-1.573-.638-.789c1.336-1.753 1.152-4.327-.402-5.885-1.559-1.557-4.127-1.738-5.883-.404z"></path>
              </svg>
              ₹{homestay.cost_per_night}/night
            </p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
  
  {/* Nearby Attractions */}
  <motion.div 
    className="flex-1 rounded-xl p-4"
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
    <h2 className="text-xl font-semibold mb-3">Nearby Attractions</h2>
    <div className="space-y-3">
    {placeData.thingsToDo.map((item: ThingToDo, index: number) => (
        <div key={index} className="bg-white/70 rounded-lg p-3 flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.distance} • {item.time}</p>
          </div>
        </div>
      ))}
      
      <div className="mt-4">
        <h3 className="font-medium text-lg mb-2">Other Places to Visit</h3>
        <div className="grid grid-cols-2 gap-2">
        {placeData.nearbyAttractions.slice(0, 4).map((attraction: NearbyAttraction, index: number) => (
            <div key={index} className="flex items-center p-2 bg-white/50 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm">{attraction.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
</div>
        
        
      </div>
    </div>
  ) :  (<div>Loading...</div>) ; 
}