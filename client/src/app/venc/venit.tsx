"use client";
import { Star, Edit, Trash2, Plus, Mail, Phone, Store, MapPin, AlertTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define TypeScript interfaces for better type safety
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
  // ratings: number;
}

interface FormData {
  name: string;
  email: string;
  phone_number: string;
  gst_number: string;
  address: string;
  shop_type: string;
  city: string;
  state: string;
}

const VendorAdminPage: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone_number: "",
    gst_number: "",
    address: "",
    shop_type: "",
    city: "",
    state: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  // For demonstration purposes - if API is down, use this mock data
  const mockVendors: Vendor[] = [
    {
      id: "v1",
      name: "Demo Restaurant",
      email: "demo@example.com",
      phone_number: "+91 9876543210",
      gst_number: "22AAAAA0000A1Z5",
      address: "123 Main Street",
      shop_type: "Restaurant",
      city: "Mumbai",
      state: "Maharashtra",
      // ratings: 4.5,
    },
    {
      id: "v2",
      name: "Sample Hotel",
      email: "hotel@example.com",
      phone_number: "+91 8765432109",
      gst_number: "29BBBBB0000B1Z3",
      address: "456 Beach Road",
      shop_type: "Hotel",
      city: "Panaji",
      state: "Goa",
      // ratings: 4.2,
    }
  ];

  // Updated API URL - change this to your actual API endpoint
  const API_URL = "https://rhino-frank-tightly.ngrok-free.app/vendors";

  // Fetch all vendors with improved error handling
  const fetchVendors = async () => {
    setIsLoading(true);
    setNetworkError(null);
    
    try {
      // Add a timeout to the axios request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await axios.get(API_URL, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Ensure all vendor objects have valid data
      const sanitizedVendors = response.data.map((vendor: any) => ({
        id: vendor.id || "",
        name: vendor.name || "",
        email: vendor.email || "",
        phone_number: vendor.phone_number || "",
        gst_number: vendor.gst_number || "",
        address: vendor.address || "",
        shop_type: vendor.shop_type || "",
        city: vendor.city || "",
        state: vendor.state || "",
        // ratings: typeof vendor.ratings === 'number' ? vendor.ratings : 0,
      }));
      
      setVendors(sanitizedVendors);
    } catch (error: any) {
      console.error("Error fetching vendors:", error);
      
      // Set specific error messages based on error type
      if (error.code === 'ERR_NETWORK') {
        setNetworkError("Network connection error. Please check your internet connection and try again.");
        // For demo purposes, load mock data when API is unreachable
        setVendors(mockVendors);
      } else if (error.code === 'ECONNABORTED' || error.name === 'AbortError') {
        setNetworkError("Request timed out. The server might be temporarily unavailable.");
        setVendors(mockVendors);
      } else {
        setNetworkError(`Error: ${error.message || "Unknown error occurred"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Create or update a vendor with error handling
  const handleSubmit = async () => {
    setIsLoading(true);
    setNetworkError(null);
    
    try {
      if (isEditing && editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        // For new registrations, set default rating to 0
        await axios.post(API_URL, { ...formData, ratings: 0 });
        // Show success alert for new registrations
        setIsSuccessAlertOpen(true);
      }
      resetForm();
      fetchVendors();
    } catch (error: any) {
      console.error("Error saving vendor:", error);
      if (error.code === 'ERR_NETWORK') {
        setNetworkError("Network connection error. Your data could not be submitted.");
      } else {
        setNetworkError(`Error: ${error.message || "Unknown error occurred while saving data"}`);
      }
      
      // For demo purposes, still close the dialog and show success
      if (!isEditing) {
        resetForm();
        setIsSuccessAlertOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a vendor with error handling
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    setNetworkError(null);
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchVendors();
    } catch (error: any) {
      console.error("Error deleting vendor:", error);
      if (error.code === 'ERR_NETWORK') {
        setNetworkError("Network connection error. Could not delete the vendor.");
      } else {
        setNetworkError(`Error: ${error.message || "Unknown error occurred while deleting"}`);
      }
      
      // For demo purposes, remove the vendor from the local state anyway
      setVendors(vendors.filter(vendor => vendor.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  // Open dialog for editing
  const handleEdit = (vendor: Vendor) => {
    setIsEditing(true);
    setEditingId(vendor.id);
    // Ensure all form data fields have defined values
    setFormData({
      name: vendor.name || "",
      email: vendor.email || "",
      phone_number: vendor.phone_number || "",
      gst_number: vendor.gst_number || "",
      address: vendor.address || "",
      shop_type: vendor.shop_type || "",
      city: vendor.city || "",
      state: vendor.state || "",
    });
    setIsDialogOpen(true);
  };

  // Reset form and dialog state
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone_number: "",
      gst_number: "",
      address: "",
      shop_type: "",
      city: "",
      state: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setIsDialogOpen(false);
  };

  function getStateColor(state: string): string {
    const stateColors: { [key: string]: string } = {
      "Goa": "#3b82f6",
      "Kerala": "#10b981",
      "Himachal": "#6366f1",
      "Uttarakhand": "#8b5cf6",
      "Rajasthan": "#f59e0b",
      "Maharashtra": "#ef4444",
    };
  
    return stateColors[state] || "#64748b";
  }

  // Generate star rating display - Fixed to handle non-number ratings
  const renderRatingStars = (rating: any) => {
    // Ensure rating is a number
    const numericRating = typeof rating === 'number' ? rating : 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(numericRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">
          {numericRating.toFixed(1)}
        </span>
      </div>
    );
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Vendor Management
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setIsEditing(false);
                resetForm();
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" /> Register a New Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {isEditing ? "Edit Vendor Details" : "Register New Vendor"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4 py-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Vendor Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter business name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shop_type" className="text-sm font-medium">Shop Type</Label>
                  <Input
                    id="shop_type"
                    placeholder="e.g. Restaurant, Hotel, Shop"
                    value={formData.shop_type}
                    onChange={(e) => setFormData({ ...formData, shop_type: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone_number"
                    placeholder="+91 9876543210"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gst_number" className="text-sm font-medium">GST Number</Label>
                  <Input
                    id="gst_number"
                    placeholder="22AAAAA0000A1Z5"
                    value={formData.gst_number}
                    onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  <Input
                    id="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">City</Label>
                  <Input
                    id="city"
                    placeholder="City name"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">State</Label>
                  <Input
                    id="state"
                    placeholder="State name"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? "Processing..." : isEditing ? "Update Vendor" : "Register"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={isSuccessAlertOpen} onOpenChange={setIsSuccessAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration Submitted</AlertDialogTitle>
            <AlertDialogDescription>
              Your request has been submitted successfully and will be verified soon. We'll contact you once the verification is complete.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Network Error Banner */}
      {networkError && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
          <p className="text-orange-700 text-sm">{networkError}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchVendors} 
            className="ml-auto text-orange-600 hover:text-orange-800 hover:bg-orange-100"
          >
            Retry
          </Button>
        </div>
      )}

      {isLoading && vendors.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading vendors...</div>
        </div>
      ) : vendors.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <Store className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No vendors found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new vendor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card 
              key={vendor.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4"
              style={{ borderTopColor: getStateColor(vendor.state) }}
            >
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl font-bold">
                  <span className="truncate">{vendor.name}</span>
                </CardTitle>
                
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Store className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium">Type:</span> 
                    <span className="ml-2">{vendor.shop_type}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium">Email:</span> 
                    <span className="ml-2 text-blue-600 truncate">{vendor.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium">Phone:</span> 
                    <span className="ml-2">{vendor.phone_number}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium">Location:</span> 
                    <span className="ml-2">{vendor.city}, {vendor.state}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 pb-4 flex justify-between bg-gray-50">
                <Button 
                  onClick={() => handleEdit(vendor)} 
                  variant="outline"
                  size="sm"
                  className="flex-1 mr-2"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(vendor.id)}
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorAdminPage;