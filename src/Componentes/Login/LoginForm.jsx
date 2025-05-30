import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaEnvelope, FaTimes } from 'react-icons/fa'; // Importar solo los iconos necesarios para Login
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../lib/schemas'; // Importar solo el esquema de login
import { useAuthStore } from '../../store/authStore';
import './style.css'; // Importar el archivo CSS

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn, error } = useAuthStore(); // No necesitamos 'loading' global aquí

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado de submitting local

  console.log('LoginForm component rendered. Local submitting state:', isSubmitting);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  console.log('Current login validation errors:', loginErrors); // Mover este log aquí, después de useForm

  const onLogin = async (data) => {
    console.log('*** onLogin function called ***', data);
    console.log('onLogin called with data:', data);
    setIsSubmitting(true); // Activar estado de submitting
    try {
      const result = await signIn(data.email, data.password);
      if (result.success) {
        navigate('/Inicio');
      }
    } finally {
      setIsSubmitting(false); // Desactivar estado de submitting al finalizar
    }
  };

  return (
    <motion.div 
      className="login-box"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring' }}
    >
      <motion.div 
        className="icon-user"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <h2>INICIAR SESION</h2>
      <form onSubmit={handleSubmitLogin(onLogin)}>
        <div className="input-container">
          <FaEnvelope className="input-icon" />
          <input 
            type="email" 
            placeholder="Email"
            {...registerLogin('email')}
            className={loginErrors.email ? 'error' : ''}
          />
          <AnimatePresence>
            {loginErrors.email && (
              <motion.div 
                className="error-icon"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <FaTimes />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {loginErrors.email && (
          <span className="error-message">{loginErrors.email.message}</span>
        )}

        <div className="input-container">
          <FaLock className="input-icon" />
          <input 
            type="password" 
            placeholder="Contraseña"
            {...registerLogin('password')}
            className={loginErrors.password ? 'error' : ''}
          />
          <AnimatePresence>
            {loginErrors.password && (
              <motion.div 
                className="error-icon"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <FaTimes />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {loginErrors.password && (
          <span className="error-message">{loginErrors.password.message}</span>
        )}

        <label className="remember-me">
          <input type="checkbox" />
          Recuérdame
        </label>

        <motion.button 
          type="submit"
          className="btn" 
          whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(30,80,30,0.2)' }}
          whileTap={{ scale: 0.97 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'INGRESANDO...' : 'INGRESAR'}
        </motion.button>

        {error && <span className="error-message">{error}</span>}
        
        <a href="#" className="link">olvido usuario/contraseña</a>
      </form>
    </motion.div>
  );
};

export default LoginForm; 