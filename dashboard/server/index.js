const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/metrics", async (req, res) => {
  try {
    const response = await axios.get("http://backend:3000/metrics");
    // include early alert data for unimplemented student request failure
    // Merge real backend metrics with fake early-alert dashboard data
    res.json({
      ...response.data,  // the ... spread operator is used to merge and extend data before sending it back as a JSON response
      backend_up: true,  // it "unpacks" all the properties from an existing object into a new one.
      service_up: true
    });

  } catch (error) {
    console.error("Error fetching metrics:", error);

    res.status(500).json({
      error: "Failed to fetch metrics",
      backend_up: false,
      service_up: false,
    });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Metrics server running on port ${PORT}`);
});