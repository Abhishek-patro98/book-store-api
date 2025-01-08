const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each user to 10 requests per window
  keyGenerator: (req) => req.headers['x-user-id'], // Rate limit per userId
  message: "Too many requests. Please try again after a minute.",
});

module.exports = rateLimiter;
