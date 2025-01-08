const express = require('express');
const bodyParser = require('body-parser');
const rateLimiter = require('./src/middleware/rateLimiter');
const bookRoutes = require('./src/routes/books');

const app = express();

app.use(bodyParser.json());
app.use(rateLimiter);
app.use(bookRoutes);

module.exports = app;
