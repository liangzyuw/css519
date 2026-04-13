const express = require("express");
const router = express.Router();
const { annotations } = require("../models/data");

router.post("/annotations", (req, res) => {
  const newAnnotation = {
    id: `ann_${annotations.length + 1}`,
    ...req.body,
    created_at: new Date(),
  };

  annotations.push(newAnnotation);

  res.status(201).json(newAnnotation);
});

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