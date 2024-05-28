import React, { useEffect, useState } from 'react';
import './App.css';

const Dashboard = () => {
  const  [username, setUsername] = useState('');

  useEffect(() => {
    // Load logged-in user's username from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard, {username}!</h2>
    </div>
  );
};

export default Dashboard;
