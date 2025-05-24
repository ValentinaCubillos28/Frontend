import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    if (section === 'Jugadores') {
      navigate('/Jugadores');
    } else if (section === 'Ranking') {
      navigate('/Ranking');
    } else if (section === 'MiEquipo') {
      navigate('/MiEquipo');
    }
  };

  const profileImageSvg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRTBFMEUwIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjIwIiBmaWxsPSIjNjY2Ii8+CjxwYXRoIGQ9Ik0zMCA5MEMzMCA3NyA0NCA2NSA2MCA2NVM5MCA3NyA5MCA5MFoiIGZpbGw9IiM2NjYiLz4KPC9zdmc+";
  const playerImageSvg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRDBEMEQwIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjEyIiBmaWxsPSIjOTk5Ii8+CjxwYXRoIGQ9Ik0yMCA2MEMyMCA1MSAyOS4xIDQ0IDQwIDQ0UzYwIDUxIDYwIDYwWiIgZmlsbD0iIzk5OSIvPgo8L3N2Zz4=";
  const femalePlayerImageSvg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRDBEMUQwIi8+CjxwYXRoIGQ9Ik00MCAyMEM0NC40IDIwIDQ4IDIzLjYgNDggMjhTNDQuNCAzNiA0MCAzNlMzMiAzMi40IDMyIDI4UzM1LjYgMjAgNDAgMjBaIiBmaWxsPSIjOTk5Ii8+CjxwYXRoIGQ9Ik0yMCA2MEMyMCA1MS4yIDI5LjEgNDQgNDAgNDRTNjAgNTEuMiA2MCA2MFoiIGZpbGw9IiM5OTkiLz4KPC9zdmc+";

  const handlePlayerClick = (player) => {
    console.log(`Clicked on player ${player}`);
  };

  return (
    <div className="inicio">
      {/* Header */}
      <header className="inicio-header">
        <span>MI PERFIL</span>
        <span className="header-spacing">CONFIGURACIÓN</span>
        <span>AYUDA</span>
      </header>

      {/* Contenido principal */}
      <div className="main-content">
        <h1 className="welcome-title">BIENVENIDO XXXXX</h1>

        {/* Perfil */}
        <div className="profile">
          <img src={profileImageSvg} alt="Perfil" className="profile-img" />
          <p className="profile-text points">Tus puntos acumulados: XXXXXX</p>
          <p className="profile-text reminder">RECUERDA HACER CAMBIOS ANTES DE XX-XX-XXXX</p>
        </div>

        {/* Imágenes placeholder */}
        <div className="placeholder-images">
          <div className="placeholder-box">Imagen 1</div>
          <div className="placeholder-box">Imagen 2</div>
          <div className="placeholder-box">Imagen 3</div>
        </div>

        {/* Secciones */}
        <div className="sections">
          <div className="section">
            <button className="section-button" onClick={() => handleSectionClick('MiEquipo')}>
              MI EQUIPO
            </button>
          </div>

          <div className="section">
            <button className="section-button" onClick={() => handleSectionClick('Ranking')}>
              RANKING
            </button>
          </div>

          <div className="section">
            <button className="section-button" onClick={() => handleSectionClick('Jugadores')}>
              JUGADORES
            </button>
          </div>
        </div>

        {/* Jugadores destacados */}
        <div className="jugadores-destacados">
          <div className="jugador-card">
            <img src={playerImageSvg} alt="Jugador" className="jugador-img" />
            <button className="jugador-button" onClick={() => handlePlayerClick(1)}>Button</button>
          </div>
          <div className="jugador-card">
            <img src={playerImageSvg} alt="Jugador" className="jugador-img" />
            <button className="jugador-button" onClick={() => handlePlayerClick(2)}>Button</button>
          </div>
          <div className="jugador-card">
            <img src={femalePlayerImageSvg} alt="Jugador" className="jugador-img" />
            <button className="jugador-button" onClick={() => handlePlayerClick(3)}>Button</button>
          </div>
        </div>
        <br />
      </div>

      {/* Footer */}
      <footer className="inicio-footer">©Football Fantasy</footer>
    </div>
  );
};

export default Inicio;
