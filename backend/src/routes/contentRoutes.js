const express = require("express");
const router = express.Router();

const { sections } = require("../models/data");
const { getSectionsByChapterId } = require("../services/contentService");

// GET /api/chapters/:chapter_id/sections
router.get("/chapters/:chapter_id/sections", (req, res) => {
  const { chapter_id } = req.params;

  const result = getSectionsByChapterId(sections, chapter_id);

  res.json(result);
});

module.exports = router;