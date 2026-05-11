const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const fakeWeeklyRiskData = {
  annotation_lookup_failures_week: [
    { day: "Mon", value: 2 },
    { day: "Tue", value: 1 },
    { day: "Wed", value: 4 },
    { day: "Thu", value: 3 },
    { day: "Fri", value: 6 },
    { day: "Sat", value: 2 },
    { day: "Sun", value: 1 },
  ],
  student_request_submission_failures_week: [
    { day: "Mon", value: 0 },
    { day: "Tue", value: 1 },
    { day: "Wed", value: 1 },
    { day: "Thu", value: 3 },
    { day: "Fri", value: 2 },
    { day: "Sat", value: 4 },
    { day: "Sun", value: 2 },
  ],
};

app.get("/metrics", async (req, res) => {
  try {
    const response = await axios.get("http://backend:3000/metrics");
    // include early alert data for unimplemented student request failure
    // Merge real backend metrics with fake early-alert dashboard data
    res.json({
      ...response.data,  // the ... spread operator is used to merge and extend data before sending it back as a JSON response
      backend_up: true,  // it "unpacks" all the properties from an existing object into a new one.
      service_up: true,
      ...fakeWeeklyRiskData,
    });

  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }

  // for testing dashboard without backend, return mock data with some failure trends
  // res.status(200).json({
  //   service_up: false,
  //   frontend_up: true,
  //   backend_up: false,

  //   api_requests_total: 0,
  //   api_success_count: 0,
  //   api_error_count: 1,

  //   active_users: 0,
  //   annotations_total: 0,
  //   unauthorized_requests_count: 0,

  //   textbook_load_time_ms: null,
  //   annotation_load_time_ms: null,

  //   app_version: "unknown",

  //   ...fakeWeeklyRiskData,
  // });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Metrics server running on port ${PORT}`);
});