import React from "react";

const TablaClientes = ({ clientes = [] }) => {
  return (
    <table className="tabla-clientes">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td>{cliente.nombre}</td>
            <td>{cliente.email}</td>
            <td>{cliente.telefono}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaClientes;
// Compare this snippet from src/pages/AdminAlquileres.jsx: