import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './style.css';

const Login = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/Inicio'); 
  };

  return (
    <div className="contenedor">
      <header>
        <Link to="/" className="logo">
          <div className="ball" />
        </Link>
        <div className="menu">
          <span>AYUDA</span>
          <div className="hamburger">≡</div>
        </div>
      </header>

      <main>
        <div className="form-container">
          <div className="login-box">
            <div className="icon-user" />
            <h2>INICIAR SESION</h2>
            <input type="text" placeholder="Nombre de Usuario" />
            <input type="password" placeholder="Contraseña" />
            <label className="remember-me">
              <input type="checkbox" />
              Recuérdame
            </label>
            <button className="btn" onClick={handleLogin}>INGRESAR</button>
            <a href="#" className="link">olvido usuario/contraseña</a>
          </div>

          <div className="register-box">
            <h2>REGISTRO</h2>
            <input type="text" placeholder="Nombre de Usuario" />
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Contraseña" />
            <input type="password" placeholder="Confirme su Contraseña" />
            <button className="btn">INGRESAR</button>
          </div>
        </div>
      </main>

      <footer>
        ©Football Fantasy
      </footer>
    </div>
  );
};

export default Login;
