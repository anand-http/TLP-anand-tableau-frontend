// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import DashboardThumbnail from './component/dasboardThumbnail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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

  const handleAuthentication =(status, accessToken, tableauJWTreceived) => {
    setAuthenticated(status);
    setAccessToken(accessToken);
   setTableauJWT(tableauJWTreceived);
  };

  console.log("Tableau JWT in App.js is: ",tableauJWT);
  console.log(` this is access token ${accessToken}`);

  return (

    <>

      {authenticated ? (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<DashboardThumbnail authenticated={authenticated} setAuthenticated={setAuthenticated} />} />


              {/* <Home accessToken={tableauJWT} /> */}
              <Route path="/home" element={<Home  />} />

            </Routes>
          </Router>
        </>
      ) : (
        <>
          <Login onAuthentication={handleAuthentication} />
        </>
      )}

    </>
  );
}

export default App;
