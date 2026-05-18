const express = require("express");
const router = express.Router();

const {
  getMetrics,
  recordMetric,
} = require("../models/metricsStore");
const { annotations, textbooks } = require("../models/data");

// Dashboard reads this
router.get("/metrics", (req, res) => {
  const baseMetrics = getMetrics();

  res.json({
    ...baseMetrics,
    
    textbooks_total: textbooks.length,
    annotations_total: annotations.length,     // count current in-memory annotation store
  });
});


// Frontend sends browser-perceived timings here
router.post("/metrics/client", (req, res) => {
  const { name, value } = req.body;

  const allowedClientMetrics = [
    "textbook_load_time_ms",
    "annotation_load_time_ms",
  ];

  if (!allowedClientMetrics.includes(name)) {
    return res.status(400).json({
      error: "Unsupported client metric",
    });
  }

  if (!name || typeof value !== "number") {
    return res.status(400).json({
      error: "Metric name and numeric value are required",
    });
  }

  recordMetric(name, value);

  res.status(201).json({
    message: "Metric recorded",
    name,
    value,
  });
});

module.exports = router;