const express = require("express");
const router = express.Router();

// const { sections } = require("../models/data");
const { sections, chapters } = require("../models/data");

const {
  getSectionsByChapterId,
  getChaptersByTextbookId,
} = require("../services/contentService");

// GET /api/chapters/:chapter_id/sections
router.get("/chapters/:chapter_id/sections", (req, res) => {
  const { chapter_id } = req.params;

  const result = getSectionsByChapterId(sections, chapter_id);

  res.json(result);
});

// GET /api/textbooks/:textbook_id/chapters
router.get("/textbooks/:textbook_id/chapters", (req, res) => {
  const { textbook_id } = req.params;

  const result = getChaptersByTextbookId(chapters, textbook_id);

  res.json(result);
});

module.exports = router;