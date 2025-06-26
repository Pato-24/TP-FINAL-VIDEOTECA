import React, { useEffect, useState } from "react";

const AdminAlquileres = () => {
  const [alquileres, setAlquileres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch de alquileres (reemplazar por API real)
    const fetchAlquileres = async () => {
      setLoading(true);
      try {
        // Aquí deberías hacer la petición real, por ejemplo:
        // const response = await fetch('/api/alquileres');
        // const data = await response.json();
        // setAlquileres(data);

        // Simulación de datos
        setTimeout(() => {
          setAlquileres([
            {
              id: 1,
              cliente: "Juan Pérez",
              pelicula: "Matrix",
              fechaAlquiler: "2025-06-20",
              fechaDevolucion: "2025-06-27",
              devuelto: false,
            },
            {
              id: 2,
              cliente: "Ana Gómez",
              pelicula: "Titanic",
              fechaAlquiler: "2025-06-18",
              fechaDevolucion: "2025-06-25",
              devuelto: true,
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setAlquileres([]);
        setLoading(false);
      }
    };

    fetchAlquileres();
  }, []);

  const marcarComoDevuelto = (id) => {
    setAlquileres((prev) =>
      prev.map((alquiler) =>
        alquiler.id === id ? { ...alquiler, devuelto: true } : alquiler
      )
    );
  };

  if (loading) return <div>Cargando alquileres...</div>;

  return (
    <div>
      <h2>Administración de Alquileres</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Película</th>
            <th>Fecha de Alquiler</th>
            <th>Fecha de Devolución</th>
            <th>Devuelto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alquileres.map((alquiler) => (
            <tr key={alquiler.id}>
              <td>{alquiler.cliente}</td>
              <td>{alquiler.pelicula}</td>
              <td>{alquiler.fechaAlquiler}</td>
              <td>{alquiler.fechaDevolucion}</td>
              <td>{alquiler.devuelto ? "Sí" : "No"}</td>
              <td>
                {!alquiler.devuelto && (
                  <button onClick={() => marcarComoDevuelto(alquiler.id)}>
                    Marcar como devuelto
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminAlquileres;