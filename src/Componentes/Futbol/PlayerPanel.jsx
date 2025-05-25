import React, { useState } from "react";
import "./PlayerPanel.css";

export default function PlayerPanel() {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="player-panel">
      <div className="menu-bar">
        MENÚ
      </div>
      <div className="content">
        <div className="player-info">
          <div class="titulo-usuario">PANEL DE JUGADOR</div>
          <br></br>
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Jugador"
            className="player-photo"
          />
          <h3>henry</h3>
          <p className="player-name">Nombre del equipo</p>
        </div>
        <div className="scores-section">
          <h3>Últimas puntuaciones</h3>
          <div className="scores">
            {[0, 0, 0, 0, 0].map((score, i) => (
              <div className="score" key={i}>
                <div className="circle"></div>
                <span>0000</span>
              </div>
            ))}
          </div>
        </div>
        <div className="favorite-section">
          <h3>Agregar a favoritos</h3>
          <div className="stars">
            <div
              className={`star ${isFavorite ? "active" : ""}`}
              onClick={toggleFavorite}
            >
              ★
            </div>
            <div className="star">★</div>
          </div>
        </div>
      </div>
      <div className="footer">@Football Fantasy</div>
    </div>
  );
}