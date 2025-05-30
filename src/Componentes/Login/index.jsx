import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './style.css';

const Login = () => {
  console.log('*** Login container component rendered ***');
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="contenedor">
      <header>
        <Link to="/" className="logo">
          <motion.div 
            className="ball"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          />
        </Link>
        <div className="menu">
          <span>AYUDA</span>
          <div className="hamburger">≡</div>
        </div>
      </header>

      <main>
        <div className="form-container">
          {isRegistering ? (
            <RegisterForm />
          ) : (
            <LoginForm />
          )}
        </div>
        <button 
          className="toggle-form-button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </main>

      <footer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ©Football Fantasy
        </motion.div>
      </footer>
    </div>
  );
};

export default Login;
