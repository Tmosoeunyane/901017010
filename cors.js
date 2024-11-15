const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;  // or any other port you'd like

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Example route
app.get('/api/products', (req, res) => {
  // You would typically get the products from your database
  res.json([
    { id: 1, name: 'Coffee', price: 2.5 },
    { id: 2, name: 'Tea', price: 2.0 },
  ]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
