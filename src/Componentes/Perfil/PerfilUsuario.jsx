import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { supabase } from "../../lib/supabase";
import "./PerfilUsuario.css";
import { useNavigate } from "react-router-dom";

export default function PerfilUsuario() {
  const { signOut, loading: authLoading, user, profile, profileLoading, profileError } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    console.log('*** handleSignOut called ***');
    if (authLoading) {
      console.log('*** handleSignOut: Already loading, preventing second call ***');
      return;
    }
    const result = await signOut();
    if (result.success) {
      console.log('Sign out successful, redirecting to login.');
      navigate('/login');
    }
  };

  return (
    <div className="perfil-panel">
      <div className="menu-bar">
        <span>Menú</span>
      </div>

      <div className="perfil-info">
         <div className="titulo-usuario">USUARIO</div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Usuario"
          className="perfil-photo"
        />
        <p>
          {profileLoading ? (
            'Cargando...'
          ) : profileError ? (
            `Error: ${profileError.message}`
          ) : profile ? (
            <>
              <strong>{profile.nombre_usuario || user?.email}</strong>
              <br />
              {profile.nombre_telefono || 'No especificado'}
            </>
          ) : (
            'No se pudo cargar la información del perfil.'
          )}
        </p>
      </div>

      <div className="historial-section">
        <h3>Historial</h3>
        <table className="historial-table">
          <thead>
            <tr>
              <th>Semanas</th>
              <th>Puntajes</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((semana) => (
              <tr key={semana}>
                <td>Semana {semana}</td>
                <td>0000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cerrar-section">
        <button 
          className="cerrar-btn"
          onClick={handleSignOut}
          disabled={authLoading}
        >
          {authLoading ? 'Cerrando Sesion...' : 'Cerrar Sesion'}
        </button>
      </div>

      <div className="footer">@football Fantasy</div>
    </div>
  );
}