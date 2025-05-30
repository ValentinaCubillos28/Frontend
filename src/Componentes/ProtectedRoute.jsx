import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  // Usar selectores para asegurar la suscripción a partes específicas del estado
  const user = useAuthStore(state => state.user); // Seleccionar solo el estado user
  const loading = useAuthStore(state => state.loading); // Seleccionar solo el estado loading
  const checkSession = useAuthStore(state => state.checkSession); // Seleccionar la función

  const location = useLocation();

  // Log para ver cuando el estado del usuario cambia
  React.useEffect(() => {
    console.log('ProtectedRoute: User state changed to:', user ? 'exists' : 'null');
  }, [user]);

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