import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if token exists, false otherwise
  };

  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;