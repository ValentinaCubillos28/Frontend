import React, { useEffect, useState } from 'react';
import './MiEquipo.css';

export default function MiEquipo() {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('miEquipo')) || [];

    // Asigna promedios aleatorios si no existen
    const equipoConPromedios = datosGuardados.map(j => ({
      ...j,
      promedios: [
        (Math.random() * 2 + 7).toFixed(1),
        (Math.random() * 2 + 7).toFixed(1),
        (Math.random() * 2 + 7).toFixed(1),
        (Math.random() * 2 + 7).toFixed(1)
      ]
    }));

    setEquipo(equipoConPromedios);
  }, []);

  const total = equipo.length > 0
    ? (
      equipo.reduce(
        (sum, j) =>
          sum +
          j.promedios.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) /
            j.promedios.length,
        0
      ) / equipo.length
    ).toFixed(2)
    : 0;

  return (
    <div className="mi-equipo-container">
      <h3 className="titulo">Mi Equipo</h3>
      <p className="subtitulo">Estos son los jugadores que has seleccionado para tu equipo.</p>

      <div className="jugadores-grid">
        {equipo.map((j) => (
          <div key={j.id || j.nombre} className="jugador-box">
            {j.imagen ? (
              <img src={j.imagen} alt={j.nombre} className="jugador-img" />
            ) : (
              <div className="circle-nombre">
                {j.nombre.split(" ")[0]}<br />{j.nombre.split(" ")[1] || ''}
              </div>
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

      <div className="puntaje">
        <strong>Puntaje Total: </strong>
        <span className="puntaje-num">{total}</span>
      </div>
    </div>
  );
}
