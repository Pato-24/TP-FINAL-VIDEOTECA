import React, { useEffect, useState } from "react";
import "./HeaderFooter.css";

const Header = () => {
  const [hide, setHide] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 60) {
        setHide(true); // Oculta al bajar
      } else {
        setHide(false); // Muestra al subir
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header className={`main-header${hide ? " hide-header" : ""}`}>
      <h1>🎬 Videoteca Trancas</h1>
      <p>¡Tu lugar para alquilar y disfrutar películas!</p>
    </header>
  );
};

export default Header;