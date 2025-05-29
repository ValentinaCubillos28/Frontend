import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { user, loading, checkSession } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    console.log('ProtectedRoute useEffect running (initial check)');
    checkSession();

  }, [checkSession]);

  console.log('ProtectedRoute render - loading:', loading, 'user:', user ? 'exists' : 'null');

  if (loading) {
    console.log('ProtectedRoute: Showing loading spinner.');
    return (
      <div className="loading-container">
        Cargando sesión...
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute: No user found after loading, redirecting to login.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('ProtectedRoute: User exists, rendering protected content.');
  return children;
};

export default ProtectedRoute; 