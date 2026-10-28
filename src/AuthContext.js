// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <AuthContext.Provider value={{ email, setEmail, otp, setOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
