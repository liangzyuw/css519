const { incrementMetric } = require("../models/metricsStore");

const loginAttempts = new Map();

/**
 * The current implementation for in-memory login rate limiter.
 * Allows MAX_ATTEMPTS login attempts per WINDOW_MS per IP address.
 * In the future, would need Redis or a database for production 
 * deployments with multiple backend instances.
 */

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 5;

function loginRateLimiter(req, res, next) {
  const ip =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "unknown";

  const now = Date.now();

  const existing = loginAttempts.get(ip);

  if (!existing || now > existing.resetTime) {
    loginAttempts.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });

    return next();
  }

  if (existing.count >= MAX_ATTEMPTS) {
    incrementMetric("rate_limited_requests");
    incrementMetric("unauthorized_requests_count");

    const retryAfterSeconds = Math.ceil((existing.resetTime - now) / 1000);

    return res.status(429).json({
      message: "Too many login attempts. Please try again later.",
      retry_after_seconds: retryAfterSeconds,
    });
  }

  existing.count += 1;
  loginAttempts.set(ip, existing);

  next();
}

module.exports = loginRateLimiter;