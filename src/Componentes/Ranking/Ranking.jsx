import React, { useEffect, useState } from "react";
import "./Ranking.css";

const equipos = [
  "Barcelona", "Real Madrid", "Arsenal", "Manchester United",
  "Juventus", "Bayern Munich", "PSG", "Chelsea", "Liverpool", "Inter"
];

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRanking() {
      let jugadores = [];

      for (const equipo of equipos) {
        try {
          const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=${encodeURIComponent(equipo)}`);
          const data = await res.json();
          if (data.player) {
            // Selecciona un jugador aleatorio del equipo
            const jugador = data.player[Math.floor(Math.random() * data.player.length)];
            jugadores.push({
              nombre: jugador.strPlayer,
              imagen: jugador.strCutout || jugador.strThumb || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
              equipo,
              puntos: Math.floor(Math.random() * 1500), // Puntaje aleatorio
              variacion: Math.floor(Math.random() * 51) - 25 // Entre -25 y +25
            });
          }
        } catch (error) {
          console.error("Error al obtener datos de la API", error);
        }
      }

      // Ordenar por puntaje
      jugadores.sort((a, b) => b.puntos - a.puntos);
      setRanking(jugadores.slice(0, 10)); // Solo top 10
      setLoading(false);
    }

    fetchRanking();
  }, []);

  if (loading) return <div className="ranking-container">Cargando ranking...</div>;

  return (
    <div className="ranking-container">
      <h2>Ranking de Jugadores</h2>
      <p>Top 10 jugadores aleatorios por equipo con puntajes ficticios.</p>

      <div className="ranking-list">
        {ranking.map((jugador, index) => (
          <div key={index} className={`ranking-item ${index === 0 ? 'top-team' : ''}`}>
            <img src={jugador.imagen} alt={jugador.nombre} className="team-icon" />
            <div className="ranking-info">
              <strong>{jugador.nombre}</strong> <br />
              <small>{jugador.equipo}</small>
              <span>{jugador.puntos} Pts</span>
            </div>
            <div className={`ranking-change ${jugador.variacion >= 0 ? 'up' : 'down'}`}>
              {jugador.variacion >= 0 ? `▲ ${jugador.variacion}` : `▼ ${Math.abs(jugador.variacion)}`}
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