// Import the mysql2 package
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',       // MySQL host (e.g., 'localhost')
  user: 'root',            // MySQL username (replace with your MySQL user)
  password: '',            // MySQL password (replace with your password)
  database: 'wings_cafe_inventory' // Your database name
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Example: Update a product using `name`
const updatedProduct = {
  price: 29.99,
  stock_count: 100
};

const productName = 'Sample Product'; // Replace with the actual product name you want to update

// Perform the update operation
connection.query(
  'UPDATE products SET ? WHERE name = ?',
  [updatedProduct, productName],
  (err, results) => {
    if (err) {
      console.error('Error updating product:', err);
    } else {
      console.log('Updated product:', results);
    }
  }
);

// Close the database connection
connection.end();
