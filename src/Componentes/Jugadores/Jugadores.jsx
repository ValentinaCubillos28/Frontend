import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Jugadores.css';

export default function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seleccionados, setSeleccionados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerTodosLosJugadores();
  }, []);

  const obtenerTodosLosJugadores = async () => {
  try {
    setLoading(true);

    const equiposPopulares = [
      'Barcelona', 'Real Madrid', 'Manchester United', 'Manchester City',
      'Liverpool', 'Chelsea', 'Arsenal', 'Bayern Munich', 'Paris Saint-Germain',
      'Juventus', 'AC Milan', 'Inter Milan', 'Atletico Madrid'
    ];

    console.log('Cargando jugadores en paralelo...');

    const fetches = equiposPopulares.map(equipo =>
      fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=${encodeURIComponent(equipo)}`)
        .then(res => res.json())
        .then(data => {
          if (data.player && data.player.length > 0) {
            return data.player.map(jugador => ({
              id: jugador.idPlayer,
              nombre: jugador.strPlayer,
              imagen: jugador.strThumb || jugador.strCutout || '/img/default-player.jpg',
              posicion: jugador.strPosition,
              equipo: jugador.strTeam,
              nacionalidad: jugador.strNationality,
              fechaNacimiento: jugador.dateBorn,
              descripcion: jugador.strDescriptionEN,
              peso: jugador.strWeight,
              altura: jugador.strHeight,
              goles: jugador.strGoals || '0',
              facebook: jugador.strFacebook,
              twitter: jugador.strTwitter,
              instagram: jugador.strInstagram,
              deporte: jugador.strSport
            }));
          }
          return [];
        })
        .catch(err => {
          console.warn(`Error con ${equipo}:`, err);
          return [];
        })
    );

    const resultados = await Promise.allSettled(fetches);
    const jugadoresData = resultados.flatMap(r => (r.status === 'fulfilled' ? r.value : []));

    const jugadoresUnicos = jugadoresData.filter(
      (jugador, index, self) =>
        index === self.findIndex(j => j.id === jugador.id)
    );

    console.log(`Jugadores cargados: ${jugadoresUnicos.length}`);
    setJugadores(jugadoresUnicos);
    setLoading(false);

  } catch (error) {
    console.error('Error general al cargar jugadores:', error);
    setError('No se pudo cargar la lista de jugadores.');
    setLoading(false);
  }
};

  const toggleJugador = (nombre) => {
    setSeleccionados((prev) =>
      prev.includes(nombre)
        ? prev.filter((j) => j !== nombre)
        : prev.length < 5
        ? [...prev, nombre]
        : prev
    );
  };

  const irAPlayerPanel = (jugador) => {
    navigate('/PlayerPanel', { state: { jugador } });
  };

  const confirmarEquipo = () => {
    if (seleccionados.length === 5) {
      const equipoCompleto = jugadores.filter(j => seleccionados.includes(j.nombre));
      localStorage.setItem('miEquipo', JSON.stringify(equipoCompleto));
      navigate('/miequipo');
    } else {
      alert('Debes seleccionar exactamente 5 jugadores.');
    }
  };

  if (loading) {
    return (
      <div className="jugadores-container">
        <div className="loading-container">
          <h2>Cargando todos los jugadores...</h2>
          <div className="loading-spinner"></div>
          <p>Obteniendo datos desde TheSportsDB</p>
          <p className="loading-detail">Esto puede tomar un momento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jugadores-container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="jugadores-container">
      <h2>Selección de Jugadores</h2>
      <p>Selecciona a tus 5 jugadores favoritos para tu equipo fantasy.</p>
      
      <div className="info-container">
        <p className="contador">{seleccionados.length}/5 jugadores seleccionados</p>
        <p className="total-jugadores">Total disponible: {jugadores.length} jugadores</p>
      </div>
      
      <div className="grid">
        {jugadores.map((j) => (
          <div key={j.id} className={`jugador-card ${seleccionados.includes(j.nombre) ? 'seleccionado' : ''}`}>
            
            <div
              className="star"
              onClick={(e) => {
                e.stopPropagation();
                toggleJugador(j.nombre);
              }}
            ></div>

            <div className="imagen-container" onClick={() => irAPlayerPanel(j)}>
              <img 
                src={j.imagen} 
                alt={j.nombre}
                onError={(e) => {
                  e.target.src = '/img/default-player.jpg';
                }}
              />
            </div>

            <div className="jugador-info">
              <p className="nombre">{j.nombre}</p>
              {j.posicion && <p className="posicion">{j.posicion}</p>}
              {j.equipo && <p className="equipo">{j.equipo}</p>}
              {j.nacionalidad && <p className="nacionalidad">{j.nacionalidad}</p>}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="confirmar-btn" 
        onClick={confirmarEquipo}
        disabled={seleccionados.length !== 5}
      >
        Confirmar equipo ({seleccionados.length}/5)
      </button>
    </div>
  );
}