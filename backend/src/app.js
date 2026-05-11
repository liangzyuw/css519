const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Browsers block cross-origin requests unless backend explicitly allows it via:
app.use(cors());
// since backend is running on port 3000 and frontend on port 5173, we need to allow CORS requests from frontend

// middleware to parse JSON request bodies
app.use(express.json());

const { incrementMetric } = require("./models/metricsStore");

app.use((req, res, next) => {
  // Skip counting metrics for dashboard polling and client-side metric reporting
  const shouldSkip =
    req.path === "/metrics" ||
    req.path === "/metrics/client";

  //avoid counting dashboard polling itself
  if (!shouldSkip) {
    incrementMetric("api_requests_total");
  }

  res.on("finish", () => { 
    // skip counting dashboard polling itself
    if (shouldSkip) return;

    // Increment success or error counts based on response status
    if (res.statusCode >= 200 && res.statusCode < 400) {
      incrementMetric("api_success_count");
    } else {
      incrementMetric("api_error_count");
    }

    if (res.statusCode === 401 || res.statusCode === 403) {
      incrementMetric("unauthorized_requests_count");
    }
  })

  next();
})

// routes
const annotationRoutes = require("./routes/annotationRoutes");
const contentRoutes = require("./routes/contentRoutes");
const authRoutes = require("./routes/authRoutes");
const metricsRoutes = require("./routes/metricsRoutes");

app.use("/api", annotationRoutes);
app.use("/api", contentRoutes);
app.use("/api", authRoutes);

// expose metrics at /metrics not /api/metrics so dashboard can poll it without CORS issues
app.use(metricsRoutes);

//now backend provides
// http://backend:3000/metrics   (inside Docker)
// http://localhost:3000/metrics (outside)

// test root
app.get("/", (req, res) => {
  res.send("Product API running");
});

module.exports = app;
// run the express app and opens a server on port 3000