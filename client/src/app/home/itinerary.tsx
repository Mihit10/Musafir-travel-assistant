"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

type ItineraryProps = {
  selectedDay: number;
  allDaysData: Record<string, any>; // Pass all days' data as a prop
};

type Place = {
  id: string;
  name: string;
  description: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  travel_time_to_next?: number;
};

const Itinerary: React.FC<ItineraryProps> = ({ selectedDay, allDaysData }) => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (allDaysData) {
      const dayKey = `day_${selectedDay}`;
      const dayData = allDaysData[dayKey];

      if (dayData) {
        const extractedPlaces = Object.keys(dayData).map((key) => ({
          id: key,
          name: dayData[key].name,
          description: dayData[key].description,
          coordinates: dayData[key].coordinates,
          travel_time_to_next: dayData[key].travel_time_to_next,
        }));
        setPlaces(extractedPlaces);
      } else {
        setPlaces([]); // No data for the selected day
      }
    }
  }, [selectedDay, allDaysData]);

  // Function to format travel time
  const formatTravelTime = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} hour${hours > 1 ? 's' : ''}${mins > 0 ? ` ${mins} min${mins > 1 ? 's' : ''}` : ''}`;
    } else {
      return `${minutes} min${minutes > 1 ? 's' : ''}`;
    }
  };

  if (!allDaysData) {
    return <p>Loading itinerary...</p>;
  }

  if (places.length === 0) {
    return <p>No itinerary available for Day {selectedDay}.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-secondary flex items-center">
          <span className="bg-secondary rounded-full w-8 h-8 flex items-center justify-center mr-3 text-white border-2 border-secondary">
            {selectedDay}
          </span>
          Day {selectedDay} Itinerary
        </h2>

        <div className="space-y-2">
          {places.map((place, index) => (
            <div key={place.id} className="relative">
             {/* Timeline connector - more visible */}
             {index < places.length - 1 && (
                <div className="absolute left-3 top-9 w-1 bg-gradient-to-b from-primary to-secondary h-28 opacity-80"></div>
              )}
              
              <div className="flex items-start mb-2">
                {/* Smaller bullet point with reduced gradient overlay */}
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-primary flex items-center justify-center shadow-md">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary/90 to-primary/90"></div>
                    </div>
                  </div>
                  <div className="absolute -top-0.5 -left-0.5 w-8 h-8 rounded-full bg-primary opacity-20 animate-pulse"></div>
                </div>
                
                {/* Place card */}
                <Link href={`/place/${place.id}`} className="w-full ml-4">
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary">
                    <h3 className="font-semibold text-secondary text-lg">
                      {place.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{place.description}</p>
                    
                    {/* Travel time indicator with conversational format */}
                    {/* {place.travel_time_to_next && place.travel_time_to_next > 0 && (
                        <div className="flex items-center mt-3 text-xs text-gray-500">
                          <Clock size={14} className="text-secondary mr-1" />
                          <span>Travel to next: {formatTravelTime(place.travel_time_to_next)}</span>
                        </div>
                    )} */}
                    {/* Travel time indicator with conversational format */}
                  {index !== places.length - 1 && place.travel_time_to_next !== undefined && (
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                      <Clock size={14} className="text-secondary mr-1" />
                      <span>Travel to next: {formatTravelTime(place.travel_time_to_next)}</span>
                    </div>
                  )}
  
                      {/* Uncomment if you want to show coordinates */}
                    
                    {/* Location indicator */}
                    {/* {place.coordinates && (
                      <div className="text-xs text-gray-400 mt-1">
                        {place.coordinates.latitude.toFixed(2)}, {place.coordinates.longitude.toFixed(2)}
                      </div>
                    )} */}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
  href="/guides"
  className="mt-6 bg-secondary hover:bg-red-800 text-white py-2 px-4 rounded-lg transition-all duration-300 shadow-md w-full text-center block"
>
  Hire a Local Guide
</a>  
    </div>
  );
};

export default Itinerary;