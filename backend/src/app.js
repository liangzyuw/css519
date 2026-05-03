const express = require("express");
const cors = require("cors");
require("dotenv").config();

const metrics = require("./metrics");

const app = express();

// Browsers block cross-origin requests unless backend explicitly allows it via:
app.use(cors());
// since backend is running on port 3000 and frontend on port 5173, we need to allow CORS requests from frontend

// middleware to parse JSON request bodies
app.use(express.json());

app.use((req, res, next) => {
  metrics.api_requests_total++;

  res.on("finish", () => {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      metrics.api_success_count++;
    } else {
      metrics.api_error_count++;
    }

    if (res.statusCode === 401 || res.statusCode === 403) {
      metrics.unauthorized_requests_count++;
    }
  });

  next();
});

// routes
const annotationRoutes = require("./routes/annotationRoutes");
const contentRoutes = require("./routes/contentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api", annotationRoutes);
app.use("/api", contentRoutes);
app.use("/api", authRoutes);

// expose metrics endpoint for dashboard to consume
app.get("/metrics", (req, res) => {
  // res.json(metrics);
  res.json({
    service_up: metrics.service_up,
    frontend_up: metrics.frontend_up,
    api_requests_total: metrics.api_requests_total,
    api_success_count: metrics.api_success_count,
    api_error_count: metrics.api_error_count,
    active_users: metrics.active_users,
    annotations_total: metrics.annotations_total,
    unauthorized_requests_count: metrics.unauthorized_requests_count,
    app_version: metrics.app_version,
  });
});

//now backend provides
// http://backend:3000/metrics   (inside Docker)
// http://localhost:3000/metrics (outside)

// test root
app.get("/", (req, res) => {
  res.send("Product API running");
});

module.exports = app;

// run the express app and opens a server on port 3000
    // run node app.js in src directory to start the server
    // API is live at http://localhost:3000
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
