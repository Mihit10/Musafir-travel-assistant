"use client";

import { useState, useRef, useEffect } from 'react';
import Header from '../home/header';
import Itinerary from '../home/itinerary';
import MapPlaceholder from '../home/map';
import LocalVendors from '../home/local';
import Chatbot from '../home/chatbot';
import FlightOptions from '../home/flights';
import StayOptions from '../home/stay';

// Define a type for each color scheme
interface ColorScheme {
  primary: string;
  secondary: string;
  tertiary: string;
}

// Define supported cities
type CityName = 'Goa' | 'Kerala' | 'Himachal' | 'Uttarakhand' | 'Rajasthan' | 'default';

const Page = () => {
  // Define color schemes for different cities
  const colors: Record<CityName, ColorScheme> = {
    Goa: {
      primary: "#E0F7FA", // Light blue - representing beach/ocean
      secondary: "#00796B", // Teal green - representing tropical vegetation
      tertiary: "#FF8F00", // Orange - representing sunset/vibrant culture
    },
    Kerala: {
      primary: "#E8F5E9", // Light green - representing backwaters/lush vegetation
      secondary: "#33691E", // Dark green - representing tea plantations
      tertiary: "#01579B", // Deep blue - representing coastal waters
    },
    Himachal: {
      primary: "#E3F2FD", // Light sky blue - representing clear mountain skies
      secondary: "#5D4037", // Brown - representing wooden architecture/forest
      tertiary: "#1A237E", // Deep blue - representing mountain depths
    },
    Uttarakhand: {
      primary: "#F3E5F5", // Light purple - representing spiritual essence
      secondary: "#33691E", // Forest green - representing dense forests
      tertiary: "#01579B", // Deep blue - representing rivers and lakes
    },
    Rajasthan: {
      primary: "#FFF8E1", // Desert sand - representing deserts
      secondary: "#BF360C", // Terracotta - representing forts/palaces
      tertiary: "#880E4F", // Deep pink - representing traditional textiles
    },
    default: {
      primary: "#FFF0D1", // Original color from previous components
      secondary: "#664343",
      tertiary: "#4A6FA5",
    },
  };

  // State management
  const [selectedDay, setSelectedDay] = useState(1);
  const [totalDays, setTotalDays] = useState(5); // This could come from your API
  const [selectedCity, setSelectedCity] = useState<CityName>('default');
  
  // Refs for smooth scrolling
  const flightOptionsRef = useRef<HTMLDivElement>(null);
  const stayOptionsRef = useRef<HTMLDivElement>(null);
  
  const travel_itinerary = {
    "itinerary": {
      "day_1": [
        {
          "city": "Goa",
          "place_name": "Mapusa Municipal Market",
          "category": "Shopping",
          "description": "A traditional market in Mapusa, known for its vibrant Friday market where locals sell spices, fruits, jewelry, and more.",
          "timings": "Monday to Saturday: 8:00 AM - 6:00 PM; Closed on Sundays",
          "entry_fee": "Free",
          "location": {
            "lat": 15.591,
            "lng": 73.82
          },
          "best_time_to_visit": "November to March",
          "user_ratings": 4.2,
          "tags": ["Shopping", "Cultural"]
        },
        {
          "city": "Goa",
          "place_name": "Baga Beach",
          "category": "Beach",
          "description": "A popular beach known for its nightlife, water sports, and vibrant atmosphere.",
          "timings": "Open 24 hours",
          "entry_fee": "Free",
          "location": {
            "lat": 15.552,
            "lng": 73.751
          },
          "best_time_to_visit": "November to February",
          "user_ratings": 4.5,
          "tags": ["Beach", "Nightlife"]
        }
      ],
      "day_2": [
        {
          "city": "Goa",
          "place_name": "Fort Aguada",
          "category": "Historical",
          "description": "A well-preserved 17th-century Portuguese fort offering stunning views of the Arabian Sea.",
          "timings": "9:30 AM - 6:00 PM",
          "entry_fee": "Free",
          "location": {
            "lat": 15.540,
            "lng": 73.752
          },
          "best_time_to_visit": "November to March",
          "user_ratings": 4.3,
          "tags": ["Historical", "Scenic"]
        },
        {
          "city": "Goa",
          "place_name": "Dudhsagar Waterfalls",
          "category": "Nature",
          "description": "One of the tallest waterfalls in India, located in the Bhagwan Mahavir Wildlife Sanctuary.",
          "timings": "8:00 AM - 6:00 PM",
          "entry_fee": "Varies based on the tour",
          "location": {
            "lat": 15.283,
            "lng": 74.194
          },
          "best_time_to_visit": "June to January",
          "user_ratings": 4.7,
          "tags": ["Nature", "Adventure"]
        }
      ],
      "day_3": [
        {
          "city": "Goa",
          "place_name": "Anjuna Flea Market",
          "category": "Shopping",
          "description": "A vibrant market held every Wednesday, offering a variety of goods from clothes to handicrafts.",
          "timings": "Wednesday: 10:00 AM - 6:00 PM",
          "entry_fee": "Free",
          "location": {
            "lat": 15.552,
            "lng": 73.751
          },
          "best_time_to_visit": "November to March",
          "user_ratings": 4.4,
          "tags": ["Shopping", "Cultural"]
        },
        {
          "city": "Goa",
          "place_name": "Palolem Beach",
          "category": "Beach",
          "description": "A picturesque beach known for its calm waters and scenic beauty, perfect for relaxation.",
          "timings": "Open 24 hours",
          "entry_fee": "Free",
          "location": {
            "lat": 15.067,
            "lng": 74.071
          },
          "best_time_to_visit": "November to February",
          "user_ratings": 4.6,
          "tags": ["Beach", "Relaxation"]
        }
      ]
    }
  }
  

  const scrollToSection = (sectionId: string) => {
    const section = sectionId === 'flightOptions' ? flightOptionsRef.current : stayOptionsRef.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Apply theme class to body element
  useEffect(() => {
    // First, remove all theme classes
    document.body.classList.remove(
      'theme-goa',
      'theme-kerala', 
      'theme-himachal', 
      'theme-uttarakhand', 
      'theme-rajasthan'
    );
    
    // Then add the selected theme class
    if (selectedCity !== 'default') {
      document.body.classList.add(`theme-${selectedCity.toLowerCase()}`);
    }
  }, [selectedCity]);

  // Simulating city detection
  useEffect(() => {
    // This is a placeholder for actual city detection logic
    // For example, check URL parameters, user settings, or geolocation
    
    // Simulating detection by getting URL search param (if any)
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    
    if (cityParam) {
      const normalizedCity = cityParam.charAt(0).toUpperCase() + cityParam.slice(1).toLowerCase();
      if (normalizedCity in colors) {
        setSelectedCity(normalizedCity as CityName);
      }
    }
    
    // You could also get this from localStorage or an API call
  }, []);
  
  // For components that might need direct access to color values
  const currentColors = colors[selectedCity];

  return (
    <div className="min-h-screen">
      {/* City Selector (for demonstration and testing) */}
      <div style={{ backgroundColor: '#1a1a1a', color: 'white' }} className="p-2">
        <div className="container mx-auto flex flex-wrap gap-2 justify-center">
          <span className="self-center mr-2">Select Destination:</span>
          {(Object.keys(colors) as CityName[]).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              style={{
                backgroundColor: selectedCity === city ? 'white' : '#4a4a4a',
                color: selectedCity === city ? '#1a1a1a' : 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem'
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Main content starts here */}
      <Header 
        totalDays={totalDays} 
        onDayChange={setSelectedDay} 
        scrollToSection={scrollToSection}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Top section: Itinerary and Map */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <div>
            <Itinerary selectedDay={selectedDay} />
          </div>
          <div>
            <MapPlaceholder selectedDay={selectedDay} />
          </div>
        </div>
        
        {/* Bottom section: Local Vendors and Chatbot */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div>
            <LocalVendors />
          </div>
          <div>
            <Chatbot ContextJson={travel_itinerary} city={selectedCity} />
          </div>
        </div>
      </main>
      
      {/* Flight Options Section */}
      <section ref={flightOptionsRef}>
        <FlightOptions />
      </section>
      
      {/* Stay Options Section */}
      <section ref={stayOptionsRef}>
        <StayOptions />
      </section>
      
      <footer className="bg-secondary text-white py-8" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 TravelBuddy. All rights reserved.</p>
          <div className="mt-4 flex justify-center" style={{ gap: '1.5rem' }}>
            <a href="#" style={{ color: 'var(--color-primary)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--color-primary)' }}>Terms of Service</a>
            <a href="#" style={{ color: 'var(--color-primary)' }}>Contact Us</a>
          </div>
          {selectedCity !== 'default' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.5rem 1rem', 
              display: 'inline-block', 
              borderRadius: '0.25rem',
              backgroundColor: 'rgba(0,0,0,0.2)' 
            }}>
              Currently viewing {selectedCity} experience
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Page;