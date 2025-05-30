import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa'; // Usaremos un ícono de éxito
import { useNavigate } from 'react-router-dom';
import './EmailVerificado/style.css'; // Importar el archivo CSS

const EmailVerificado = () => {
  const navigate = useNavigate();

  // Variantes de animación (puedes ajustarlas si tienes unas globales)
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
      className="contenedor email-verificado-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.main 
        className="main-content"
        variants={itemVariants}
      >
        <div className="email-verificado-container">
          <motion.div
            className="icon-container"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <FaCheckCircle size={60} className="success-icon" /> {/* Ícono de éxito */}
          </motion.div>
          <h2>¡Correo Electrónico Verificado!</h2>
          <p>Tu dirección de correo ha sido verificada exitosamente.</p>
          <p>Ahora puedes iniciar sesión en tu cuenta.</p>
          <motion.button
            className="btn-ir-login"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ir a Iniciar Sesión
          </motion.button>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default EmailVerificado; 