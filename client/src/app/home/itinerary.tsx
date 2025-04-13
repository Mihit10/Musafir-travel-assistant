"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ItineraryProps = {
  selectedDay: number;
  allDaysData: Record<string, any>;
  onItineraryUpdate: (updatedItinerary: Record<string, any>) => void;
};

type Place = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  travel_time_to_next: number;
};

const Itinerary: React.FC<ItineraryProps> = ({
  selectedDay,
  allDaysData,
  onItineraryUpdate,
}) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [remainingPlaces, setRemainingPlaces] = useState<any[]>([]);

  useEffect(() => {
    if (allDaysData) {
      const dayKey = `day_${selectedDay}`;
      const dayData = allDaysData[dayKey];

      if (dayData) {
        const extractedPlaces = Object.keys(dayData).map((key) => ({
          id: key,
          ...dayData[key],
        }));
        setPlaces(extractedPlaces);
      } else {
        setPlaces([]);
      }
    }
  }, [selectedDay, allDaysData]);

  const fetchRemainingPlaces = async () => {
    const apiUrl = "http://127.0.0.1:5005/remaining-places";

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setRemainingPlaces(data.data);
      } else {
        console.error("Failed to fetch remaining places:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching remaining places:", error);
    }
  };

  const handleAddPlace = async (place: any) => {
    const apiUrl = "http://127.0.0.1:5005/data";
    const params = {
      day: `day_${selectedDay}`,
      place: {
        coordinates: {
          latitude: place.location.lat,
          longitude: place.location.lng,
        },
        name: place.place_name,
        description: place.description,
        travel_time_to_next: 45, // Example value
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const data = await response.json();
        onItineraryUpdate(data.data); // Refresh itinerary with updated data
      } else {
        console.error("Failed to add place:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  const handleDelete = async (place: Place) => {
    const apiUrl = "http://127.0.0.1:5005/data";
    const params = { name: place.name };

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const data = await response.json();
        onItineraryUpdate(data.data);
      } else {
        console.error("Failed to delete place:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold mb-4 text-secondary">
        Day {selectedDay} Itinerary
      </h2>

      <div className="space-y-4">
        {places.map((place) => (
          <div
            key={place.id}
            className="bg-primary rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-all duration-300 transform hover:scale-102 hover:bg-yellow-100"
          >
            <Link href={`/place/${place.id}`}>
              <div>
                <h3 className="font-semibold text-secondary text-lg">
                  {place.name}
                </h3>
                <p className="text-gray-600">{place.description}</p>
              </div>
            </Link>
            <button
              onClick={() => handleDelete(place)}
              className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={fetchRemainingPlaces}
          className="bg-secondary hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full"
        >
          Explore More
        </button>
        <button className="bg-secondary hover:bg-red-800 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full">
          Hire a Local Guide
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {remainingPlaces.map((place) => (
          <div
            key={place.place_name}
            className="bg-gray-100 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{place.place_name}</h3>
              <p className="text-gray-600">{place.description}</p>
            </div>
            <button
              onClick={() => handleAddPlace(place)}
              className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-700"
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
