import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'; // Import CSS file for styling

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await axios.get('https://your-api-endpoint.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    loadProducts();
  }, []);

  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Stock Levels',
        data: products.map((product) => product.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to adjust dynamically
    indexAxis: 'y', // Rotate the chart so that labels are on the Y-axis
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Stock Levels',
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
