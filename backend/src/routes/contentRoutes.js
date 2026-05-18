const express = require("express");
const router = express.Router();

const { textbooks, sections, chapters } = require("../models/data");

const {
  getTextbooks,
  getTextbookById,
  getSectionsByChapterId,
  getChaptersByTextbookId,
} = require("../services/contentService");

// get all textbooks available to a user
// GET /api/textbooks
router.get("/textbooks", (req, res) => {
  const result = getTextbooks(textbooks);
  res.json(result);
});

// GET /api/textbooks/:textbook_id/chapters
router.get("/textbooks/:textbook_id/chapters", (req, res) => {
  const { textbook_id } = req.params;

  const result = getChaptersByTextbookId(chapters, textbook_id);

  res.json(result);
});

// GET /api/textbooks/:textbook_id
router.get("/textbooks/:textbook_id", (req, res) => {
  const { textbook_id } = req.params;

  const result = getTextbookById(textbooks, textbook_id);

  if (!result) {
    return res.status(404).json({ message: "Textbook not found" });
  }

  res.json(result);
});

// GET /api/chapters/:chapter_id/sections
router.get("/chapters/:chapter_id/sections", (req, res) => {
  const { chapter_id } = req.params;

  const result = getSectionsByChapterId(sections, chapter_id);

  res.json(result);
});

module.exports = router;