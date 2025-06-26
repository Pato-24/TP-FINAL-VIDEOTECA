import React from "react";

const TablaAlquileres = ({ alquileres = [], onMarcarDevuelto }) => {
  return (
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
              {!alquiler.devuelto && onMarcarDevuelto && (
                <button onClick={() => onMarcarDevuelto(alquiler.id)}>
                  Marcar como devuelto
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaAlquileres;