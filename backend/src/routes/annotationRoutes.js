const express = require("express");
const router = express.Router();

const { annotations } = require("../models/data");
const {
  getAnnotationsForContent,
  createAnnotation,
  deleteAnnotationById,
} = require("../services/annotationService");

const authMiddleware = require("../middleware/auth");
const requireInstructor = require("../middleware/requireInstructor");

// only instructors can create annotations
router.post("/annotations", authMiddleware, requireInstructor, (req, res) => {
  try {
    const newAnnotation = createAnnotation(annotations, req.body);
    res.status(201).json(newAnnotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// useful for security tests later
router.delete("/annotations/:id", authMiddleware, requireInstructor, (req, res) => {
  const deleted = deleteAnnotationById(annotations, req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Annotation not found" });
  }

  res.status(204).send();
});

router.get("/annotations", (req, res) => {
  const { content_id, content_type } = req.query;

  const result = getAnnotationsForContent(
    annotations,
    content_id,
    content_type
  );

  res.json(result);
});

module.exports = router;