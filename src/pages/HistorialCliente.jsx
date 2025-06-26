import React, { useEffect, useState } from "react";

const HistorialCliente = ({ clienteId }) => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch de historial de alquileres por cliente (reemplazar por API real)
    const fetchHistorial = async () => {
      setLoading(true);
      try {
        // Aquí deberías hacer la petición real, por ejemplo:
        // const response = await fetch(`/api/clientes/${clienteId}/alquileres`);
        // const data = await response.json();
        // setHistorial(data);

        // Simulación de datos
        setTimeout(() => {
          setHistorial([
            {
              id: 1,
              pelicula: "Matrix",
              fechaAlquiler: "2025-06-20",
              fechaDevolucion: "2025-06-27",
              devuelto: false,
            },
            {
              id: 2,
              pelicula: "Titanic",
              fechaAlquiler: "2025-05-10",
              fechaDevolucion: "2025-05-17",
              devuelto: true,
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setHistorial([]);
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [clienteId]);

  if (loading) return <div>Cargando historial...</div>;

  return (
    <div>
      <h2>Historial de Alquileres</h2>
      <table>
        <thead>
          <tr>
            <th>Película</th>
            <th>Fecha de Alquiler</th>
            <th>Fecha de Devolución</th>
            <th>Devuelto</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((item) => (
            <tr key={item.id}>
              <td>{item.pelicula}</td>
              <td>{item.fechaAlquiler}</td>
              <td>{item.fechaDevolucion}</td>
              <td>{item.devuelto ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialCliente;