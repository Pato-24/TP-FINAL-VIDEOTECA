import React, { useEffect, useState } from "react";

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
    <div>
      <h2>Integrantes</h2>
      <ul>
        {integrantes.map((integrante) => (
          <li key={integrante.id}>
            {integrante.nombre} - {integrante.rol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Integrantes;