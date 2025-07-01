import React from "react";

// Componente para mostrar el historial de alquileres de un cliente
// Recibe por props: alquileres (array), peliculas (array)
const HistorialAlquileres = ({ alquileres, peliculas, onCerrar }) => {
  // Función para obtener el título de la película por ID
  const getTituloPelicula = (id) => {
    const peli = peliculas.find((p) => String(p.id) === String(id));
    return peli ? peli.titulo : "Desconocida";
  };

  return (
    <div className="historial-alquileres">
      <h4>Historial de Alquileres</h4>
      <button onClick={onCerrar}>Cerrar</button>
      <table>
        <thead>
          <tr>
            <th>Película</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Devuelto</th>
          </tr>
        </thead>
        <tbody>
          {alquileres.length === 0 ? (
            <tr>
              <td colSpan={4}>No hay alquileres para este cliente.</td>
            </tr>
          ) : (
            alquileres.map(alq => (
              <tr key={alq.id}>
                <td>{getTituloPelicula(alq.peliculaId)}</td>
                <td>{alq.fechaInicio}</td>
                <td>{alq.fechaFin}</td>
                <td>{alq.devuelto ? "Sí" : "No"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialAlquileres;