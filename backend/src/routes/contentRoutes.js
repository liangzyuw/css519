const express = require("express");
const router = express.Router();
const { chapters, sections } = require("../models/data");

// full endpoint becomes: GET /api/chapters/:chapter_id/sections
router.get("/chapters/:chapter_id/sections", (req, res) => {
  const { chapter_id } = req.params;

  const result = sections.filter(
    (section) => section.chapter_id === chapter_id
  );

  res.json(result);
});

module.exports = router;