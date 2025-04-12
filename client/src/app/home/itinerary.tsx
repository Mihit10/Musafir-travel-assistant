"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ItineraryProps = {
  selectedDay: number;
  allDaysData: Record<string, any>; // Pass all days' data as a prop
};

type Place = {
  id: string;
  name: string;
  description: string;
};

const Itinerary: React.FC<ItineraryProps> = ({ selectedDay, allDaysData }) => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (allDaysData) {
      const dayKey = `day_${selectedDay}`;
      const dayData = allDaysData[dayKey];

      if (dayData) {
        const extractedPlaces = Object.keys(dayData).map((key, index) => ({
          id: key,
          name: dayData[key].name,
          description: dayData[key].description,
        }));
        setPlaces(extractedPlaces);
      } else {
        setPlaces([]); // No data for the selected day
      }
    }
  }, [selectedDay, allDaysData]);

  if (!allDaysData) {
    return <p>Loading itinerary...</p>;
  }

  if (places.length === 0) {
    return <p>No itinerary available for Day {selectedDay}.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold mb-4 text-secondary">
        Day {selectedDay} Itinerary
      </h2>

      <div className="space-y-4">
        {places.map((place) => (
          <Link href={`/place/${place.id}`} key={place.id}>
            <div className="bg-primary rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-300 transform hover:scale-102 hover:bg-yellow-100">
              <h3 className="font-semibold text-secondary text-lg">
                {place.name}
              </h3>
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
