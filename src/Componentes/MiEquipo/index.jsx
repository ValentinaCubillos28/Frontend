import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useEquipoStore } from '../../store/equipoStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { equipoSchema } from '../../lib/schemas';
import './style.css';

const MiEquipo = () => {
  const { user } = useAuthStore();
  const { 
    equipo, 
    jugadores, 
    loading, 
    error,
    obtenerEquipo,
    crearEquipo,
    agregarJugador,
    actualizarJugador,
    eliminarJugador
  } = useEquipoStore();

  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(equipoSchema)
  });

  useEffect(() => {
    if (user) {
      obtenerEquipo(user.id);
    }
  }, [user, obtenerEquipo]);

  const onSubmit = async (data) => {
    if (equipo) {
      // Actualizar equipo existente
      // TODO: Implementar actualización
    } else {
      // Crear nuevo equipo
      const result = await crearEquipo(data.nombre, data.formacion, user.id);
      if (result.success) {
        setShowForm(false);
        reset();
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="mi-equipo-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="equipo-header"
      >
        <h1>Mi Equipo Fantasy</h1>
        {!equipo && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="btn-crear-equipo"
          >
            Crear Equipo
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {showForm && !equipo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="form-container"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group">
                <label>Nombre del Equipo</label>
                <input
                  type="text"
                  {...register('nombre')}
                  className={errors.nombre ? 'error' : ''}
                />
                {errors.nombre && (
                  <span className="error-message">{errors.nombre.message}</span>
                )}
              </div>

              <div className="input-group">
                <label>Formación</label>
                <select {...register('formacion')}>
                  <option value="4-4-2">4-4-2</option>
                  <option value="4-3-3">4-3-3</option>
                  <option value="3-5-2">3-5-2</option>
                  <option value="5-3-2">5-3-2</option>
                </select>
              </div>

              <div className="button-group">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-submit"
                >
                  Crear Equipo
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(false)}
                  className="btn-cancel"
                >
                  Cancelar
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {equipo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="equipo-info"
        >
          <div className="equipo-details">
            <h2>{equipo.nombre}</h2>
            <p>Formación: {equipo.formacion}</p>
            <p>Puntos Totales: {equipo.puntos_totales}</p>
            <p>Posición en Ranking: {equipo.posicion_ranking}</p>
          </div>

          <div className="jugadores-container">
            <h3>Plantilla</h3>
            <div className="jugadores-grid">
              {jugadores.map((jugador) => (
                <motion.div
                  key={jugador.id}
                  className="jugador-card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="jugador-info">
                    <h4>Jugador #{jugador.jugador_api_id}</h4>
                    <p>{jugador.es_capitan ? 'Capitán' : jugador.es_vice_capitan ? 'Vice-Capitán' : ''}</p>
                    <p>{jugador.es_titular ? 'Titular' : 'Suplente'}</p>
                  </div>
                  <div className="jugador-actions">
                    <button onClick={() => actualizarJugador(jugador.id, { es_titular: !jugador.es_titular })}>
                      {jugador.es_titular ? 'Quitar' : 'Titular'}
                    </button>
                    <button onClick={() => eliminarJugador(jugador.id)}>
                      Eliminar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="error-container"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default MiEquipo; 