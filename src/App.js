import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import Header from './component/header';
import Login from './Login';
import Home from './Home';
import DashboardThumbnail from './component/dasboardThumbnail';
import ForgotPassword from './component/forgotPassword';
import OtpScreen from './component/otpScreen';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [tableauJWT, setTableauJWT] = useState("");

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

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tableauJWT');

    setAuthenticated(false);

    window.location.href = '/login';
  };

  console.log("Tableau JWT in App.js is: ", tableauJWT);
  console.log(`This is access token: ${accessToken}`);

  return (
    <Router>
      <Header setAuthenticated={setAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={authenticated ? <DashboardThumbnail /> : <Login onAuthentication={handleAuthentication} />} />
        <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/pswd" element={<ForgotPassword />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/otp-screen' element={<OtpScreen/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
