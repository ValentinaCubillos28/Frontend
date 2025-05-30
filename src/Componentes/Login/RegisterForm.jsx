import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaTimes } from 'react-icons/fa'; // Importar solo los iconos necesarios para Register
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../lib/schemas'; // Importar solo el esquema de registro
import { useAuthStore } from '../../store/authStore';
import './style.css'; // Importar el archivo CSS

const RegisterForm = () => {
  const navigate = useNavigate();
  const { signUp, error } = useAuthStore(); // No necesitamos 'loading' global aquí

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado de submitting local

  console.log('RegisterForm component rendered. Local submitting state:', isSubmitting);

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  console.log('Current registration validation errors:', registerErrors); // Mover este log aquí, después de useForm

  const onRegister = async (data) => {
    console.log('onRegister called with data:', data);
    setIsSubmitting(true); // Activar estado de submitting
    try {
      const result = await signUp(data.email, data.password, data.username);
      if (result.success) {
        if (result.needsEmailVerification) {
          navigate('/verificar-email');
        } else {
          navigate('/Inicio'); // Redirigir al inicio si no requiere verificación (opcional, depende de tu flujo)
        }
      }
    } finally {
      setIsSubmitting(false); // Desactivar estado de submitting al finalizar
    }
  };

  return (
    <motion.div 
      className="register-box"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', delay: 0.2 }}
    >
      <h2>REGISTRO</h2>
      <form onSubmit={handleSubmitRegister(onRegister)}>
        <div className="input-container">
          <FaUser className="input-icon" />
          <input 
            type="text" 
            placeholder="Nombre de Usuario"
            {...registerRegister('username')}
            className={registerErrors.username ? 'error' : ''}
          />
          <AnimatePresence>
            {registerErrors.username && (
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
        {registerErrors.username && (
          <span className="error-message">{registerErrors.username.message}</span>
        )}

        <div className="input-container">
          <FaEnvelope className="input-icon" />
          <input 
            type="email" 
            placeholder="E-mail"
            {...registerRegister('email')}
            className={registerErrors.email ? 'error' : ''}
          />
          <AnimatePresence>
            {registerErrors.email && (
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
        {registerErrors.email && (
          <span className="error-message">{registerErrors.email.message}</span>
        )}

        <div className="input-container">
          <FaLock className="input-icon" />
          <input 
            type="password" 
            placeholder="Contraseña"
            {...registerRegister('password')}
            className={registerErrors.password ? 'error' : ''}
          />
          <AnimatePresence>
            {registerErrors.password && (
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
        {registerErrors.password && (
          <span className="error-message">{registerErrors.password.message}</span>
        )}

        <div className="input-container">
          <FaLock className="input-icon" />
          <input 
            type="password" 
            placeholder="Confirme su Contraseña"
            {...registerRegister('confirmPassword')}
            className={registerErrors.confirmPassword ? 'error' : ''}
          />
          <AnimatePresence>
            {registerErrors.confirmPassword && (
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
        {registerErrors.confirmPassword && (
          <span className="error-message">{registerErrors.confirmPassword.message}</span>
        )}

        <motion.button 
          type="submit"
          className="btn"
          whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(30,80,30,0.2)' }}
          whileTap={{ scale: 0.97 }}
          disabled={isSubmitting} // Usar el estado local de submitting
        >
          {isSubmitting ? 'REGISTRANDO...' : 'REGISTRARSE'} 
        </motion.button>

        {error && <span className="error-message">{error}</span>} 
      </form>
    </motion.div>
  );
};

export default RegisterForm; 