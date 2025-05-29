import React from "react";
import { useAuthStore } from "../../store/authStore";
import "./PerfilUsuario.css";
import { useNavigate } from "react-router-dom";

export default function PerfilUsuario() {
  const { signOut, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    console.log('*** handleSignOut called ***');
    if (loading) {
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
          <strong>Nombre</strong>
          <br />
          Nombre telefono
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
          disabled={loading}
        >
          {loading ? 'Cerrando Sesion...' : 'Cerrar Sesion'}
        </button>
      </div>

      <div className="footer">@football Fantasy</div>
    </div>
  );
}