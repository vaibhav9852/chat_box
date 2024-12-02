import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);


    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const userData = queryParams.get('user');
  
      if (userData) {
        setUser(JSON.parse(decodeURIComponent(userData)));
      }
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
      <h4>{JSON.stringify(user)}</h4>
    </div>
  );
};

export default Dashboard;
