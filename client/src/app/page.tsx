"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  ChevronDown,
  Calendar as CalendarIcon,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";

// Website name constant for easy updates
const WEBSITE_NAME = "Raste Pe";

// Types
type City = "Goa" | "Kerala" | "Himachal" | "Uttarakhand" | "Rajasthan";
type Preference =
  | "Historic"
  | "Adventure"
  | "Nature"
  | "Religious"
  | "Beach"
  | "Mountain"
  | "Shopping";

interface CityInfo {
  name: City;
  image: string;
  description: string;
}

interface PreferenceInfo {
  name: Preference;
  icon: React.ReactNode;
  description: string;
}

// City data
const cities: CityInfo[] = [
  {
    name: "Goa",
    image:
      "https://t4.ftcdn.net/jpg/01/44/63/23/360_F_144632345_JcJQ3Ebvh6vH779CBayNvfIaFzpxqDvz.jpg",
    description:
      "Sun-soaked beaches, vibrant markets, and rich Portuguese heritage.",
  },
  {
    name: "Kerala",
    image:
      "https://thumbs.dreamstime.com/b/icon-onam-harvest-onam-242667715.jpg",
    description:
      "Serene backwaters, lush tea plantations, and ancient Ayurvedic traditions.",
  },
  {
    name: "Himachal",
    image:
      "https://www.beingpahadia.com/wp-content/uploads/2022/07/imageedit_1_4413673411-300x300.png",
    description:
      "Majestic mountains, adventure trails, and charming hill stations.",
  },
  {
    name: "Uttarakhand",
    image:
      "https://pbs.twimg.com/profile_images/1321298153161871360/exotbW-u_400x400.jpg",
    description:
      "Sacred rivers, spiritual temples, and stunning Himalayan vistas.",
  },
  {
    name: "Rajasthan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCEafZmwhl0DxdskcVwNyqWMF_NBxuVZEEOQ&s",
    description:
      "Royal palaces, golden deserts, and vibrant cultural heritage.",
  },
];

// Preference data
const preferences: PreferenceInfo[] = [
  {
    name: "Historic",
    icon: <span className="text-2xl">🏛️</span>,
    description: "Explore ancient monuments and rich heritage sites",
  },
  {
    name: "Adventure",
    icon: <span className="text-2xl">🧗</span>,
    description: "Thrilling activities and adrenaline-pumping experiences",
  },
  {
    name: "Nature",
    icon: <span className="text-2xl">🌿</span>,
    description: "Immerse in breathtaking natural landscapes",
  },
  {
    name: "Religious",
    icon: <span className="text-2xl">🕍</span>,
    description: "Visit sacred sites and spiritual destinations",
  },
  {
    name: "Beach",
    icon: <span className="text-2xl">🏖️</span>,
    description: "Relax on pristine sandy beaches",
  },
  {
    name: "Mountain",
    icon: <span className="text-2xl">⛰️</span>,
    description: "Discover majestic peaks and mountain trails",
  },
  {
    name: "Shopping",
    icon: <span className="text-2xl">🛍️</span>,
    description: "Local markets and unique artisanal crafts",
  },
];

// Testimonial data
const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    quote:
      "Raste Pe connected us with a local guide in Himachal who took us to hidden waterfalls no tourist usually sees!",
    image: "https://cdn-icons-png.flaticon.com/128/4202/4202832.png",
  },
  {
    name: "Rahul Mehra",
    location: "Mumbai",
    quote:
      "The homestay Raste Pe recommended in Kerala gave us an authentic experience and the family taught us traditional cooking.",
    image: "https://cdn-icons-png.flaticon.com/128/4202/4202843.png",
  },
  {
    name: "Ananya Patel",
    location: "Bangalore",
    quote:
      "Thanks to Raste Pe, we supported local artisans in Rajasthan while getting unique souvenirs at fair prices.",
    image: "https://cdn-icons-png.flaticon.com/512/4202/4202850.png ",
  },
];

// Benefits data
const benefits = [
  {
    title: "Community-Powered Travel",
    description:
      "Direct connections with local guides, artisans, and homestay owners",
    icon: <span className="text-3xl">👨‍👩‍👧‍👦</span>,
  },
  {
    title: "Sustainable Tourism",
    description: "Eco-friendly options and off-the-beaten-path destinations",
    icon: <span className="text-3xl">🌱</span>,
  },
  {
    title: "Smart Itineraries",
    description: "AI-generated plans adapted to weather and local conditions",
    icon: <span className="text-3xl">🧠</span>,
  },
  {
    title: "Fair Income Distribution",
    description: "Ensuring equitable compensation for local service providers",
    icon: <span className="text-3xl">💰</span>,
  },
];

export default function Home() {
  // State management
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<Preference[]>(
    []
  );
  const [isScrolled, setIsScrolled] = useState(false);


  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle preference selection
  const togglePreference = (preference: Preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((p) => p !== preference)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const generateItinerary = () => {
    if (
      !startDate ||
      !endDate ||
      !selectedCity ||
      selectedPreferences.length === 0
    )
      return;

    // Construct query parameters
    const queryParams = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      city: selectedCity,
      preferences: selectedPreferences.join(","),
    };


  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full bg-yellow-200 opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-emerald-200 opacity-40"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-blue-200 opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Path/Road Element */}
          <svg
            className="absolute bottom-0 w-full h-24 text-emerald-100"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-current"
              opacity=".25"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-current"
              opacity=".5"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-current"
              opacity=".75"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 mb-4">
              <span className="text-amber-500">Discover</span> the Road Less
              Traveled
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              AI-powered travel itineraries that connect you with local
              communities for authentic experiences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Visual Side Panel */}
                  <div className="hidden lg:block lg:col-span-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col justify-center items-center p-8 text-white">
                      <div className="mb-6 text-6xl">🧭</div>
                      <h3 className="text-2xl font-bold mb-3">
                        Plan Your Journey
                      </h3>
                      <p className="text-sm opacity-90 text-center">
                        Sustainable, community-connected travel experiences that
                        benefit both you and local destinations.
                      </p>

                      <div className="absolute bottom-0 left-0 w-full">
                        <div className="flex justify-between p-4">
                          <div className="text-3xl">🏕️</div>
                          <div className="text-3xl">🚵</div>
                          <div className="text-3xl">🧶</div>
                          <div className="text-3xl">🍲</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-3 p-8">
                    <h2 className="text-2xl font-semibold text-center text-emerald-700 mb-6">
                      Create Your Perfect Itinerary
                    </h2>

                    <div className="space-y-6">
                      {/* Date Range Selection */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Start Date */}
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-emerald-600" />
                                {startDate
                                  ? format(startDate, "PPP")
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                className="rounded-md border-0"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* End Date */}
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-emerald-600" />
                                {endDate
                                  ? format(endDate, "PPP")
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                                className="rounded-md border-0"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      {/* Destination */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Destination
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                            >
                              <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4 text-emerald-600" />
                                {selectedCity || "Select destination"}
                              </div>
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-0 max-h-80 overflow-auto">
                            <div className="grid grid-cols-1 gap-1 p-1">
                              {cities.map((city) => (
                                <div
                                  key={city.name}
                                  className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                                    selectedCity === city.name
                                      ? "bg-emerald-100"
                                      : "hover:bg-gray-100"
                                  }`}
                                  onClick={() => setSelectedCity(city.name)}
                                >
                                  <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                                    <img
                                      src={city.image}
                                      alt={city.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{city.name}</p>
                                    <p className="text-xs text-gray-500">
                                      {city.description}
                                    </p>
                                  </div>
                                  {selectedCity === city.name && (
                                    <Check className="h-4 w-4 text-emerald-600" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Preferences */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Travel Style
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {preferences.map((preference) => (
                            <Badge
                              key={preference.name}
                              variant={
                                selectedPreferences.includes(preference.name)
                                  ? "default"
                                  : "outline"
                              }
                              className={`cursor-pointer text-sm py-1.5 px-3 ${
                                selectedPreferences.includes(preference.name)
                                  ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-200"
                                  : "hover:bg-gray-100"
                              }`}
                              onClick={() => togglePreference(preference.name)}
                            >
                              <span className="mr-2">{preference.icon}</span>{" "}
                              {preference.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Generate Button */}
                      <Button
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-6 shadow-lg transition-all hover:shadow-xl border-0"
                        onClick={() => {
                          // Construct query parameters
                          const queryParams = new URLSearchParams({
                            start_date: startDate
                              ? format(startDate, "yyyy-MM-dd")
                              : "",
                            end_date: endDate
                              ? format(endDate, "yyyy-MM-dd")
                              : "",
                            destination: selectedCity || "",
                            preferences: selectedPreferences.join(","),
                          }).toString();

                          // Redirect to /home with the query parameters
                          window.location.href = `/home?${queryParams}`;
                        }}
                        disabled={
                          !startDate ||
                          !endDate ||
                          !selectedCity ||
                          selectedPreferences.length === 0
                        }
                      >
                        Generate My Itinerary
                      </Button>

                      {/* Selected Option Tags */}
                      {(startDate ||
                        endDate ||
                        selectedCity ||
                        selectedPreferences.length > 0) && (
                        <div className="pt-2">
                          <p className="text-xs text-gray-500 mb-2">
                            Your selections:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {startDate && (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                From: {format(startDate, "MMM d, yyyy")}
                              </span>
                            )}
                            {endDate && (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                To: {format(endDate, "MMM d, yyyy")}
                              </span>
                            )}
                            {selectedCity && (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                <MapPin className="mr-1 h-3 w-3" />{" "}
                                {selectedCity}
                              </span>
                            )}
                            {selectedPreferences.map((pref) => (
                              <span
                                key={pref}
                                className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800"
                              >
                                {pref}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500 mb-4">
              Trusted by eco-conscious travelers and local communities
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              About {WEBSITE_NAME}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're on a mission to transform travel into a force for good by
              connecting travelers with local communities while promoting
              sustainable tourism.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-semibold text-emerald-700 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 mb-6">
                At {WEBSITE_NAME}, we believe travel should benefit everyone
                involved. Our AI-powered platform creates personalized
                itineraries that connect you with local service providers,
                ensuring authentic experiences while promoting equitable
                economic opportunities.
              </p>
              <p className="text-gray-700">
                We thoughtfully integrate real-time data, weather forecasts, and
                sustainability metrics to recommend eco-friendly options and
                lesser-known destinations, reducing overtourism and preserving
                cultural heritage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://growbilliontrees.com/cdn/shop/files/iStock-472102653-beach-cleaning.jpg?v=1734761735&width=1500"
                  alt="Local community experiences"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe6RNNZsAWrNkn7kqrOX01hfjetYSMprdpFA&s"
                  alt="Local artisan"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzUhR7mVu7KmYeV7v-E3IzzFJAH2AgLCfGIA&s"
                  alt="Sustainable tourism"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Benefits Section */}
          <div className="mt-24">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl font-semibold text-emerald-700 mb-10 text-center"
            >
              How {WEBSITE_NAME} Makes a Difference
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-emerald-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-sm">
                      {benefit.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-emerald-700 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Traveler Stories
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from travelers who have experienced the difference of
              community-connected travel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-700">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Travel Differently?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Create itineraries that connect you with local communities and
              promote sustainable tourism.
            </p>
            <Button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 text-lg shadow-xl">
              Start Planning Now
            </Button>
          </motion.div>
        </div>
      </section>

      
    </main>
  );
}
