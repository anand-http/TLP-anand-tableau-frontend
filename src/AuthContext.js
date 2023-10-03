// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [authenticatedState, setAuthenticatedState] = useState(false);

  return (
    <AuthContext.Provider value={{ email, setEmail, otp, setOtp ,authenticatedState, setAuthenticatedState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
