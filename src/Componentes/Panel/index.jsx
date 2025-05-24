import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Panel = () => {
  const navigate = useNavigate();

  const handleActualizarClick = () => {
    navigate("/puntajes");
  };

  return (
    <div>
      <header className="menu">
        <button className="menu-btn">Menú</button>
      </header>

      <main className="container">
        <section className="panel">
          <h2>PANEL ADMINISTRATIVO</h2>
          <h3>Actualizar puntajes</h3>
          <p>Continúa para actualizar el puntaje de tus jugadores</p>
          <button className="btn" onClick={handleActualizarClick}>
            Actualizar
          </button>
        </section>

        <hr />

        <section className="panel">
          <h3>Reemplazar jugador</h3>
          <div className="replace-row">
            <div className="player">
              <img
                src="JUGADORES Y ESCUDOS/cr7.jpg"
                alt="Jugador que sale"
              />
              <p>Cristiano Ronaldo</p>
            </div>

            <div className="center-btn">
              <button className="btn">Cambiar</button>
            </div>

            <div className="player">
              <img
                src="JUGADORES Y ESCUDOS/iniesta.jpg"
                alt="Jugador que entra"
              />
              <p>Andres Iniesta</p>
            </div>
          </div>
        </section>

        <hr />

        <section className="panel">
          <h3>Ajustar fecha límite</h3>
          <div className="date-section">
            <div className="date-box">
              <p>Día de inicio</p>
              <input type="date" className="date-input" />
            </div>
            <div className="date-box">
              <p>Día de finalización</p>
              <input type="date" className="date-input" />
            </div>
          </div>
          <button className="btn">Guardar cambios</button>
        </section>
      </main>

      <footer className="footer">@football Fantasy</footer>
    </div>
  );
};

export default Panel;
