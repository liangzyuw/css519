const express = require("express");
const router = express.Router();
const { annotations } = require("../models/data");

const authMiddleware = require("../middleware/auth");
const requireInstructor = require("../middleware/requireInstructor");

// only instructors should be allowed to create and delete annotations, but anyone can view them
router.post("/annotations", authMiddleware, requireInstructor, (req, res) => {
  const newAnnotation = {
    id: `ann_${annotations.length + 1}`,
    ...req.body,
    created_at: new Date(),
  };

  annotations.push(newAnnotation);

  res.status(201).json(newAnnotation);
});

// router.delete("/annotations/:id", authMiddleware, requireInstructor, (req, res) => {
//   const { id } = req.params;
//   const index = annotations.findIndex((a) => a.id === id);

//   if (index === -1) {
//     return res.status(404).json({ message: "Annotation not found" });
//   }

//   annotations.splice(index, 1);
//   res.json({ message: "Annotation deleted" });
// });

router.get("/annotations", (req, res) => {
  const { content_id, content_type } = req.query;

  const result = annotations.filter(
    (a) =>
      a.content_id === content_id &&
      a.content_type === content_type
  );

  res.json(result);
});

module.exports = router;