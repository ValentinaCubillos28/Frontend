import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
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
          <motion.div 
            className="login-box"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <div className="icon-user" />
            <h2>INICIAR SESION</h2>
            <div className="input-container">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Nombre de Usuario" />
            </div>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Contraseña" />
            </div>
            <label className="remember-me">
              <input type="checkbox" />
              Recuérdame
            </label>
            <motion.button 
              className="btn" 
              onClick={handleLogin}
              whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(30,80,30,0.2)' }}
              whileTap={{ scale: 0.97 }}
            >
              INGRESAR
            </motion.button>
            <a href="#" className="link">olvido usuario/contraseña</a>
          </motion.div>

          <motion.div 
            className="register-box"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring', delay: 0.2 }}
          >
            <h2>REGISTRO</h2>
            <div className="input-container">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Nombre de Usuario" />
            </div>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="E-mail" />
            </div>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Contraseña" />
            </div>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Confirme su Contraseña" />
            </div>
            <motion.button 
              className="btn"
              whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(30,80,30,0.2)' }}
              whileTap={{ scale: 0.97 }}
            >
              INGRESAR
            </motion.button>
          </motion.div>
        </div>
      </main>

      <footer>
        ©Football Fantasy
      </footer>
    </div>
  );
};

export default Login;
