import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend API
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (userId) => {
    // API call to delete a user
    console.log('Deleting user with ID:', userId);
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
