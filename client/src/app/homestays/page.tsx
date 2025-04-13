"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, Home, Check, X, Wifi, Coffee, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

// Define TypeScript interface for Homestay
interface Homestay {
  id: string;
  owner_name: string;
  phone_number: string;
  ratings: number;
  city: string;
  place: string;
  cost_per_night: number;
  room_category: string;
  is_ac: boolean;
  amenities: string;
  rooms_available: number;
}

const API_URL = "https://rhino-frank-tightly.ngrok-free.app/homestays";

const HomestaysPage = () => {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [locationFilter, setLocationFilter] = useState<string>("all");

  // Fetch homestays on component mount
  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await axios.get<Homestay[]>(API_URL, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        setHomestays(response.data);
      } catch (error) {
        toast.error("Failed to load homestays");
        console.error("Error fetching homestays:", error);
      }
    };

    fetchHomestays();
  }, []);

  // Handle deleting
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Homestay deleted successfully!");
      setHomestays(homestays.filter(homestay => homestay.id !== id));
    } catch (error) {
      toast.error("Failed to delete homestay");
      console.error("Error deleting homestay:", error);
    }
  };

  // Render star ratings
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-60" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return stars;
  };

  // Get a background image URL based on location/place
  const getLocationImage = (place: string): string => {
    // For demonstration, return a placeholder image
    // In a real app, you might have actual location images
    return `/api/placeholder/400/200`;
  };

  // Get color based on room category
  const getRoomCategoryColor = (category: string): string => {
    const categoryColors: { [key: string]: string } = {
      "Standard": "#64748b",
      "Deluxe": "#0ea5e9",
      "Suite": "#8b5cf6",
      "Premium": "#f59e0b",
      "Family": "#10b981",
    };
  
    return categoryColors[category] || "#64748b";
  };

  // Extract first two amenities as icons
  const getAmenityIcons = (amenitiesString: string) => {
    const amenitiesArray = amenitiesString.split(',').map(item => item.trim());
    const icons = [];
    
    for (const amenity of amenitiesArray.slice(0, 2)) {
      if (amenity.toLowerCase().includes('wifi')) {
        icons.push(<Wifi key="wifi" className="w-4 h-4" />);
      } else if (amenity.toLowerCase().includes('pool') || amenity.toLowerCase().includes('swimming')) {
        icons.push(<Waves key="pool" className="w-4 h-4" />);
      } else if (amenity.toLowerCase().includes('breakfast') || amenity.toLowerCase().includes('coffee')) {
        icons.push(<Coffee key="coffee" className="w-4 h-4" />);
      } else {
        icons.push(<Home key={amenity} className="w-4 h-4" />);
      }
    }
    
    return icons;
  };

  const images = ["/homestay1.jpg","/homestay2.jpg"]
  // Filter homestays by location
  const filteredHomestays = locationFilter === "all" 
    ? homestays 
    : homestays.filter(homestay => homestay.place === locationFilter || homestay.city === locationFilter);

  // Get unique locations for filter
  const locations = [...new Set([...homestays.map(h => h.place), ...homestays.map(h => h.city)])];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          <span className="text-indigo-600">Discover</span> Homestays
        </h1>
        <div className="w-full md:w-64">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHomestays.map((homestay,index) => (
          <Card 
            key={homestay.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedHomestay(homestay)}
          >
            <div className="h-40 bg-gray-200 relative">
            <Image 
            src={images[index]} 
            alt={homestay.place}
            fill
            className="object-cover"
          />
              <div className="absolute top-0 right-0 p-2">
                <Badge 
                  className="font-semibold" 
                  style={{ backgroundColor: getRoomCategoryColor(homestay.room_category) }}
                >
                  {homestay.room_category}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">{homestay.owner_name}</CardTitle>
                <div className="text-lg font-bold text-indigo-600">₹{homestay.cost_per_night}</div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                {homestay.city}, {homestay.place}
              </div>
            </CardHeader>
            
            <CardContent className="pb-3">
              <div className="flex items-center mb-3">
                {renderRatingStars(homestay.ratings)}
                <span className="ml-2 text-sm">{homestay.ratings}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {getAmenityIcons(homestay.amenities)}
                  <span className="text-sm text-gray-500">+{homestay.amenities.split(',').length} amenities</span>
                </div>
                <div className="flex items-center">
                  {homestay.is_ac ? 
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">AC</Badge> :
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Non-AC</Badge>
                  }
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-0 text-sm">
              <div className="text-gray-500">
                <span className="font-medium">{homestay.rooms_available}</span> rooms left
              </div>
              
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={selectedHomestay !== null} onOpenChange={(open) => !open && setSelectedHomestay(null)}>
        {selectedHomestay && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <h2 className="text-2xl font-bold">{selectedHomestay.owner_name}</h2>
              <p className="text-gray-500">{selectedHomestay.city}, {selectedHomestay.place}</p>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {renderRatingStars(selectedHomestay.ratings)}
                  <span className="ml-2 text-sm">{selectedHomestay.ratings}</span>
                </div>
                <div className="text-2xl font-bold text-indigo-600">₹{selectedHomestay.cost_per_night}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b pb-1">
                      <span className="font-medium">Phone:</span>
                      <span>{selectedHomestay.phone_number}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="font-medium">Room Category:</span>
                      <span>
                        <Badge 
                          style={{ backgroundColor: getRoomCategoryColor(selectedHomestay.room_category) }}
                        >
                          {selectedHomestay.room_category}
                        </Badge>
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="font-medium">AC:</span>
                      <span className="flex items-center">
                        {selectedHomestay.is_ac ? 
                          <><Check className="w-4 h-4 text-green-500 mr-1" /> Yes</> : 
                          <><X className="w-4 h-4 text-red-500 mr-1" /> No</>
                        }
                      </span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="font-medium">Rooms Available:</span>
                      <span>{selectedHomestay.rooms_available}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHomestay.amenities.split(',').map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {amenity.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" variant="default">Book Now</Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default HomestaysPage;