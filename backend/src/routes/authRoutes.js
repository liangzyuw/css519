const express = require("express");
const router = express.Router();
const { users } = require("../models/credentials");

// POST /auth/login
router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // fake token (for now)
  const token = Buffer.from(`${user.id}:${user.email}`).toString("base64");

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = router;