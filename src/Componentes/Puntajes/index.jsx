import React from "react";
import "./style.css";

const Puntajes = () => {
  const jugadores = [
    { nombre: "Jugador", equipo: "Real" },
    { nombre: "Jugador", equipo: "Barcelona" },
    { nombre: "Jugador", equipo: "PSG" },
    { nombre: "Jugador", equipo: "Barcelona" },
    { nombre: "Jugador", equipo: "Real" },
    { nombre: "Jugador", equipo: "Barcelona" },
    { nombre: "Jugador", equipo: "PSG" },
    { nombre: "Jugador", equipo: "PSG" },
  ];

  return (
    <div>
      <header className="menu">
        <button className="menu-btn">MENU</button>
      </header>

      <main className="container">
        <h2 className="title">PUNTAJES</h2>

        <table className="score-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Equipo</th>
              <th>Puntaje actual</th>
              <th>Fuente</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((jugador, index) => (
              <tr key={index}>
                <td>{jugador.nombre}</td>
                <td>{jugador.equipo}</td>
                <td>
                  <input type="text" defaultValue="45.8" className="score-input" />
                </td>
                {index === 0 && (
                  <td rowSpan={jugadores.length}>"Sofascore"</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn">Actualizar puntajes</button>
      </main>

      <footer className="footer">@football Fantasy</footer>
    </div>
  );
};

export default Puntajes;
