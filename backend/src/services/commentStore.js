const fs = require("fs");
const path = require("path");

const COMMENTS_FILE = path.join(__dirname, "../../data/comments.json");

function ensureCommentsFileExists() {
  const dir = path.dirname(COMMENTS_FILE);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(COMMENTS_FILE)) {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify([], null, 2));
  }
}

function readComments() {
  ensureCommentsFileExists();

  const raw = fs.readFileSync(COMMENTS_FILE, "utf-8");

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse comments.json:", err);
    return [];
  }
}

function writeComments(comments) {
  ensureCommentsFileExists();

  fs.writeFileSync(
    COMMENTS_FILE,
    JSON.stringify(comments, null, 2)
  );
}

function getCommentsByContent(contentId, contentType) {
  const comments = readComments();

  return comments.filter(
    (comment) =>
      comment.content_id === contentId &&
      comment.content_type === contentType
  );
}

function createComment({ content_id, content_type, author_id, body }) {
  const comments = readComments();

  const newComment = {
    id: `comment_${Date.now()}`,
    content_id,
    content_type,
    author_id,
    body,
    created_at: new Date().toISOString(),
  };

  comments.push(newComment);
  writeComments(comments);

  return newComment;
}

module.exports = {
  readComments,
  writeComments,
  getCommentsByContent,
  createComment,
};