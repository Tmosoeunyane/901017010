import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import ProductManagement from './components/ProductManagement';
import Login from './UserManagement/Login';
import Admin from './UserManagement/Admin';
import Register from './UserManagement/Register';
import './App.css';

const App = () => {
  const [view, setView] = useState('dashboard'); // Default view is Dashboard
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: new Date().getTime() },
    ]);
  };

  return (
    <div>
      <h1>Welcome to Wings Cafe Stock Inventory System</h1>
      
      {/* Navigation Buttons */}
      <nav>
        <button onClick={() => setView('dashboard')}>Dashboard</button>
        <button onClick={() => setView('productList')}>Product List</button>
        <button onClick={() => setView('addProduct')}>Add Product</button>
        <button onClick={() => setView('productManagement')}>Product Management</button>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('admin')}>Admin</button>
        <button onClick={() => setView('register')}>Register</button>
      </nav>

      {/* Conditional Rendering */}
      {view === 'dashboard' && <Dashboard />}
      {view === 'productList' && <ProductList products={products} />}
      {view === 'addProduct' && <AddProductForm onAdd={handleAddProduct} />}
      {view === 'productManagement' && <ProductManagement />}
      {view === 'login' && <Login />}
      {view === 'admin' && <Admin />}
      {view === 'register' && <Register />}
    </div>
  );
};

export default App;
