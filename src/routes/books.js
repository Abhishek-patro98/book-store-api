const express = require('express');
const { cacheMiddleware, setCache } = require('../middleware/cache');
const rbacMiddleware = require('../middleware/rbacMiddleware');

const router = express.Router();

// Mock data and handlers
let books = [{ id: 1, title: "1984", author: "George Orwell" }];

router.post(
  '/books',
  rbacMiddleware(['Admin']),
  (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).json({ message: 'Book created', book });
  }
);

router.get('/books', cacheMiddleware, (req, res) => {
  setCache('books', books);
  res.status(200).json(books);
});

router.put(
  '/books/:id',
  rbacMiddleware(['Admin']),
  (req, res) => {
    const { id } = req.params;
    const updatedBook = req.body;
    books = books.map((book) => (book.id === parseInt(id) ? updatedBook : book));
    res.status(200).json({ message: 'Book updated', updatedBook });
  }
);

router.delete(
  '/books/:id',
  rbacMiddleware(['Admin']),
  (req, res) => {
    const { id } = req.params;
    books = books.filter((book) => book.id !== parseInt(id));
    res.status(200).json({ message: 'Book deleted' });
  }
);

module.exports = router;
