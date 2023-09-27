// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import loginImage from './assets/loginImage.png';
import {NavLink } from 'react-router-dom';

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
      const response = await axios.post('http://15.206.174.83:3500/auth', credentials);
      // const response = await axios.post('http://localhost:3500/auth', credentials);
      console.log('Authentication successful', response.data);

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('tableauJWT', response.data.tableauJWT);

      // Call the onAuthentication callback to set authentication status to true
      onAuthentication(true, response.data.accessToken, response.data.tableauJWT);
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };

  return (
    <div className='login-background'>


      <div className='login-main-container'>

        <div className="login-main">

          <h1>Login</h1>

          <form onSubmit={handleSubmit}>

            <div className='user'>

              <label htmlFor="user">Employee ID </label>
              <br />

              <input
                type="text"
                id="user"
                name="user"
                value={credentials.user}
                onChange={handleChange}
                placeholder='mohit123'
              />

            </div>

            <div className='password'>
              <label htmlFor="pwd">Password</label>
              <br />
              <input
                placeholder='mohit@123'
                type="password"
                id="pwd"
                name="pwd"
                value={credentials.pwd}
                onChange={handleChange}
              />
            </div>


            <div className="forgot-password">
              <NavLink className='forgotPswdLink' to='/pswd'>Forgot Password</NavLink>
            </div>




            <div className="login-btn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>

        <div className="login-right-img">
          <img width="100vw" height="100vh" src={loginImage} alt="LoginImage" />
        </div>

      </div>

    </div>
  );
};

export default Login;
