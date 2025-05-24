import React from 'react';
import './MiEquipo.css';

const equipo = [
  { nombre: "Lionel Messi", equipo: "PSG", promedios: [8.5, 8.9, 9.8, 9.2]},
  { nombre: "Zinedine Zidane", equipo: "Real Madrid", promedios: [8.9, 9.1, 8.7, 8.3] },
  { nombre: "Xavi Hernández", equipo: "Barcelona", promedios: [8.7, 8.9, 8.8, 9.0] },
  { nombre: "Thierry Henry", equipo: "Arsenal", promedios: [8.3, 8.6, 8.2, 8.8] },
  { nombre: "Ronaldinho", equipo: "Barcelona", promedios: [8.8, 8.7, 9.0, 9.1] },
];

export default function MiEquipo() {
  const total = equipo.reduce(
    (sum, j) => sum + j.promedios.reduce((a, b) => a + b, 0) / j.promedios.length,
    0
  ).toFixed(2);

  return (
    <div className="mi-equipo-container">
      <h3 className="titulo">Página 5: Mi Equipo</h3>
      <p className="subtitulo">Estos son los jugadores que has seleccionado para tu equipo.</p>
      <div className="jugadores-grid">
        {equipo.map((j) => (
          <div key={j.nombre} className="jugador-box">
            {j.imagen ? (
              <img src={j.imagen} alt={j.nombre} className="jugador-img" />
            ) : (
              <div className="circle-nombre">{j.nombre.split(" ")[0]}<br />{j.nombre.split(" ")[1]}</div>
            )}
            <p className="nombre">{j.nombre}</p>
            <p className="equipo">{j.equipo}</p>
            <div className="promedios">
              {j.promedios.map((p, i) => (
                <span key={i} className="prom">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="aviso">
        <strong>Aviso:</strong> El Admin ha reemplazado a Lionel Messi por Paulo Dybala en tu equipo debido a lesión.
      </div>
      <div className="puntaje">
        <strong>Puntaje Total: </strong><span className="puntaje-num">{total}</span>
      </div>
    </div>
  );
}
