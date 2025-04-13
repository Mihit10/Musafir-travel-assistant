"use client";

import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSearchParams } from "next/navigation"; // Use this hook for search params

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ29kZmF0aGVyOTc5IiwiYSI6ImNtNjJieWVqczB3ZGkybHNmc2l0dnE0M20ifQ.ik3djzZe9P9Xxw296r_dCA"; // Replace with your Mapbox token

interface Place {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
}

const MapPage: React.FC = () => {
  const [placesByDay, setPlacesByDay] = useState<Record<string, Place[]>>({});
  const [selectedDay, setSelectedDay] = useState<string>("day_1");
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const searchParams = useSearchParams(); // Using useSearchParams instead of useRouter

  useEffect(() => {
    const dayParam = searchParams.get("day");
    if (dayParam) {
      setSelectedDay(dayParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5005/trip", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: "Himachal",
            check_in_date: "2025-06-18",
            check_out_date: "2025-06-25",
            preferences: ["nature", "adventure", "heritage"],
          }),
        });

        const data = await response.json();
        const days: Record<string, any> = data.data;

        const formattedPlacesByDay: Record<string, Place[]> = {};
        Object.entries(days).forEach(([day, places]) => {
          formattedPlacesByDay[day] = Object.values(places).map(
            (place: any, index: number) => ({
              id: `${day}_place_${index + 1}`,
              name: place.name,
              description: place.description,
              location: {
                lat: place.coordinates.latitude,
                lng: place.coordinates.longitude,
              },
            })
          );
        });

        setPlacesByDay(formattedPlacesByDay);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !placesByDay[selectedDay]) return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [77.2453, 32.3792], // Center the map around Himachal
        zoom: 6,
      });
    }

    const map = mapRef.current;

    // Clear previous markers and routes
    // map.clear();

    const places = placesByDay[selectedDay];
    const coordinates: [number, number][] = places.map((place) => [
      place.location.lng,
      place.location.lat,
    ]);

    const dayColor = "#FF5733";

    // Add markers for each place
    places.forEach((place, index) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `${place.name}: ${place.description}`
      );

      const markerElement = document.createElement("div");
      markerElement.className = "marker";
      markerElement.style.backgroundColor = dayColor;
      markerElement.style.width = "20px";
      markerElement.style.height = "20px";
      markerElement.style.borderRadius = "50%";
      markerElement.style.color = "#fff";
      markerElement.style.display = "flex";
      markerElement.style.alignItems = "center";
      markerElement.style.justifyContent = "center";
      markerElement.style.fontSize = "12px";
      markerElement.textContent = `${index + 1}`;

      new mapboxgl.Marker(markerElement)
        .setLngLat([place.location.lng, place.location.lat])
        .setPopup(popup)
        .addTo(map);
    });

    // Fetch and draw the route
    const fetchRoute = async (coordinates: [number, number][]) => {
      if (coordinates.length < 2) return;

      const query = coordinates.map((coord) => coord.join(",")).join(";");
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${query}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      return data.routes[0]?.geometry.coordinates;
    };

    if (coordinates.length > 1) {
      fetchRoute(coordinates).then((routeCoordinates) => {
        if (routeCoordinates) {
          map.addSource(`route-${selectedDay}`, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: routeCoordinates,
              },
            },
          });

          map.addLayer({
            id: `route-${selectedDay}`,
            type: "line",
            source: `route-${selectedDay}`,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": dayColor,
              "line-width": 4,
            },
          });
        }
      });
    }
  }, [placesByDay, selectedDay]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">
        Dynamic Map for Day {selectedDay.split("_")[1]}
      </h1>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "600px" }}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default MapPage;
