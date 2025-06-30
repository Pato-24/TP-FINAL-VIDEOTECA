import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarCustom.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      <ul className="navbar-list">
        <li>
          <Link className="navbar-link" to="/home">Inicio</Link>
        </li>
        {/* Solo muestra estos enlaces si el usuario es admin */}
        {user && user.rol === "admin" && (
          <>
            <li>
              <Link className="navbar-link" to="/peliculas">Películas</Link>
            </li>
            <li>
              <Link className="navbar-link" to="/clientes">Clientes</Link>
            </li>
            <li>
              <Link className="navbar-link" to="/alquileres">Alquileres</Link>
            </li>
          </>
        )}
        <li>
          <Link className="navbar-link" to="/integrantes">Integrantes</Link>
        </li>
        {/* Si no hay usuario, muestra Login */}
        {!user && (
          <li>
            <Link className="navbar-link" to="/login">Login</Link>
          </li>
        )}
        {/* Si hay usuario, muestra botón de Cerrar sesión */}
        {user && (
          <li>
            <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", color: "#007bff" }}>
              Cerrar sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;