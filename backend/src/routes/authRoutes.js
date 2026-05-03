const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { users } = require("../models/credentials");

const SECRET = process.env.JWT_SECRET;

// POST /auth/login
router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // fake token
  // const token = Buffer.from(`${user.id}:${user.email}`).toString("base64");
  
  // use JWT for token generation for more security and is more standard for auth
  const token = jwt.sign(
    { 
      id: user.id,
      role: user.role, // include role in token payload for authorization checks in protected routes
    }, 
    SECRET, 
    { expiresIn: "1h" }
  );

  res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = router;