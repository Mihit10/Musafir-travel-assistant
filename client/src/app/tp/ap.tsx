"use client";
import { useState } from 'react';

// Define the Homestay type
interface Homestay {
  id: number;
  owner_name: string;
  phone_number: string;
  email: string;
  ratings: string;
  city: string;
  place: string;
  cost_per_night: string;
  room_category: string;
  is_ac: boolean;
  amenities: string[];
  rooms_available: number;
}

// Define the homestaysData type
interface HomestaysData {
  [key: string]: Homestay[]; // Maps state names to an array of Homestays
}

// Define the props for HomestayModal
interface HomestayModalProps {
  homestay: Homestay;
  onClose: () => void;
}

// Mock data for homestays in different states
const homestaysData: HomestaysData = {
  "Goa": [
    {
      "id": 1,
      "owner_name": "Priya Naik",
      "phone_number": "9876543210",
      "email": "priya@goahomes.com",
      "ratings": "4.7",
      "city": "Anjuna",
      "place": "Beachside Villa",
      "cost_per_night": "3500.00",
      "room_category": "Premium",
      "is_ac": true,
      "amenities": ["Wi-Fi", "Breakfast", "Pool", "Organic Garden", "Bicycle Rental"],
      "rooms_available": 3
    },
    {
      "id": 2,
      "owner_name": "Miguel Fernandes",
      "phone_number": "9638527410",
      "email": "miguel@goastays.com",
      "ratings": "4.5",
      "city": "Palolem",
      "place": "Coconut Grove Cottage",
      "cost_per_night": "2800.00",
      "room_category": "Deluxe",
      "is_ac": false,
      "amenities": ["Wi-Fi", "Breakfast", "Hammock", "Beach Access", "Solar Power"],
      "rooms_available": 2
    },
    {
      "id": 3,
      "owner_name": "Rohan Shetty",
      "phone_number": "9876123450",
      "email": "rohan@ecogoastay.com",
      "ratings": "4.8",
      "city": "Mandrem",
      "place": "Palm Paradise Hut",
      "cost_per_night": "3200.00",
      "room_category": "Luxury",
      "is_ac": true,
      "amenities": ["Wi-Fi", "Homemade Meals", "Yoga Deck", "Rainwater Harvesting"],
      "rooms_available": 4
    }
  ],
  "Kerala": [
    {
      "id": 4,
      "owner_name": "Anita Thomas",
      "phone_number": "8765432109",
      "email": "anita@keralastays.com",
      "ratings": "4.9",
      "city": "Alleppey",
      "place": "Backwater Homestay",
      "cost_per_night": "4000.00",
      "room_category": "Premium",
      "is_ac": true,
      "amenities": ["Wi-Fi", "Traditional Meals", "Houseboat Tour", "Ayurvedic Massage"],
      "rooms_available": 5
    },
    {
      "id": 5,
      "owner_name": "Joseph Kurien",
      "phone_number": "9567123480",
      "email": "joseph@godscountry.com",
      "ratings": "4.6",
      "city": "Munnar",
      "place": "Tea Plantation View",
      "cost_per_night": "3600.00",
      "room_category": "Deluxe",
      "is_ac": false,
      "amenities": ["Wi-Fi", "Organic Breakfast", "Trekking Guide", "Spice Garden Tour"],
      "rooms_available": 3
    }
  ],
  // ... other states omitted for brevity
};

// Main Component
export default function HomestaysPage() {
  const [selectedState, setSelectedState] = useState<string>("Goa");
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const openModal = (homestay: Homestay) => {
    setSelectedHomestay(homestay);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Eco-Friendly Homestays</h1>
        
        {/* State Dropdown */}
        <div className="mb-8">
          <label htmlFor="stateSelect" className="block text-green-700 mb-2 font-medium">
            Select State
          </label>
          <select
            id="stateSelect"
            value={selectedState}
            onChange={handleStateChange}
            className="w-full md:w-64 px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            {Object.keys(homestaysData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        
        {/* Homestay Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homestaysData[selectedState].map((homestay) => (
            <HomestayCard 
              key={homestay.id} 
              homestay={homestay} 
              onClick={() => openModal(homestay)} 
            />
          ))}
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && selectedHomestay && (
        <HomestayModal homestay={selectedHomestay} onClose={closeModal} />
      )}
    </div>
  );
}

// Homestay Card Component
function HomestayCard({ homestay, onClick }: { homestay: Homestay; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-green-100 to-amber-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-green-200"
    >
      <div className="h-40 bg-green-300 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">
            {homestay.owner_name.charAt(0)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-green-800">{homestay.owner_name}'s Place</h3>
        <p className="text-amber-800">{homestay.city}, {homestay.place}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="font-medium text-green-700">₹{homestay.cost_per_night}/night</p>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-gray-700">{homestay.ratings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Component
function HomestayModal({ homestay, onClose }: HomestayModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl overflow-hidden max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 p-4 relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:text-green-100"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold text-white">{homestay.place}</h2>
          <p className="text-green-100">{homestay.city}</p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-medium text-green-800 mb-2">Host Details</h3>
              <p><span className="text-gray-600">Owner:</span> {homestay.owner_name}</p>
              <p><span className="text-gray-600">Phone:</span> {homestay.phone_number}</p>
              <p><span className="text-gray-600">Email:</span> {homestay.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-green-800 mb-2">Room Details</h3>
              <p><span className="text-gray-600">Category:</span> {homestay.room_category}</p>
              <p><span className="text-gray-600">AC:</span> {homestay.is_ac ? 'Yes' : 'No'}</p>
              <p><span className="text-gray-600">Available Rooms:</span> {homestay.rooms_available}</p>
              <p><span className="text-gray-600">Cost:</span> ₹{homestay.cost_per_night} per night</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-green-800 mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {homestay.amenities.map((amenity, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <a 
              href={`tel:${homestay.phone_number}`}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <span className="mr-2">📞</span> Call Host
            </a>
            <a 
              href={`mailto:${homestay.email}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <span className="mr-2">✉️</span> Email
            </a>
            <a 
              href={`https://wa.me/${homestay.phone_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <span className="mr-2">💬</span> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}