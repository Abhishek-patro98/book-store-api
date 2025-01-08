const app = require('./app');
const dotenv = require('dotenv');
const redis = require('redis');

dotenv.config();

const PORT = process.env.PORT || 3000;

// Start Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
client.on('error', (err) => console.error('Redis Error:', err));
client.on('connect', () => console.log('Redis Connected'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
