Setup Instructions:

1.Clone the repository and navigate to the project directory.

2. Install dependencies: npm install.

3:Start Redis: docker run --name redis -p 6379:6379 -d redis

4.Start the server: npm start.

Feature Explanation:
Rate Limiting: Limits each user to 10 requests/minute using express-rate-limit.

Caching: Caches GET /books responses for 60 seconds using Redis.

RBAC: Protects endpoints based on roles passed in headers.

Testing:
Run tests: npm test.
