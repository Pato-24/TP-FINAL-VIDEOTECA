import React from "react";
import { Link } from "react-router-dom";
import "./NavbarCustom.css";

const Navbar = () => {
  return (
    <nav className="navbar-custom">
      <ul className="navbar-list">
        <li>
          <Link className="navbar-link" to="/home">Inicio</Link>
        </li>
        <li>
          <Link className="navbar-link" to="/clientes">Clientes</Link>
        </li>
        <li>
          <Link className="navbar-link" to="/peliculas">Películas</Link>
        </li>
        <li>
          <Link className="navbar-link" to="/alquileres">Alquileres</Link>
        </li>
        <li>
          <Link className="navbar-link" to="/login">Login</Link>
        </li>
        <li>
          <Link className="navbar-link" to="/integrantes">Integrantes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
