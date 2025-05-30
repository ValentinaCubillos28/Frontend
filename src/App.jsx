import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './Componentes/Principal';
import Login from './Componentes/Login';
import Inicio from './Componentes/Inicio/Inicio';
import Jugadores from './Componentes/Jugadores/Jugadores';
import Panel from './Componentes/Panel';
import Puntajes from './Componentes/Puntajes';
import MiEquipo from './Componentes/MiEquipo/MiEquipo';
import Ranking from './Componentes/Ranking/Ranking';
import PerfilUsuario from './Componentes/Perfil/PerfilUsuario';
import PlayerPanel from './Componentes/Futbol/PlayerPanel';
import ProtectedRoute from './Componentes/ProtectedRoute';
import VerificarEmail from './Componentes/VerificarEmail';
import EmailVerificado from './Componentes/EmailVerificado';
import ChatMessages from './Componentes/Mensajes/ChatMessages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Login />} />
        <Route path="/verificar-email" element={<VerificarEmail />} />
        <Route path="/email-verificado" element={<EmailVerificado />} />
        <Route path="/Inicio" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />
        <Route path="/Jugadores" element={<Jugadores />} />
        <Route path="/Panel" element={<Panel />} />
        <Route path="/Puntajes" element={<Puntajes />} />
        <Route path="/MiEquipo" element={<ProtectedRoute><MiEquipo /></ProtectedRoute>} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/Perfil" element={<PerfilUsuario />} />
        <Route path="/PlayerPanel" element={<PlayerPanel />} />
        <Route path="/chat" element={<ProtectedRoute><ChatMessages /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;