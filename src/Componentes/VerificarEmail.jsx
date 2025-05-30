import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './VerificarEmail/style.css';

const VerificarEmail = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring' } },
  };

  return (
    <motion.div 
      className="contenedor verificar-email-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.main 
        className="main-content"
        variants={itemVariants}
      >
        <div className="verificar-email-container">
          <motion.div
            className="icon-container"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <FaEnvelope size={60} className="email-icon" />
          </motion.div>
          <h2>Verifica tu Correo Electrónico</h2>
          <p>Hemos enviado un enlace de verificación a tu dirección de correo. Por favor, revisa tu bandeja de entrada (y spam) para completar el registro.</p>
          <p>Una vez verificado, podrás iniciar sesión.</p>
          <motion.button
            className="btn-regresar-login"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Regresar al Login
          </motion.button>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default VerificarEmail; 