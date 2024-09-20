import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // Replace with actual authentication logic

  return token ? (
    <div className="container mt-5">
      <h2>Protected Content</h2>
      {/* Add your protected content here */}
    </div>
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
};

export default ProtectedRoute;
