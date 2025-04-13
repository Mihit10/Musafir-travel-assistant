"use client";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Define proper TypeScript interface for Vendor
interface Vendor {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gst_number: string;
  address: string;
  shop_type: string;
  city: string;
  state: string;
  ratings: number;
}

const ShopsPage = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [stateFilter, setStateFilter] = useState<string>("all");

  const API_URL = "https://rhino-frank-tightly.ngrok-free.app/vendors";

  // Fetch all vendors
  const fetchVendors = async () => {
    try {
      const response = await axios.get<Vendor[]>(API_URL, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  // Delete a vendor
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchVendors();
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  // Open vendor details dialog
  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  // Color mapping for states
  function getStateColor(state: string): string {
    const stateColors: { [key: string]: string } = {
      "Goa": "#3b82f6",
      "Kerala": "#10b981",
      "Himachal": "#6366f1",
      "Uttarakhand": "#8b5cf6",
      "Rajasthan": "#f59e0b",
    };
  
    return stateColors[state] || "#64748b";
  }
  
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

  // Filter vendors by state
  const filteredVendors = stateFilter === "all" 
    ? vendors 
    : vendors.filter(vendor => vendor.state === stateFilter);

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Vendors</h1>
        <div className="w-full md:w-64">
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="Goa">Goa</SelectItem>
              <SelectItem value="Kerala">Kerala</SelectItem>
              <SelectItem value="Himachal">Himachal</SelectItem>
              <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
              <SelectItem value="Rajasthan">Rajasthan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVendors.map((vendor) => (
          <Card 
            key={vendor.id} 
            className="cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4"
            style={{ borderTopColor: getStateColor(vendor.state) }}
            onClick={() => handleViewDetails(vendor)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-center truncate">{vendor.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center justify-center mb-2">
                {renderRatingStars(vendor.ratings)}
                <span className="ml-2 text-sm text-gray-600">{vendor.ratings}</span>
              </div>
              <p className="text-center text-gray-600 text-sm truncate">{vendor.shop_type}</p>
              <p className="text-center text-sm text-gray-500 mt-1">{vendor.city}, {vendor.state}</p>
              
              <div className="flex justify-center mt-4">
              <Button
  onClick={(e) => {
    e.stopPropagation();
    // Create WhatsApp link with predefined message
    const message = encodeURIComponent("I am interested in visiting your place. I would like to enquire more.");
    const whatsappUrl = `https://wa.me/${vendor.phone_number}?text=${message}`;
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  }}
  variant="outline"
  size="sm"
  className="h-8 px-3 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  </svg>
  Contact
</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={selectedVendor !== null} onOpenChange={(open) => !open && setSelectedVendor(null)}>
        {selectedVendor && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <h2 className="text-2xl font-bold">{selectedVendor.name}</h2>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-center mb-4">
                {renderRatingStars(selectedVendor.ratings)}
                <span className="ml-2 text-sm text-gray-600">{selectedVendor.ratings}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Shop Type:</span>
                  <span>{selectedVendor.shop_type}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Email:</span>
                  <span className="text-blue-600">{selectedVendor.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Phone:</span>
                  <span>{selectedVendor.phone_number}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">GST Number:</span>
                  <span>{selectedVendor.gst_number}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Address:</span>
                  <span>{selectedVendor.address}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="font-medium">Location:</span>
                  <span>{selectedVendor.city}, {selectedVendor.state}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ShopsPage;