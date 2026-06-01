// backend/src/middleware/requireInstructor.js
const {
  incrementMetric,
  recordSecurityEvent,
} = require("../models/metricsStore");

function requireInstructor(req, res, next) {
  if (!req.user || req.user.role !== "instructor") {
    incrementMetric("unauthorized_requests_count");

    recordSecurityEvent("FORBIDDEN_INSTRUCTOR_ACTION", {
      path: req.originalUrl,
      method: req.method,
      user_id: req.user?.id || "unknown",
      role: req.user?.role || "unknown",
      reason: "Instructor role required",
    });

    return res.status(403).json({
      message: "Instructor role required",
    });
  }

  // If the user is an instructor, this function is called to pass control to 
  // the next middleware or final route handler

  next();
}

// const requireInstructor = (req, res, next) => {
//   if (req.user.role !== "instructor") {
//     return res.status(403).json({ message: "Access denied: Instructors only" });
//   }
//   // If the user is an instructor, this function is called to pass control to 
//   // the next middleware or final route handler
//   next();
// };

module.exports = requireInstructor;

// This Express.js middleware function checks if the authenticated user has the role of "instructor" before allowing access to certain routes. 
// If the user is not an instructor, it responds with a 403 Forbidden status and an appropriate message. 
// If the user is an instructor, it calls next() to proceed to the next middleware or route handler.
