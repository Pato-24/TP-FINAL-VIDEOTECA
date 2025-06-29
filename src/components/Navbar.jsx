import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px", margin: 0, padding: 0 }}>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/clientes">Clientes</Link>
        </li>
        <li>
          <Link to="/peliculas">Películas</Link>
        </li>
        <li>
          <Link to="/alquileres">Alquileres</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/integrantes">Integrantes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
