import React, { useEffect, useState } from "react";
import "./integrantes.css";

const Integrantes = () => {
  const [integrantes, setIntegrantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/integrantes")
      .then((res) => res.json())
      .then((data) => {
        setIntegrantes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al traer los integrantes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando integrantes...</p>;

  return (
    <div className="integrantes-container">
      <h2 className="integrantes-title">Integrantes</h2>
      <ul className="integrantes-list">
        {integrantes.map((integrante, idx) => (
          <li key={idx} className="integrante-item">
            <div className="integrante-foto-container">
              <img
                src={integrante.foto}
                alt={integrante.nombre + " " + integrante.apellido}
                className="integrante-foto"
              />
            </div>
            <div className="integrante-info">
              <span className="integrante-nombre">
                {integrante.nombre} {integrante.apellido}
              </span>
              <span className="integrante-email">{integrante.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Integrantes;