"use client"; // Correct directive to mark the component as client-side

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3005/homestays"; // Your backend API

const HomestaysPage = () => {
  const [homestays, setHomestays] = useState([]);
  const [formData, setFormData] = useState({
    owner_name: "",
    phone_number: "",
    ratings: 0,
    city: "",
    place: "",
    cost_per_night: 0,
    room_category: "",
    is_ac: false,
    amenities: "",
    rooms_available: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editHomestayId, setEditHomestayId] = useState(null);

  // Fetch homestays on component mount
  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await axios.get(API_URL);
        setHomestays(response.data);
      } catch (error) {
        toast.error("Failed to load homestays");
      }
    };

    fetchHomestays();
  }, []);

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for creating and editing homestays
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      try {
        await axios.put(`${API_URL}/${editHomestayId}`, formData);
        toast.success("Homestay updated successfully!");
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed to update homestay");
      }
    } else {
      try {
        await axios.post(API_URL, formData);
        toast.success("Homestay created successfully!");
      } catch (error) {
        toast.error("Failed to create homestay");
      }
    }

    // Clear form
    setFormData({
      owner_name: "",
      phone_number: "",
      ratings: 0,
      city: "",
      place: "",
      cost_per_night: 0,
      room_category: "",
      is_ac: false,
      amenities: "",
      rooms_available: 0,
    });

    // Reload homestays
    const response = await axios.get(API_URL);
    setHomestays(response.data);
  };

  // Handle editing
  const handleEdit = (homestay: any) => {
    setFormData(homestay);
    setIsEditing(true);
    setEditHomestayId(homestay.id);
  };

  // Handle deleting
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Homestay deleted successfully!");
      const response = await axios.get(API_URL);
      setHomestays(response.data);
    } catch (error) {
      toast.error("Failed to delete homestay");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        {isEditing ? "Edit Homestay" : "Create New Homestay"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Owner Name</Label>
            <Input
              name="owner_name"
              value={formData.owner_name}
              onChange={handleInputChange}
              placeholder="Enter owner's name"
              required
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <Label>Ratings</Label>
            <Input
              name="ratings"
              type="number"
              value={formData.ratings}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city"
              required
            />
          </div>
          <div>
            <Label>Place</Label>
            <Input
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              placeholder="Enter place"
              required
            />
          </div>
          <div>
            <Label>Cost Per Night</Label>
            <Input
              name="cost_per_night"
              type="number"
              value={formData.cost_per_night}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Room Category</Label>
            <Input
              name="room_category"
              value={formData.room_category}
              onChange={handleInputChange}
              placeholder="Enter room category"
              required
            />
          </div>
          <div>
            <Label>AC Available</Label>
            <Input
              name="is_ac"
              type="checkbox"
              checked={formData.is_ac}
              onChange={(e) =>
                setFormData({ ...formData, is_ac: e.target.checked })
              }
            />
          </div>
          <div>
            <Label>Amenities</Label>
            <Input
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              placeholder="Enter amenities (comma-separated)"
              required
            />
          </div>
          <div>
            <Label>Rooms Available</Label>
            <Input
              name="rooms_available"
              type="number"
              value={formData.rooms_available}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="submit">
            {isEditing ? "Update Homestay" : "Create Homestay"}
          </Button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mt-8">Homestays List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {homestays.map((homestay: any) => (
          <Card key={homestay.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{homestay.owner_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Phone: {homestay.phone_number}</p>
              <p>City: {homestay.city}</p>
              <p>Place: {homestay.place}</p>
              <p>Cost Per Night: ₹{homestay.cost_per_night}</p>
              <p>Ratings: {homestay.ratings}</p>
              <p>Room Category: {homestay.room_category}</p>
              <p>AC Available: {homestay.is_ac ? "Yes" : "No"}</p>
              <p>Amenities: {homestay.amenities}</p>
              <p>Rooms Available: {homestay.rooms_available}</p>
            </CardContent>
            <div className="flex justify-between items-center p-2">
              <Button
                onClick={() => handleEdit(homestay)}
                className="bg-blue-500 text-white"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(homestay.id)}
                className="bg-red-500 text-white"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomestaysPage;
