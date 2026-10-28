import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/header';
import Login from './Login';
import Home from './Home';
import DashboardThumbnail from './component/dasboardThumbnail';
import ForgotPassword from './component/forgotPassword';
import OtpScreen from './component/otpScreen';
import { AuthProvider } from './AuthContext';
import NewPassword from './component/NewPassword';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [tableauJWT, setTableauJWT] = useState("");

  // logout




  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedTableauJWT = localStorage.getItem('tableauJWT');

    if (storedAccessToken && storedTableauJWT) {
      setAuthenticated(true);
      setAccessToken(storedAccessToken);
      setTableauJWT(storedTableauJWT);
    }
  }, []);

  // Function to set the authentication status and access token
  const handleAuthentication = (status, accessToken, tableauJWTreceived) => {
    setAuthenticated(status);
    setAccessToken(accessToken);
    setTableauJWT(tableauJWTreceived);
  };

 

  console.log("Tableau JWT in App.js is: ", tableauJWT);
  console.log(`This is access token: ${accessToken}`);

  return (
    <AuthProvider>
      <Router>
        <Header setAuthenticated={setAuthenticated}  />
        <Routes>
          <Route path="/" element={authenticated ? <DashboardThumbnail /> : <Login onAuthentication={handleAuthentication} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-pswd" element={<ForgotPassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/otp-screen' element={<OtpScreen />} />
          <Route path='/new-password' element={<NewPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
