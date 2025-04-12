const express = require("express");
const cors = require("cors");
const GuideService = require("./services/guideService");
const VendorService = require("./services/vendorService");
const HomestayService = require("./services/homestayService");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware to allow all origins
app.use(cors());
app.use(express.json());

// Debugging middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});

// Guide Routes
app.post("/guides", async (req, res) => {
  try {
    console.log("Creating guide...");
    const guide = await GuideService.createGuide(req.body);
    res.status(201).json(guide);
    console.log("Guide created:", guide);
  } catch (err) {
    console.error("Error creating guide:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/guides", async (req, res) => {
  try {
    console.log("Fetching all guides...");
    const guides = await GuideService.getGuides();
    res.json(guides);
    console.log("Fetched guides:", guides);
  } catch (err) {
    console.error("Error fetching guides:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/guides/:id", async (req, res) => {
  try {
    console.log(`Updating guide with ID: ${req.params.id}`);
    const guide = await GuideService.updateGuide(req.params.id, req.body);
    res.json(guide);
    console.log("Guide updated:", guide);
  } catch (err) {
    console.error(
      `Error updating guide with ID ${req.params.id}:`,
      err.message
    );
    res.status(500).json({ error: err.message });
  }
});

app.delete("/guides/:id", async (req, res) => {
  try {
    console.log(`Deleting guide with ID: ${req.params.id}`);
    const guide = await GuideService.deleteGuide(req.params.id);
    res.json(guide);
    console.log("Guide deleted:", guide);
  } catch (err) {
    console.error(
      `Error deleting guide with ID ${req.params.id}:`,
      err.message
    );
    res.status(500).json({ error: err.message });
  }
});

// Vendor Routes
app.post("/vendors", async (req, res) => {
  try {
    console.log("Creating vendor...");
    const vendor = await VendorService.createVendor(req.body);
    res.status(201).json(vendor);
    console.log("Vendor created:", vendor);
  } catch (err) {
    console.error("Error creating vendor:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/vendors", async (req, res) => {
  try {
    console.log("Fetching all vendors...");
    const vendors = await VendorService.getVendors();
    res.json(vendors);
    console.log("Fetched vendors:", vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/vendors/:id", async (req, res) => {
  try {
    console.log(`Updating vendor with ID: ${req.params.id}`);
    const vendor = await VendorService.updateVendor(req.params.id, req.body);
    res.json(vendor);
    console.log("Vendor updated:", vendor);
  } catch (err) {
    console.error(
      `Error updating vendor with ID ${req.params.id}:`,
      err.message
    );
    res.status(500).json({ error: err.message });
  }
});

app.delete("/vendors/:id", async (req, res) => {
  try {
    console.log(`Deleting vendor with ID: ${req.params.id}`);
    const vendor = await VendorService.deleteVendor(req.params.id);
    res.json(vendor);
    console.log("Vendor deleted:", vendor);
  } catch (err) {
    console.error(
      `Error deleting vendor with ID ${req.params.id}:`,
      err.message
    );
    res.status(500).json({ error: err.message });
  }
});

// Homestay Routes
app.post("/homestays", async (req, res) => {
  try {
    console.log("Creating homestay...");
    const homestay = await HomestayService.createHomestay(req.body);
    res.status(201).json(homestay);
    console.log("Homestay created:", homestay);
  } catch (err) {
    console.error("Error creating homestay:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/homestays", async (req, res) => {
  try {
    console.log("Fetching all homestays...");
    const homestays = await HomestayService.getHomestays();
    res.json(homestays);
    console.log("Fetched homestays:", homestays);
  } catch (err) {
    console.error("Error fetching homestays:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/homestays/:id", async (req, res) => {
  try {
    console.log(`Updating homestay with ID: ${req.params.id}`);
    const homestay = await HomestayService.updateHomestay(
      req.params.id,
      req.body
    );
    res.json(homestay);
    console.log("Homestay updated:", homestay);
  } catch (err) {
    console.error(
      `Error updating homestay with ID ${req.params.id}:`,
      err.message
    );
    res.status(500).json({ error: err.message });
  }
});

app.delete("/homestays/:id", async (req, res) => {
  try {
    console.log(`Deleting homestay with ID: ${req.params.id}`);
    const homestay = await HomestayService.deleteHomestay(req.params.id);
    res.json(homestay);
    console.log("Homestay deleted:", homestay);
  } catch (err) {
    console.error(
      `Error deleting homestay with ID ${req.params.id}:`,
      err.message
    );
    res.status(500).json({ error: err.message });
  }
});

// Debugging middleware to log responses
app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    console.log("Response:", data);
    oldSend.apply(res, arguments);
  };
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
