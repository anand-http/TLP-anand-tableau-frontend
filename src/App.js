// src/App.js
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [tableauJWT, setTableauJWT] = useState(null);

  // Function to set the authentication status and access token
  const handleAuthentication = (status, accessToken, tableauJWTreceived) => {
    setAuthenticated(status);
    setAccessToken(accessToken);
    
    setTableauJWT(tableauJWTreceived);
  };
  console.log(tableauJWT);
  

  return (
    <div className="App">
      {authenticated ? (
        <Home accessToken={tableauJWT} />
      ) : (
        <Login onAuthentication={handleAuthentication} />
      )}
    </div>
  );
}

export default App;
