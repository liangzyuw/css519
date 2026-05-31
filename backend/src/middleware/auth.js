// backend/src/middleware/auth.js
const jwt = require("jsonwebtoken");
const { users } = require("../models/credentials");
const { incrementMetric, recordSecurityEvent } = require("../models/metricsStore");

// const SECRET = process.env.JWT_SECRET || "dev_secret_key";

// function: authMiddleware
// This middleware function serves as a gatekeeper for protected routes in the backend API.
// It checks for the presence of a valid authentication token in the request headers, verifies it, 
// and ensures that the user associated with the token exists in the system.
// If the token is valid and the user is found, it attaches the user information to the request 
// object and allows the request to proceed to the next middleware or route handler.
// If the token is missing, invalid, or if the user does not exist, it responds with a 
// 401 Unauthorized status, preventing access to protected resources.

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //if not logged in or no token provided, return 401 Unauthorized
  if (!authHeader) {
    incrementMetric("unauthorized_requests_count");

    recordSecurityEvent("UNAUTHORIZED_REQUEST", {
      path: req.originalUrl,
      method: req.method,
      reason: "No token provided",
    });

    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // verify the token using the same secret key that was used to sign it during login
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded contains { id, role } based on how it signed the token in authRoutes.js

    const user = users.find((u) => u.id === decoded.id);
    if (!user) {
      incrementMetric("unauthorized_requests_count");

      recordSecurityEvent("INVALID_USER_TOKEN", {
        path: req.originalUrl,
        method: req.method,
        reason: "Token user not found",
      });

      return res.status(401).json({ message: "Invalid user" });
    }
    
    req.user = user; // attach user to request

    next();
  } catch (err) {
    incrementMetric("unauthorized_requests_count");

    recordSecurityEvent("INVALID_TOKEN", {
      path: req.originalUrl,
      method: req.method,
      reason: "Invalid token",
    });

    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;