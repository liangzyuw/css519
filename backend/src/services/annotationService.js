function getAnnotationsForContent(annotations, contentId, contentType) {
  return annotations.filter(
    (annotation) =>
      annotation.content_id === contentId &&
      annotation.content_type === contentType
  );
}

function createAnnotation(annotations, payload) {
  if (!payload.content_id || !payload.content_type || !payload.body) {
    throw new Error("Missing required annotation fields");
  }

  if (!["section", "problem"].includes(payload.content_type)) {
    throw new Error("Invalid content_type");
  }

  const newAnnotation = {
    id: `ann_${annotations.length + 1}`,
    content_id: payload.content_id,
    content_type: payload.content_type,
    body: payload.body,
    author_id: payload.author_id || null,
    visibility: payload.visibility || "always",
    created_at: new Date(),
  };

  annotations.push(newAnnotation);
  return newAnnotation;
}

function deleteAnnotationById(annotations, annotationId) {
  const index = annotations.findIndex((annotation) => annotation.id === annotationId);

  if (index === -1) {
    return false;
  }

  annotations.splice(index, 1);
  return true;
}

module.exports = {
  getAnnotationsForContent,
  createAnnotation,
  deleteAnnotationById,
};