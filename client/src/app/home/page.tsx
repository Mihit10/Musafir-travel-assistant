"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../home/header";
import Itinerary from "../home/itinerary";
import MapPlaceholder from "../home/map";
import LocalVendors from "../home/local";
import Chatbot from "../home/chatbot";
import FlightOptions from "../home/flights";
import StayOptions from "../home/stay";

interface ColorScheme {
  primary: string;
  secondary: string;
  tertiary: string;
}

type CityName =
  | "Goa"
  | "Kerala"
  | "Himachal"
  | "Uttarakhand"
  | "Rajasthan"
  | "default";

const Page = () => {
  const colors: Record<CityName, ColorScheme> = {
    Goa: { primary: "#E0F7FA", secondary: "#00796B", tertiary: "#FF8F00" },
    Kerala: { primary: "#E8F5E9", secondary: "#33691E", tertiary: "#01579B" },
    Himachal: { primary: "#E3F2FD", secondary: "#5D4037", tertiary: "#1A237E" },
    Uttarakhand: {
      primary: "#F3E5F5",
      secondary: "#33691E",
      tertiary: "#01579B",
    },
    Rajasthan: {
      primary: "#FFF8E1",
      secondary: "#BF360C",
      tertiary: "#880E4F",
    },
    default: { primary: "#FFF0D1", secondary: "#664343", tertiary: "#4A6FA5" },
  };

  const [selectedDay, setSelectedDay] = useState(1);
  const [totalDays, setTotalDays] = useState(7); // Fallback to 7 days
  const [selectedCity, setSelectedCity] = useState<CityName>("default");

  const flightOptionsRef = useRef<HTMLDivElement>(null);
  const stayOptionsRef = useRef<HTMLDivElement>(null);

  const [itinerary, setItinerary] = useState<Record<string, any> | null>(null);

  const fetchItinerary = async () => {
    const apiUrl = "http://127.0.0.1:5005/trip";
    const params = {
      state: "Himachal",
      check_in_date: "2025-06-18",
      check_out_date: "2025-06-25",
      preferences: ["nature", "adventure", "heritage"],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      if (data?.data) {
        setItinerary(data.data); // Save all days' data in state
      }
    } catch (error) {
      console.error("Error fetching itinerary:", error);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, []);

  useEffect(() => {
    document.body.classList.remove(
      "theme-goa",
      "theme-kerala",
      "theme-himachal",
      "theme-uttarakhand",
      "theme-rajasthan"
    );
    if (selectedCity !== "default") {
      document.body.classList.add(`theme-${selectedCity.toLowerCase()}`);
    }
  }, [selectedCity]);

  const scrollToSection = (sectionId: string) => {
    const section =
      sectionId === "flightOptions"
        ? flightOptionsRef.current
        : stayOptionsRef.current;
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <div
        style={{ backgroundColor: "#1a1a1a", color: "white" }}
        className="p-2"
      >
        <div className="container mx-auto flex flex-wrap gap-2 justify-center">
          <span className="self-center mr-2">Select Destination:</span>
          {(Object.keys(colors) as CityName[]).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              style={{
                backgroundColor: selectedCity === city ? "white" : "#4a4a4a",
                color: selectedCity === city ? "#1a1a1a" : "white",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.25rem",
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <Header
        totalDays={totalDays}
        onDayChange={setSelectedDay}
        scrollToSection={scrollToSection}
      />

      <main className="container mx-auto px-4 py-8">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "1.5rem",
          }}
        >
          <div>
            {itinerary ? (
              <Itinerary selectedDay={selectedDay} allDaysData={itinerary} />
            ) : (
              <p>Loading itinerary...</p>
            )}
          </div>

          <div style={{ height: "100vh", width: "100%" }}>
            <iframe
              src="/mapbox"
              title="Mapbox Map"
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          <LocalVendors />
          <Chatbot ContextJson={itinerary || {}} city={selectedCity} />
        </div>
      </main>

      <section ref={flightOptionsRef}>
        <FlightOptions />
      </section>

      <section ref={stayOptionsRef}>
        <StayOptions />
      </section>

      <footer
        className="bg-secondary text-white py-8"
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 TravelBuddy. All rights reserved.</p>
          {selectedCity !== "default" && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            >
              Currently viewing {selectedCity} experience
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Page;
