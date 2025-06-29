import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px", margin: 0, padding: 0 }}>
        <li>
          <Link to="/home">Inicio</Link>
        </li>
        {/* Solo muestra estos enlaces si el usuario es admin */}
        {user && user.rol === "admin" && (
          <>
            <li>
              <Link to="/peliculas">Películas</Link>
            </li>
            <li>
              <Link to="/clientes">Clientes</Link>
            </li>
            <li>
              <Link to="/alquileres">Alquileres</Link>
            </li>
          </>
        )}
        {/* Enlace a Integrantes siempre visible */}
        <li>
          <Link to="/integrantes">Integrantes</Link>
        </li>
        {/* Si no hay usuario, muestra Login */}
        {!user && (
          <li>
            <Link to="/login">Login</Link>
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