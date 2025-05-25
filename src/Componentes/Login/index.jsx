import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '../../lib/schemas';
import { useAuthStore } from '../../store/authStore';
import './style.css';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, loading, error } = useAuthStore();

  console.log('Login component rendered. Loading state:', loading);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onLogin = async (data) => {
    console.log('onLogin called with data:', data);
    const result = await signIn(data.email, data.password);
    if (result.success) {
      navigate('/Inicio');
    }
  };

  const onRegister = async (data) => {
    console.log('onRegister called with data:', data);
    const result = await signUp(data.email, data.password, data.username);
    if (result.success) {
      navigate('/Inicio');
    }
  };

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
                disabled={loading}
              >
                {loading ? 'CARGANDO...' : 'INGRESAR'}
              </motion.button>

              {error && <span className="error-message">{error}</span>}
              
              <a href="#" className="link">olvido usuario/contraseña</a>
            </form>
          </motion.div>

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
                disabled={loading}
              >
                {loading ? 'CARGANDO...' : 'REGISTRARSE'}
              </motion.button>

              {error && <span className="error-message">{error}</span>}
            </form>
          </motion.div>
        </div>
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
