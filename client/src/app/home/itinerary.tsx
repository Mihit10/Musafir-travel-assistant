// components/Itinerary.jsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

type ItineraryProps = {
    selectedDay: number;
  };
  
  type Place = {
    id: number;
    name: string;
    description: string;
    dayId: number;
  };
  
  const Itinerary: React.FC<ItineraryProps> = ({ selectedDay }) => {
    const [places, setPlaces] = useState<Place[]>([]);
  
    useEffect(() => {
      const placesForDay: Place[] = [
        { id: 1, name: "Morning Coffee at Sunrise Cafe", description: "Start your day with local blends", dayId: selectedDay },
        { id: 2, name: "Historical City Tour", description: "Explore ancient monuments with local guides", dayId: selectedDay },
        { id: 3, name: "Lunch at River View", description: "Authentic cuisine with spectacular views", dayId: selectedDay },
        { id: 4, name: "Sunset Beach Walk", description: "Relax and unwind by the shore", dayId: selectedDay },
        { id: 5, name: "Dinner at Local Market", description: "Experience street food and local culture", dayId: selectedDay }
      ];
  
      setPlaces(placesForDay);
    }, [selectedDay]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold mb-4 text-secondary">Day {selectedDay} Itinerary</h2>
      
      <div className="space-y-4">
        {places.map((place) => (
          <Link href={`/place/${place.id}`} key={place.id}>
            <div className="bg-primary rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-300 transform hover:scale-102 hover:bg-yellow-100">
              <h3 className="font-semibold text-secondary text-lg">{place.name}</h3>
              <p className="text-gray-600">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <button className="mt-6 bg-secondary hover:bg-red-800 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full">
        Hire a Local Guide
      </button>
    </div>
  );
};

export default Itinerary;