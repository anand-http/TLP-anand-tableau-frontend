// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onAuthentication }) => {
  const [credentials, setCredentials] = useState({
    user: '',
    pwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://3.110.177.174:3500/auth', credentials);
      console.log('Authentication successful', response.data);

      // Call the onAuthentication callback to set authentication status to true
      onAuthentication(true, response.data.accessToken,response.data.tableauJWT );
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">Username:</label>
          <input
            type="text"
            id="user"
            name="user"
            value={credentials.user}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={credentials.pwd}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
