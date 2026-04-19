const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// hardcoded metrics endpoint for now
app.get("/metrics", (req, res) => {
  res.json({
    service_up: true,
    frontend_up: true,
    api_requests_total: 120,
    api_success_count: 110,
    api_error_count: 10,
    active_users: 5,
    annotations_total: 8,
    unauthorized_requests_count: 2,
    app_version: "1.0.0",
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Metrics server running on port ${PORT}`);
});