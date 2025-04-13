// components/StayOptions.jsx
"use client";
import { useState } from 'react';

const StayOptions = () => {
  const [accommodations] = useState([
    {
      id: 1,
      name: "The Oberoi Amarvilas, Agra",
      type: "Hotel",
      rating: 4.7,
      price: "₹27,723",
      features: [
        "Free breakfast",
        "Free Wi-Fi",
        "Free parking",
        "Pools",
        "Hot tub",
        "Air conditioning",
        "Fitness centre",
        "Spa",
        "Bar",
        "Restaurant",
        "Room service",
        "Kitchen in some rooms",
        "Airport shuttle",
        "Full-service laundry",
        "Accessible",
        "Business centre",
        "Child-friendly"
    ],
      ecoFriendly: false,
      localHomestay: false,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "The Hosteller Agra",
      type: "Eco Resort",
      rating: 4.6,
      price: "₹795",
      features: ["Sustainable", "Organic food", "Nature trails",  "Pet-friendly",
        "Restaurant",
        "Full-service laundry"],
      ecoFriendly: true,
      localHomestay: false,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Khas Mahal Home Stay",
      type: "Homestay",
      rating: 4.1,
      price: "₹795",
      features: ["Home cooked meals", "Cultural experience", "Local guides"],
      ecoFriendly: false,
      localHomestay: true,
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Joey's Hostel Agra",
      type: "Hotel",
      rating: 4.5,
      price: "₹861",
      features: ["Central location", "Modern design", "Rooftop bar"],
      ecoFriendly: false,
      localHomestay: false,
      image: "/api/placeholder/300/200"
    }
  ]);

  return (
    <div id="stayOptions" className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-secondary">Stay Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accommodations.map((stay) => (
            <div 
              key={stay.id} 
              className={`
                bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105
                ${stay.ecoFriendly ? 'ring-2 ring-green-400' : ''}
                ${stay.localHomestay ? 'ring-2 ring-amber-400' : ''}
              `}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={stay.image} 
                  alt={stay.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-secondary">{stay.name}</h3>
                  <div className="flex items-center bg-tertiary text-white text-sm rounded px-2 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {stay.rating}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">{stay.type}</div>
                <div className="font-bold text-secondary mb-2">{stay.price}</div>
                
                <div className="text-sm text-gray-600">
                  {stay.features.map((feature, index) => (
                    <span key={index} className="inline-block mr-2 mb-2 bg-gray-100 rounded-full px-3 py-1">
                      {feature}
                    </span>
                  ))}
                </div>
                
                {(stay.ecoFriendly || stay.localHomestay) && (
                  <div className="mt-2 text-sm">
                    {stay.ecoFriendly && (
                      <div className="flex items-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Eco-friendly
                      </div>
                    )}
                    {stay.localHomestay && (
                      <div className="flex items-center text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Local Homestay
                      </div>
                    )}
                  </div>
                )}
                
                <button className="w-full mt-4 bg-secondary hover:bg-red-800 text-white py-2 rounded transition-colors duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StayOptions;