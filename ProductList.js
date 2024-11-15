import React, { useEffect, useState } from 'react';
import './ProductList.css'; // Import the CSS file

const ProductList = ({ onEdit, refresh }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    };
    loadProducts();
  }, [refresh]);

  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Product List</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <span className="product-name">{product.name}</span> - 
            <span className="product-quantity">Quantity: {product.quantity}</span>
            <div className="product-actions">
              <button className="edit-btn" onClick={() => onEdit(product)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
