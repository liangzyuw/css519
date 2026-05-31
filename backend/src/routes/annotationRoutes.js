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
const { incrementMetric, recordSecurityEvent } = require("../models/metricsStore");

// only instructors can create annotations
router.post("/annotations", authMiddleware, requireInstructor, (req, res) => {
  try {
    const newAnnotation = createAnnotation(annotations, req.body);

    recordSecurityEvent("ANNOTATION_CREATED", {
      annotation_id: newAnnotation.id,
      content_id: newAnnotation.content_id,
      content_type: newAnnotation.content_type,
      created_by: req.user.id,
      role: req.user.role,
    });

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

// instructor-only endpoint for reviewing all annotations
router.get("/annotations/all", authMiddleware, requireInstructor, (req, res) => {
  res.json(annotations);
});

// logged-in users can view annotations for specific content
router.get("/annotations", authMiddleware, (req, res) => {
  const { content_id, content_type } = req.query;

  const result = annotations.filter(
    (a) =>
      a.content_id === content_id &&
      a.content_type === content_type
  );

  res.json(result);
});
// router.get("/annotations", authMiddleware, (req, res) => {
//   const { content_id, content_type } = req.query;

//   if (!content_id || !content_type) {
//     return res.status(400).json({
//       message: "content_id and content_type are required",
//     });
//   }

//   const result = getAnnotationsForContent(
//     annotations,
//     content_id,
//     content_type
//   );

//   res.json(result);
// });

// only instructors can delete annotations
router.delete(
  "/annotations/:annotation_id",
  authMiddleware,
  requireInstructor,
  (req, res) => {
    const { annotation_id } = req.params;

    const index = annotations.findIndex((a) => a.id === annotation_id);

    if (index === -1) {
      return res.status(404).json({
        message: "Annotation not found",
      });
    }

    const deleted = annotations.splice(index, 1)[0];

    recordSecurityEvent("ANNOTATION_DELETED", {
      annotation_id,
      deleted_by: req.user.id,
      role: req.user.role,
    });

    res.json({
      message: "Annotation deleted",
      annotation: deleted,
    });
  }
);
// router.delete("/annotations/:id", authMiddleware, requireInstructor, (req, res) => {
//   const deleted = deleteAnnotationById(annotations, req.params.id);

//   if (!deleted) {
//     return res.status(404).json({ message: "Annotation not found" });
//   }

//   recordSecurityEvent("ANNOTATION_DELETED", {
//     annotation_id: req.params.id,
//     deleted_by: req.user.id,
//     role: req.user.role,
//   });

//   res.status(204).send();
// });

module.exports = router;