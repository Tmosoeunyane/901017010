// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add new product
router.post('/add', (req, res) => {
  const { name, description, category, price, quantity } = req.body;
  const query = 'INSERT INTO products (name, description, category, price, quantity) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [name, description, category, price, quantity], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Product added successfully' });
  });
});

// Update product details (PUT)
router.put('/update/:id', (req, res) => {
  const { name, description, category, price, quantity } = req.body;
  const productId = req.params.id;
  const query = 'UPDATE products SET name = ?, description = ?, category = ?, price = ?, quantity = ? WHERE id = ?';
  
  db.query(query, [name, description, category, price, quantity, productId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  });
});

// Delete product (DELETE)
router.delete('/delete/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM products WHERE id = ?';
  
  db.query(query, [productId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});

// Get all products (GET)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM products';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
