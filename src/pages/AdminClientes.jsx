import React, { useEffect, useState } from "react";
import "../components/TablaClientes.css";

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch de clientes (reemplazar por API real)
    const fetchClientes = async () => {
      setLoading(true);
      try {
        // Aquí deberías hacer la petición real, por ejemplo:
        // const response = await fetch('/api/clientes');
        // const data = await response.json();
        // setClientes(data);

        // Simulación de datos
        setTimeout(() => {
          setClientes([
            {
              id: 1,
              nombre: "Juan Pérez",
              email: "juanperez@email.com",
              telefono: "123456789",
            },
            {
              id: 2,
              nombre: "Ana Gómez",
              email: "anagomez@email.com",
              telefono: "987654321",
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setClientes([]);
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) return <div>Cargando clientes...</div>;

  return (
    <div className="admin-clientes-bg">
      <h2 className="admin-clientes-title">Administración de Clientes</h2>
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
    </div>
  );
};

export default AdminClientes;