// Inicio.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaCog, FaQuestionCircle, FaUsers, FaTrophy, FaFutbol } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import './Inicio.css';

const Inicio = () => {
  const navigate = useNavigate();
  const { user, profile, profileLoading } = useAuthStore();


  const handleSectionClick = (section) => {
    if (section === 'Jugadores') {
      navigate('/Jugadores');
    } else if (section === 'Ranking') {
      navigate('/Ranking');
    } else if (section === 'MiEquipo') {
      navigate('/MiEquipo');
    } else if (section === 'Perfil') {
      navigate('/Perfil');
    }
  };

  const profileImageSvg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRTBFMEUwIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjIwIiBmaWxsPSIjNjY2Ii8+CjxwYXRoIGQ9Ik0zMCA5MEMzMCA3NyA0NCA2NSA2MCA2NVM5MCA3NyA5MCA5MFoiIGZpbGw9IiM2NjYiLz4KPC9zdmc+";

  const playerImageSvg = "data:image/svg+xml;base64,...";
  const femalePlayerImageSvg = "data:image/svg+xml;base64,...";

  const handlePlayerClick = (player) => {
    console.log(`Clicked on player ${player}`);
  };

  return (
    <div className="inicio">
      {/* Header */}
      <header className="inicio-header">
        <button className="header-button" onClick={() => handleSectionClick('Perfil')}><FaUser className="button-icon" /> MI PERFIL</button>
        <button className="header-button" onClick={() => console.log('Configuración')}><FaCog className="button-icon" /> CONFIGURACIÓN</button>
        <button className="header-button" onClick={() => console.log('Ayuda')}><FaQuestionCircle className="button-icon" /> AYUDA</button>
      </header>

      {/* Contenido principal */}
      <div className="main-content">
        <motion.h1 
          className="welcome-title"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          {profileLoading ? 
            'Cargando perfil...' 
            : profile?.nombre_usuario ? 
              `BIENVENIDO ${profile.nombre_usuario}` 
              : `BIENVENIDO ${user?.email || 'Usuario'}`
          }
        </motion.h1>

        {/* Perfil */}
        <motion.div 
          className="profile"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img src={profileImageSvg} alt="Perfil" className="profile-img" />
          <p className="profile-text points">Tus puntos acumulados: XXXXXX</p>
          <p className="profile-text reminder">RECUERDA HACER CAMBIOS ANTES DE XX-XX-XXXX</p>
        </motion.div>

        {/* Imágenes placeholder */}
        <motion.div 
          className="placeholder-images"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="placeholder-box">Imagen 1</div>
          <div className="placeholder-box">Imagen 2</div>
          <div className="placeholder-box">Imagen 3</div>
        </motion.div>

        {/* Secciones */}
        <motion.div 
          className="sections"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="section">
            <motion.button 
              className="section-button" 
              onClick={() => handleSectionClick('MiEquipo')}
              whileHover={{ scale: 1.07, boxShadow: '0px 4px 20px rgba(30,80,30,0.15)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FaUsers className="button-icon" /> MI EQUIPO
            </motion.button>
          </div>

          <div className="section">
            <motion.button 
              className="section-button" 
              onClick={() => handleSectionClick('Ranking')}
              whileHover={{ scale: 1.07, boxShadow: '0px 4px 20px rgba(30,80,30,0.15)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FaTrophy className="button-icon" /> RANKING
            </motion.button>
          </div>

          <div className="section">
            <motion.button 
              className="section-button" 
              onClick={() => handleSectionClick('Jugadores')}
              whileHover={{ scale: 1.07, boxShadow: '0px 4px 20px rgba(30,80,30,0.15)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FaFutbol className="button-icon" /> JUGADORES
            </motion.button>
          </div>
        </motion.div>

        {/* Jugadores destacados */}
        <motion.div 
          className="jugadores-destacados"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <motion.div 
            className="jugador-card"
            whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(30,80,30,0.15)' }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={playerImageSvg} alt="Jugador" className="jugador-img" />
            <button className="jugador-button" onClick={() => handlePlayerClick(1)}>Button</button>
          </motion.div>
          <motion.div 
            className="jugador-card"
            whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(30,80,30,0.15)' }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={playerImageSvg} alt="Jugador" className="jugador-img" />
            <button className="jugador-button" onClick={() => handlePlayerClick(2)}>Button</button>
          </motion.div>
          <motion.div 
            className="jugador-card"
            whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(30,80,30,0.15)' }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={femalePlayerImageSvg} alt="Jugador" className="jugador-img" />
            <button className="jugador-button" onClick={() => handlePlayerClick(3)}>Button</button>
          </motion.div>
        </motion.div>

        <br />
      </div>

      {/* Footer */}
      <footer className="inicio-footer">©Football Fantasy</footer>
    </div>
  );
};

export default Inicio;
