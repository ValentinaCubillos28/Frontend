import React from 'react';
import './Ranking.css';

const equipos = [
  { nombre: "Los Galácticos", puntos: 1250, variacion: 25, imagen: "los_galacticos.png" },
  { nombre: "Los Invencibles", puntos: 1200, variacion: -10, imagen: "los_invencibles.png" },
  { nombre: "Los Titanes", puntos: 1180, variacion: 15, imagen: "los_titanes.png" },
  { nombre: "Los Gladiadores", puntos: 1150, variacion: 5, imagen: "los_gladiadores.png" },
  { nombre: "Los Leones", puntos: 1120, variacion: 30, imagen: "los_leones.png" },
  { nombre: "Los Fénix", puntos: 1100, variacion: -5, imagen: "los_fenix.png" },
  { nombre: "Los Guerreros", puntos: 1080, variacion: 10, imagen: "los_guerreros.png" },
  { nombre: "Los Reyes", puntos: 1050, variacion: 20, imagen: "los_reyes.png" },
  { nombre: "Los Cracks", puntos: 1030, variacion: -12, imagen: "los_cracks.png" },
  { nombre: "Los Ases", puntos: 1000, variacion: 8, imagen: "los_ases.png" },
];

export default function Ranking() {
  return (
    <div className="ranking-container">
      <h2>Página 6: Ranking de Usuarios</h2>
      <p>Tabla de posiciones de los 10 mejores usuarios.</p>

      <div className="ranking-list">
        {equipos.map((equipo, index) => (
          <div key={index} className={`ranking-item ${index === 0 ? 'top-team' : ''}`}>
            <img src={`/img/${equipo.imagen}`} alt={equipo.nombre} className="team-icon" />
            <div className="ranking-info">
              <strong>{equipo.nombre}</strong>
              <span>{equipo.puntos} Pts</span>
            </div>
            <div className={`ranking-change ${equipo.variacion >= 0 ? 'up' : 'down'}`}>
              {equipo.variacion >= 0 ? `▲ ${equipo.variacion}` : `▼ ${Math.abs(equipo.variacion)}`}
            </div>
          </div>
        ))}
      </div>

      <footer className="ranking-footer">
        <em>La gloria es para quien se atreve a ganarla.</em>
      </footer>
    </div>
  );
}