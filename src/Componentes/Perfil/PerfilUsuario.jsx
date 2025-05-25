import React from "react";
import "./PerfilUsuario.css";

export default function PerfilUsuario() {
  return (
    <div className="perfil-panel">
      <div className="menu-bar">
        <span>Menú</span>
      </div>

      <div className="perfil-info">
         <div class="titulo-usuario">USUARIO</div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Usuario"
          className="perfil-photo"
        />
        <p>
          <strong>Nombre</strong>
          <br />
          Nombre telefono
        </p>
      </div>

      <div className="historial-section">
        <h3>Historial</h3>
        <table className="historial-table">
          <thead>
            <tr>
              <th>Semanas</th>
              <th>Puntajes</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((semana) => (
              <tr key={semana}>
                <td>Semana {semana}</td>
                <td>0000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cerrar-section">
        <button className="cerrar-btn">Cerrar Sesion</button>
      </div>

      <div className="footer">@football Fantasy</div>
    </div>
  );
}