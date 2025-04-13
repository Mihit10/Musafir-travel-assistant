"use client";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const ShopsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    gst_number: "",
    address: "",
    shop_type: "",
    city: "",
    ratings: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const API_URL = "https://rhino-frank-tightly.ngrok-free.app/vendors";

  // Fetch all vendors
  const fetchVendors = async () => {
    try {
      const response = await axios.get(API_URL, {
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

  // Create or update a vendor
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        gst_number: "",
        address: "",
        shop_type: "",
        city: "",
        ratings: 0,
      });
      setIsEditing(false);
      setEditingId(null);
      setIsDialogOpen(false);
      fetchVendors();
    } catch (error) {
      console.error("Error saving vendor:", error);
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

  // Open dialog for editing
  const handleEdit = (vendor: any) => {
    setIsEditing(true);
    setEditingId(vendor.id);
    setFormData(vendor);
    setIsDialogOpen(true);
  };

  
  
  
  
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
  

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vendors</h1>
      <div className="mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsEditing(false)}>Add Vendor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <h2 className="text-xl font-semibold">
                {isEditing ? "Edit Vendor" : "Add Vendor"}
              </h2>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="gst_number">GST Number</Label>
                <Input
                  id="gst_number"
                  value={formData.gst_number}
                  onChange={(e) =>
                    setFormData({ ...formData, gst_number: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="shop_type">Shop Type</Label>
                <Input
                  id="shop_type"
                  value={formData.shop_type}
                  onChange={(e) =>
                    setFormData({ ...formData, shop_type: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="ratings">Ratings</Label>
                <Input
                  id="ratings"
                  type="number"
                  value={formData.ratings}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ratings: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vendors.map((vendor: any) => (
          <Card 
          key={vendor.id}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4"
          style={{ borderTopColor: getStateColor(vendor.state) }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">{vendor.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center mb-3">
              
              <span className="ml-2 text-sm">{vendor.ratings}</span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="flex justify-between">
                <span className="font-medium">Shop Type:</span> 
                <span>{vendor.shop_type}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Email:</span> 
                <span className="text-blue-600">{vendor.email}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Phone:</span> 
                <span>{vendor.phone_number}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">City:</span> 
                <span>{vendor.city}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">State:</span> 
                <span>{vendor.state}</span>
              </p>
            </div>
            <div className="flex space-x-2 mt-4 pt-2 border-t">
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(vendor);
                }} 
                size="sm"
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(vendor.id);
                }}
                variant="destructive"
                size="sm"
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopsPage;
