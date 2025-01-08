const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error('Redis Client Error', err));
client.connect(); // Ensure the client connects

// Cache middleware to check the cache first
const cacheMiddleware = async (req, res, next) => {
  const key = 'books';
  try {
    const data = await client.get(key);
    if (data) {
      return res.status(200).json(JSON.parse(data)); // Cache hit
    }
    next(); // Cache miss, continue to the next middleware
  } catch (err) {
    console.error('Error in cacheMiddleware:', err);
    next(); // Proceed if there's an error with Redis
  }
};

// Set cache with expiry time (60 seconds)
const setCache = async (key, data) => {
  try {
    await client.setEx(key, 60, JSON.stringify(data)); // Expiry time: 60 seconds
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

module.exports = { cacheMiddleware, setCache };
