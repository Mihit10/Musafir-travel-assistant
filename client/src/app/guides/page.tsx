"use client"; // Correct directive to mark the component as client-side

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3005/guides"; // Your backend API

const GuidesPage = () => {
  const [guides, setGuides] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "", // Update here to match backend field
    adhar_card: "",
    years_of_experience: 0,
    age: 0,
    ratings: 0,
    language: "",
    city: "",
    places: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editGuideId, setEditGuideId] = useState(null);

  // Fetch guides on component mount
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get(API_URL);
        setGuides(response.data);
      } catch (error) {
        toast.error("Failed to load guides");
      }
    };

    fetchGuides();
  }, []);

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for creating and editing guides
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      try {
        await axios.put(`${API_URL}/${editGuideId}`, formData);
        toast.success("Guide updated successfully!");
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed to update guide");
      }
    } else {
      try {
        await axios.post(API_URL, formData);
        toast.success("Guide created successfully!");
      } catch (error) {
        toast.error("Failed to create guide");
      }
    }

    // Clear form
    setFormData({
      name: "",
      email: "",
      phone_number: "", // Ensure this is cleared properly
      adhar_card: "",
      years_of_experience: 0,
      age: 0,
      ratings: 0,
      language: "",
      city: "",
      places: [],
    });

    // Reload guides
    const response = await axios.get(API_URL);
    setGuides(response.data);
  };

  // Handle editing
  const handleEdit = (guide: any) => {
    setFormData(guide);
    setIsEditing(true);
    setEditGuideId(guide.id);
  };

  // Handle deleting
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Guide deleted successfully!");
      const response = await axios.get(API_URL);
      setGuides(response.data);
    } catch (error) {
      toast.error("Failed to delete guide");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        {isEditing ? "Edit Guide" : "Create New Guide"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              name="phone_number" // Update name here as well
              value={formData.phone_number} // Ensure state field matches
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <Label>Adhar Card</Label>
            <Input
              name="adhar_card"
              value={formData.adhar_card}
              onChange={handleInputChange}
              placeholder="Enter Adhar card number"
              required
            />
          </div>
          <div>
            <Label>Years of Experience</Label>
            <Input
              name="years_of_experience"
              type="number"
              value={formData.years_of_experience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Age</Label>
            <Input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
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
            <Label>Language</Label>
            <Input
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              placeholder="Enter language"
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
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="submit">
            {isEditing ? "Update Guide" : "Create Guide"}
          </Button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mt-8">Guides List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {guides.map((guide: any) => (
          <Card key={guide.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{guide.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {guide.email}</p>
              <p>Phone: {guide.phone_number}</p>{" "}
              {/* Use the correct field name here */}
              <p>City: {guide.city}</p>
              <p>Languages: {guide.language}</p>
              <p>Years of Experience: {guide.years_of_experience}</p>
            </CardContent>
            <div className="flex justify-between items-center p-2">
              <Button
                onClick={() => handleEdit(guide)}
                className="bg-blue-500 text-white"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(guide.id)}
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

export default GuidesPage;
