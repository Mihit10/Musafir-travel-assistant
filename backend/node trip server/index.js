const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const NodeCache = require("node-cache");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

// Initialize Express app
const app = express();
const PORT = 5005;

app.use(cors());
// Middleware
app.use(bodyParser.json());

// Initialize cache with a TTL of 10 minutes
const cache = new NodeCache({ stdTTL: 600 });

// Threshold time for fallback in milliseconds
const TIMEOUT_THRESHOLD = 210000;

const dataPath = path.join(__dirname, "cache", "tempData.json");

let fallbackData;
try {
  const rawData = fs.readFileSync(dataPath, "utf-8");
  fallbackData = JSON.parse(rawData);
} catch (error) {
  console.error("Error loading fallback data:", error);
  fallbackData = { error: "Fallback data not available" };
}

// Fallback response
const FALLBACK_RESPONSE = {
  message: "Request timed out. Returning fallback data.",
  data: fallbackData,
};

// POST endpoint
app.post("/trip", async (req, res) => {
  const params = req.body;
  console.debug("Received request body:", params);

  const cacheKey = JSON.stringify(params);
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    console.info("Cache hit. Returning cached response.");
    return res.json(cachedResponse);
  }

  console.info("Cache miss. Proceeding with API request.");

  try {
    const source = axios.CancelToken.source();

    // Start a timer for the threshold
    const timeoutId = setTimeout(() => {
      console.warn("Request exceeded threshold time. Cancelling request.");
      source.cancel("Timeout exceeded");
    }, TIMEOUT_THRESHOLD);

    const response = await axios.post("http://127.0.0.1:5000/trip", params, {
      cancelToken: source.token,
    });

    clearTimeout(timeoutId);

    console.info("API request successful. Storing response in cache.");
    // cache.set(cacheKey, response.data);

    return res.json(FALLBACK_RESPONSE);
  } catch (error) {
    console.error("Error during API request:", error.message);

    if (axios.isCancel(error)) {
      console.info("Request was cancelled due to timeout. Returning fallback.");
      return res.json(FALLBACK_RESPONSE);
    }

    console.error("Unexpected error. Returning fallback response.");
    return res.status(500).json(FALLBACK_RESPONSE);
  }
});

// DELETE endpoint to remove an entry from JSON data
app.delete("/data", (req, res) => {
  const { name } = req.body;
  console.debug("Received request to delete entry with name:", name);

  if (!name) {
    return res
      .status(400)
      .json({ message: "Name is required to delete an entry" });
  }

  try {
    // Load the current data from the file
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(rawData);

    let entryDeleted = false;

    // Traverse each day and delete the entry with the specified name
    Object.keys(data).forEach((day) => {
      Object.keys(data[day]).forEach((placeKey) => {
        if (data[day][placeKey]?.name === name) {
          // Delete the specific entry
          delete data[day][placeKey];
          entryDeleted = true;
        }
      });

      if (entryDeleted) {
        // Reorganize the places within the day
        const updatedPlaces = {};
        let count = 1;

        Object.keys(data[day]).forEach((key) => {
          updatedPlaces[`place_${count}`] = data[day][key];
          count++;
        });

        data[day] = updatedPlaces;
      }
    });

    if (!entryDeleted) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // Write the updated data back to the file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
    fallbackData = data; // Update in-memory data

    console.info("Entry with name deleted successfully. Data updated.");
    res.json({ message: "Entry deleted successfully", data });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res
      .status(500)
      .json({ message: "Error deleting entry", error: error.message });
  }
});

// Route to find and return the remaining places
app.get("/remaining-places", (req, res) => {
  try {
    // Load current data from tempData.json
    const tempRawData = fs.readFileSync(dataPath, "utf-8");
    const tempData = JSON.parse(tempRawData);

    // Load Himachal places data from himachal_places.json
    const himachalRawData = fs.readFileSync(
      path.join(__dirname, "Data", "himachal_places.json"),
      "utf-8"
    );
    const himachalData = JSON.parse(himachalRawData);

    // Extract place names from tempData
    const tempPlaceNames = [];
    Object.keys(tempData).forEach((day) => {
      Object.values(tempData[day]).forEach((place) => {
        tempPlaceNames.push(place.name);
      });
    });

    // Find places in himachalData that are not in tempPlaceNames
    const remainingPlaces = himachalData.filter(
      (place) => !tempPlaceNames.includes(place.place_name)
    );

    console.info("Remaining places found successfully.");
    res.json({ message: "Remaining places retrieved", data: remainingPlaces });
  } catch (error) {
    console.error("Error finding remaining places:", error);
    res.status(500).json({
      message: "Error finding remaining places",
      error: error.message,
    });
  }
});

// POST endpoint to insert an entry into JSON data
app.post("/data", (req, res) => {
  const newEntry = req.body;
  console.debug("Received request to insert:", newEntry);

  try {
    // Load the current data from the file
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(rawData);

    const { day, place } = newEntry;

    if (!data[day]) {
      data[day] = {};
    }

    // Get the next place index for the specified day
    const nextPlaceIndex = Object.keys(data[day]).length + 1;
    data[day][`place_${nextPlaceIndex}`] = place;

    // Write the updated data back to the file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
    fallbackData = data; // Update in-memory data

    console.info("Entry inserted successfully. Data updated.");
    res.json({ message: "Entry inserted successfully", data });
  } catch (error) {
    console.error("Error inserting entry:", error);
    res
      .status(500)
      .json({ message: "Error inserting entry", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.info(`Server running on http://127.0.0.1:${PORT}`);
});
