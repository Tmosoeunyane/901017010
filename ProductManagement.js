import React, { useState } from 'react';

const ProductManagement = ({ onProductAdded }) => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });

  const handleAddProduct = () => {
    const newProduct = {
      ...productDetails,
      id: new Date().getTime(), // Unique ID
      price: parseFloat(productDetails.price) || 0, // Ensure price is a number
      quantity: parseInt(productDetails.quantity, 10) || 0, // Ensure quantity is an integer
    };

    // Load existing products from local storage
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = [...existingProducts, newProduct];

    // Save updated products to local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Clear form after adding the product
    setProductDetails({
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
    });

    // Trigger a callback to update the product list (if provided)
    if (onProductAdded) {
      onProductAdded();
    }

    console.log('Product added:', newProduct);
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
      >
        <input
          type="text"
          placeholder="Product Name"
          value={productDetails.name}
          onChange={(e) =>
            setProductDetails({ ...productDetails, name: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Description"
          value={productDetails.description}
          onChange={(e) =>
            setProductDetails({ ...productDetails, description: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={productDetails.category}
          onChange={(e) =>
            setProductDetails({ ...productDetails, category: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={productDetails.price}
          onChange={(e) =>
            setProductDetails({ ...productDetails, price: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={productDetails.quantity}
          onChange={(e) =>
            setProductDetails({ ...productDetails, quantity: e.target.value })
          }
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductManagement;
