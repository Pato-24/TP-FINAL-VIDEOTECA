import React, { useEffect, useState } from "react";
import '../components/TablaAlquileres.css';

const AdminAlquileres = () => {
  const [alquileres, setAlquileres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch de alquileres (reemplazar por API real)
    const fetchAlquileres = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setAlquileres([
            {
              id: 1,
              cliente: "Juan Pérez",
              pelicula: "Minecraft",
              fechaAlquiler: "2025-06-20",
              fechaDevolucion: "2025-06-27",
              devuelto: false,
            },
            {
              id: 2,
              cliente: "Ana Gómez",
              pelicula: "Peter Pan: Pesadilla en Nunca Jamás",
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
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        minHeight: "100vh",
      }}
    >
      <h1
        className="text-center mb-4 animate__animated animate__fadeInDown"
        style={{
          fontFamily: "'Bebas Neue', Arial, sans-serif",
          fontSize: "3.5rem",
          letterSpacing: "2px",
          color: "#fff",
          textShadow: "2px 2px 8px #0008",
        }}
      >
        Administración de Alquileres
      </h1>
      <div className="container">
        <table className="tabla-alquileres">
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
    </div>
  );
};

export default AdminAlquileres;