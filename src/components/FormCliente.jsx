import React, { useState } from "react";

const FormCliente = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !email || !telefono) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError("");
    if (onSubmit) {
      onSubmit({
        nombre,
        email,
        telefono,
      });
    }
    // Limpiar formulario
    setNombre("");
    setEmail("");
    setTelefono("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo Cliente</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <button type="submit">Registrar Cliente</button>
    </form>
  );
};

export default FormCliente;