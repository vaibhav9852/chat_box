import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data if authenticated
    axios.get('http://localhost:8000/api/user')
      .then(response => {
        console.log('response',response)
        setUser(response.data);
      })
      .catch(error => {
        console.error('Not authenticated', error);
      });
  }, []);

  return (
    <div>
      {/* {user ? (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <img src={user.photos[0].value} alt="User Avatar" />
          <p>Email: {user.emails[0].value}</p>
        </div>
      ) : (
        <h1>Please log in.</h1>
      )} */}
      <h3>Dashboard</h3>
    </div>
  );
};

export default Dashboard;
