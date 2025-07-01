import { useState, useEffect } from "react";

// Formulario para agregar o editar un alquiler
// Recibe por props: onGuardar, alquilerSeleccionado, onCancelar, clientes, peliculas
const FormAlquiler = ({ onGuardar, alquilerSeleccionado, onCancelar, clientes, peliculas }) => {
  // Estado local para los campos del formulario
  const [alquiler, setAlquiler] = useState({
    clienteId: "",
    peliculaId: "",
    fechaInicio: "",
    fechaFin: "",
    devuelto: false
  });

  // Si se selecciona un alquiler para editar, se cargan sus datos en el formulario
  useEffect(() => {
    if (alquilerSeleccionado) {
      setAlquiler(alquilerSeleccionado);
    } else {
      setAlquiler({
        clienteId: "",
        peliculaId: "",
        fechaInicio: "",
        fechaFin: "",
        devuelto: false
      });
    }
  }, [alquilerSeleccionado]);

  // Maneja el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAlquiler({
      ...alquiler,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Maneja el envío del formulario (agregar o editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(alquiler); // Llama a la función recibida por props para guardar
    setAlquiler({
      clienteId: "",
      peliculaId: "",
      fechaInicio: "",
      fechaFin: "",
      devuelto: false
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{alquilerSeleccionado ? "Editar Alquiler" : "Agregar Alquiler"}</h3>
      {/* Selección de cliente */}
      <select
        name="clienteId"
        value={alquiler.clienteId}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona un cliente</option>
        {clientes.map((cli) => (
          <option key={cli.id} value={cli.id}>
            {cli.nombre}
          </option>
        ))}
      </select>
      {/* Selección de película */}
      <select
        name="peliculaId"
        value={alquiler.peliculaId}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona una película</option>
        {peliculas.map((peli) => (
          <option key={peli.id} value={peli.id}>
            {peli.titulo}
          </option>
        ))}
      </select>
      // Fecha de inicio
      <input
        type="date"
        name="fechaInicio"
        value={alquiler.fechaInicio}
        min={new Date().toISOString().split("T")[0]} // Limita al día de hoy
        onChange={handleChange}
      />
      // Fecha de fin
      <input
        type="date"
        name="fechaFin"
        value={alquiler.fechaFin}
        min={alquiler.fechaInicio || new Date().toISOString().split("T")[0]} // Limita a la fecha de inicio o hoy
        onChange={handleChange}
      />

      {/* Checkbox devuelto */}
      <label>
        <input
          type="checkbox"
          name="devuelto"
          checked={alquiler.devuelto}
          onChange={handleChange}
        />
        Devuelto
      </label>
      <button type="submit">Guardar</button>
      {alquilerSeleccionado && (
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default FormAlquiler;