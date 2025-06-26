import React, { useState } from "react";

const FormAlquiler = ({ clientes = [], peliculas = [], onSubmit }) => {
  const [clienteId, setClienteId] = useState("");
  const [peliculaId, setPeliculaId] = useState("");
  const [fechaAlquiler, setFechaAlquiler] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clienteId || !peliculaId || !fechaAlquiler || !fechaDevolucion) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError("");
    if (onSubmit) {
      onSubmit({
        clienteId,
        peliculaId,
        fechaAlquiler,
        fechaDevolucion,
      });
    }
    // Limpiar formulario
    setClienteId("");
    setPeliculaId("");
    setFechaAlquiler("");
    setFechaDevolucion("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo Alquiler</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label>Cliente:</label>
        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Película:</label>
        <select
          value={peliculaId}
          onChange={(e) => setPeliculaId(e.target.value)}
        >
          <option value="">Seleccione una película</option>
          {peliculas.map((pelicula) => (
            <option key={pelicula.id} value={pelicula.id}>
              {pelicula.titulo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha de Alquiler:</label>
        <input
          type="date"
          value={fechaAlquiler}
          onChange={(e) => setFechaAlquiler(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha de Devolución:</label>
        <input
          type="date"
          value={fechaDevolucion}
          onChange={(e) => setFechaDevolucion(e.target.value)}
        />
      </div>
      <button type="submit">Registrar Alquiler</button>
    </form>
  );
};

export default FormAlquiler;