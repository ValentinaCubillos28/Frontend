import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlayerPanel.css";

export default function PlayerPanel() {
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener datos del jugador desde el state
  const jugador = location.state?.jugador || {};
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    // Guardar/quitar de favoritos en localStorage
    const favoritos = JSON.parse(localStorage.getItem('jugadoresFavoritos') || '[]');
    if (isFavorite) {
      // Quitar de favoritos
      const nuevosFavoritos = favoritos.filter(fav => fav.id !== jugador.id);
      localStorage.setItem('jugadoresFavoritos', JSON.stringify(nuevosFavoritos));
    } else {
      // Agregar a favoritos
      if (!favoritos.find(fav => fav.id === jugador.id)) {
        favoritos.push(jugador);
        localStorage.setItem('jugadoresFavoritos', JSON.stringify(nuevosFavoritos));
      }
    }
  };

  // Verificar si ya está en favoritos al cargar
  React.useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem('jugadoresFavoritos') || '[]');
    setIsFavorite(favoritos.some(fav => fav.id === jugador.id));
  }, [jugador.id]);

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 'N/A';
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="player-panel">
      <div className="menu-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← VOLVER
        </button>
        <span>PANEL DE JUGADOR</span>
      </div>
      
      <div className="content">
        <div className="player-header">
          <div className="player-photo-section">
            <img
              src={jugador.imagen || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              alt={jugador.nombre || "Jugador"}
              className="player-photo"
              onError={(e) => {
                e.target.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
              }}
            />
            <div className="favorite-section">
              <div
                className={`star ${isFavorite ? "active" : ""}`}
                onClick={toggleFavorite}
                title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                ★
              </div>
            </div>
          </div>
          
          <div className="player-basic-info">
            <h1 className="player-name">{jugador.nombre || "Nombre no disponible"}</h1>
            <div className="player-details">
              <div className="detail-item">
                <span className="label">Equipo:</span>
                <span className="value">{jugador.equipo || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">Posición:</span>
                <span className="value">{jugador.posicion || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">Nacionalidad:</span>
                <span className="value">{jugador.nacionalidad || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">Edad:</span>
                <span className="value">{calcularEdad(jugador.fechaNacimiento)} años</span>
              </div>
            </div>
          </div>
        </div>

        <div className="player-stats">
          <h3>Información Física</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{jugador.altura || "N/A"}</div>
              <div className="stat-label">Altura</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{jugador.peso || "N/A"}</div>
              <div className="stat-label">Peso</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{formatearFecha(jugador.fechaNacimiento)}</div>
              <div className="stat-label">Fecha de Nacimiento</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{jugador.goles || "0"}</div>
              <div className="stat-label">Goles</div>
            </div>
          </div>
        </div>

        {jugador.descripcion && (
          <div className="player-biography">
            <h3>Biografía</h3>
            <p className="biography-text">
              {jugador.descripcion.length > 300 
                ? `${jugador.descripcion.substring(0, 300)}...` 
                : jugador.descripcion
              }
            </p>
          </div>
        )}

        <div className="social-links">
          <h3>Redes Sociales</h3>
          <div className="social-buttons">
            {jugador.facebook && (
              <a 
                href={`https://${jugador.facebook}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn facebook"
              >
                📘 Facebook
              </a>
            )}
            {jugador.twitter && (
              <a 
                href={`https://${jugador.twitter}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn twitter"
              >
                🐦 Twitter
              </a>
            )}
            {jugador.instagram && (
              <a 
                href={`https://${jugador.instagram}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn instagram"
              >
                📷 Instagram
              </a>
            )}
          </div>
        </div>

        <div className="career-info">
          <h3>Información de Carrera</h3>
          <div className="career-grid">
            <div className="career-item">
              <span className="career-label">Deporte:</span>
              <span className="career-value">{jugador.deporte || "Fútbol"}</span>
            </div>
            <div className="career-item">
              <span className="career-label">ID del Jugador:</span>
              <span className="career-value">{jugador.id || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer">@Football Fantasy - {jugador.nombre}</div>
    </div>
  );
}