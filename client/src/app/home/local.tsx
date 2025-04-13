// components/LocalVendors.jsx
"use client";
import { useState } from 'react';

const LocalVendors = () => {
  const [vendors] = useState([
    {
      "id": 1,
      "name": "Delights Bakery",
      "category": "Local sweet shops",
      "location": "Old Market Street",
      "image": "/bb1.jpg"
    },
    {
      "id": 2,
      "name": "Sweet Delights Bakery",
      "category": "Local sweet shops",
      "location": "Old Market Street",
      "image": "/bakery1.jpg"
    },
    {
      "id": 3,
      "name": "Heritage Handicrafts",
      "category": "Handicrafts",
      "location": "Artisan's Lane",
      "image": "/handi.jpg"
    },
    {
      "id": 4,
      "name": "Spice Trail",
      "category": "Traditional food stalls",
      "location": "Harbor Front",
      "image": "/street.jpg"
    },
    {
      "id": 5,
      "name": "Grandma's Confectionery",
      "category": "Local sweet shops",
      "location": "Village Square",
      "image": "/confec.jpg"
    },
    {
      "id": 6,
      "name": "The Crafty Camel",
      "category": "Handicrafts",
      "location": "Desert Bazaar",
      "image": "/handi1.jpg"
    },
    {
      "id": 7,
      "name": "Chaat Express",
      "category": "Traditional food stalls",
      "location": "Food Gully",
      "image": "/chaat.jpg"
    },
    {
      "id": 8,
      "name": "Pahadi Pickles",
      "category": "Traditional food stalls",
      "location": "Hilltop Market",
      "image": "/pickle.jpg"
    }
  ]
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold mb-4 text-secondary">Support Local Vendors</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vendors.map((vendor) => (
          <div 
            key={vendor.id}
            className="bg-primary rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                <img 
                  src={vendor.image} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-secondary">{vendor.name}</h3>
                <p className="text-xs text-gray-500">{vendor.category}</p>
                <p className="text-sm text-gray-600 mt-1">{vendor.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalVendors;