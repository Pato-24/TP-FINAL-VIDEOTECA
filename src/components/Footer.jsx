import React from "react";
import "./HeaderFooter.css";

const Footer = () => (
  <footer className="main-footer">
    <p>
      &copy; {new Date().getFullYear()} - Videoteca Trancas | Hecho con <span className="footer-heart">❤</span> por tu equipo.
    </p>
  </footer>
);

export default Footer;