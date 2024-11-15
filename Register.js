import React, { useState } from 'react';

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();

    // Create new user object with unique ID
    const newUser = {
      ...userDetails,
      id: new Date().getTime(), // Unique ID
    };

    // Save user to local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    // Clear form and show success message
    setUserDetails({ username: '', email: '', password: '' });
    setSuccessMessage('User registered successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
  };

  return (
    <div>
      <h2>Register</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={userDetails.username}
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            required
            minLength={6} // Ensure password is at least 6 characters
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
