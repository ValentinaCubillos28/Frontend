import React from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import "./PerfilUsuario.css";

export default function PerfilUsuario() {
  const {
    signOut,
    loading: authLoading,
    user,
    profile,
    profileLoading,
    profileError
  } = useAuthStore();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (authLoading) return;
    const result = await signOut();
    if (result.success) {
      navigate("/login");
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
            "Cargando..."
          ) : profileError ? (
            `Error: ${profileError.message}`
          ) : profile ? (
            <>
              <strong>Usuario:</strong> {profile.nombre_usuario || user?.email}
              <br />
              <strong>Email:</strong> {user?.email}
              <br />
              <strong>Teléfono:</strong> {profile.nombre_telefono || "No especificado"}
            </>
          ) : (
            "No se pudo cargar la información del perfil."
          )}
        </p>
      </div>

      <div className="cerrar-section">
        <button
          className="cerrar-btn"
          onClick={handleSignOut}
          disabled={authLoading}
        >
          {authLoading ? "Cerrando Sesión..." : "Cerrar Sesión"}
        </button>
      </div>

      <div className="footer">@football Fantasy</div>
    </div>
  );
}