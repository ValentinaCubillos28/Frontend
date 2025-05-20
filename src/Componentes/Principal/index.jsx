import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Principal = () => {
  const navigate = useNavigate();

  return (
    <div className="principal-container">
      <header className="principal-header">
        <div className="logo">⚽ ADMIN</div>
        <nav>
          <Link to="/registro">REGISTRARSE</Link>
          <Link to="/login">INICIAR SESIÓN</Link>
          <a href="#">AYUDA</a>
        </nav>
      </header>

      <main className="principal-content">
        <h1>CREA TU EQUIPO DE FUTBOL FANTASY</h1>
        <h1>Y COMPITE</h1>
        <button onClick={() => navigate('/login')}>COMIENZA AHORA</button>
      </main>

      <footer className="principal-footer">
        ©Football Fantasy
      </footer>
    </div>
  );
};

export default Principal;