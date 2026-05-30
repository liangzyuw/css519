const express = require("express");
const router = express.Router();

const {
  getCommentsByContent,
  createComment,
} = require("../services/commentStore");

// POST /api/comments
router.post("/comments", (req, res) => {
  const { content_id, content_type, author_id, body } = req.body;

  if (!content_id || !content_type || !author_id || !body) {
    return res.status(400).json({
      message: "content_id, content_type, author_id, and body are required",
    });
  }

  const newComment = createComment({
    content_id,
    content_type,
    author_id,
    body,
  });

  res.status(201).json(newComment);
});

// GET /api/comments?content_type=section&content_id=tb1-sec1
router.get("/comments", (req, res) => {
  const { content_id, content_type } = req.query;

  if (!content_id || !content_type) {
    return res.status(400).json({
      message: "content_id and content_type are required",
    });
  }

  const result = getCommentsByContent(content_id, content_type);

  res.json(result);
});

module.exports = router;