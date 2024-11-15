// routes/stock.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Record stock transaction (add or sell)
router.post('/transaction', (req, res) => {
  const { product_id, quantity, transaction_type } = req.body;

  // Ensure the transaction type is valid
  if (!['add', 'sell'].includes(transaction_type)) {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }

  // Adjust product quantity based on transaction type
  const query = 'SELECT * FROM products WHERE id = ?';
  
  db.query(query, [product_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const product = results[0];
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    let newQuantity = product.quantity;
    
    if (transaction_type === 'add') {
      newQuantity += quantity;
    } else if (transaction_type === 'sell' && product.quantity >= quantity) {
      newQuantity -= quantity;
    } else {
      return res.status(400).json({ error: 'Not enough stock to sell' });
    }

    const updateProductQuery = 'UPDATE products SET quantity = ? WHERE id = ?';
    db.query(updateProductQuery, [newQuantity, product_id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const insertTransactionQuery = 'INSERT INTO stock_transactions (product_id, quantity, transaction_type) VALUES (?, ?, ?)';
      db.query(insertTransactionQuery, [product_id, quantity, transaction_type], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Stock transaction recorded' });
      });
    });
  });
});

module.exports = router;
