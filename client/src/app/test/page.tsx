"use client";

import { useState } from 'react';

// Define a type for each color scheme
interface ColorScheme {
  primary: string;
  secondary: string;
  tertiary: string;
}

// Define a type for the colors object
interface Colors {
  [key: string]: ColorScheme; // The key can be any string (city name, etc.)
}

const Home = () => {
  // Define your color schemes with the appropriate types
  const colors: Colors = {
    default: {
      primary: "#1E40AF", // Blue
      secondary: "#F59E0B", // Amber
      tertiary: "#10B981", // Green
    },
    city1: {
      primary: "#D32F2F", // Red
      secondary: "#1976D2", // Blue
      tertiary: "#388E3C", // Green
    },
    city2: {
      primary: "#0288D1", // Blue
      secondary: "#FF9800", // Orange
      tertiary: "#8BC34A", // Light Green
    }
  };

  // Simulate the city selection. You can change this dynamically.
  const [city, setCity] = useState<string>('city1'); // Example: city1, city2, default

  // Get the color scheme for the selected city
  const currentColors = colors[city] || colors.default;

  return (
    <div className="min-h-screen bg-white">
      <div
        style={{ color: currentColors.primary, backgroundColor: 'white' }}
        className="p-4"
      >
        <h1 className="text-lg font-bold">Test Colour for {city}</h1>
        <p style={{ color: currentColors.secondary }}>
          This is using the primary and secondary colors of {city}
        </p>
        <p style={{ color: currentColors.tertiary }}>Tertiary color here</p>

        {/* Optional buttons to change the city */}
        <button onClick={() => setCity('city1')}>City 1</button>
        <button onClick={() => setCity('city2')}>City 2</button>
        <button onClick={() => setCity('default')}>Default</button>
      </div>
    </div>
  );
};

export default Home;
