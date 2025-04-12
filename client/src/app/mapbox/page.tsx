"use client";

import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ29kZmF0aGVyOTc5IiwiYSI6ImNtNjJieWVqczB3ZGkybHNmc2l0dnE0M20ifQ.ik3djzZe9P9Xxw296r_dCA"; // Replace with your Mapbox token

const places = [
  {
    name: "Chapora Fort",
    description:
      "A fort offering panoramic views of the Chapora River and Vagator Beach, popularized by the movie 'Dil Chahta Hai'.",
    entry_fee: "Free",
    timings: "8:00 AM - 5:00 PM",
    location: { lat: 15.604782152280047, lng: 73.73696309568906 },
    tags: ["Historic", "Nature"],
  },
  {
    name: "Baga Beach",
    description:
      "A lively beach known for its nightlife, water sports, and beach shacks offering delicious seafood.",
    entry_fee: "Free",
    timings: "Open all day",
    location: { lat: 15.5578, lng: 73.7513 },
    tags: ["Beach", "Adventure", "Shopping"],
  },
  {
    name: "Calangute Beach",
    description:
      "Known as the 'Queen of Beaches,' this popular beach offers vibrant shacks, water sports, and stunning sunset views.",
    entry_fee: "Free",
    timings: "Open all day",
    location: { lat: 15.5439, lng: 73.7551 },
    tags: ["Beach", "Adventure"],
  },
  {
    name: "Anjuna Beach",
    description:
      "Famous for its trance parties and flea market, Anjuna Beach is a hub for hippie culture and nightlife.",
    entry_fee: "Free",
    timings: "Open all day",
    location: { lat: 15.5753, lng: 73.7438 },
    tags: ["Beach", "Shopping", "Adventure"],
  },
];

const MapPage = () => {
  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [73.7513, 15.5578], // Center of the map
      zoom: 12,
    });

    // Define colors for the markers
    const markerColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"];

    // Add numbered markers for each place with custom colors
    places.forEach((place, index) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `${place.name}: ${place.description}`
      );

      const markerElement = document.createElement("div");
      markerElement.className = "marker";
      markerElement.style.backgroundColor = markerColors[index];
      markerElement.style.width = "30px";
      markerElement.style.height = "30px";
      markerElement.style.borderRadius = "40%";
      markerElement.style.color = "#ffffff";
      markerElement.style.display = "flex";
      markerElement.style.alignItems = "center";
      markerElement.style.justifyContent = "center";
      markerElement.style.fontSize = "16px";
      markerElement.style.fontWeight = "bold";
      markerElement.textContent = (index + 1).toString();

      new mapboxgl.Marker(markerElement)
        .setLngLat([place.location.lng, place.location.lat])
        .setPopup(popup)
        .addTo(map);
    });

    // Draw the route (1 → 2 → 3 → 4 → 1)
    const fetchRoute = async () => {
      const coordinates = places.map((place) => [
        place.location.lng,
        place.location.lat,
      ]);
      coordinates.push(coordinates[0]); // Close the loop

      const waypoints = coordinates.map((coord) => coord.join(",")).join(";");
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length) {
        const route = data.routes[0].geometry;

        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: route,
            properties: {},
          },
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#FF5733",
            "line-width": 5,
          },
        });
      }
    };

    map.on("load", fetchRoute);

    return () => map.remove();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">
        Map with Place Markers and Route
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
