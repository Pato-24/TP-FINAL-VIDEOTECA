import { useState, useEffect } from "react";
import "./FormCliente.css";

// Formulario para agregar o editar un cliente
const FormCliente = ({ onGuardar, clienteSeleccionado, onCancelar }) => {
  // Estado local para los campos del formulario
  const [cliente, setCliente] = useState({
    nombre: "",
    contacto: "",
    telefono: ""
  });

  // Si se selecciona un cliente para editar, se cargan sus datos en el formulario
  useEffect(() => {
    if (clienteSeleccionado) {
      setCliente(clienteSeleccionado);
    } else {
      setCliente({ nombre: "", contacto: "", telefono: "" });
    }
  }, [clienteSeleccionado]);

  // Maneja el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  // Maneja el envío del formulario (agregar o editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(cliente); // Llama a la función recibida por props para guardar
    setCliente({ nombre: "", contacto: "", telefono: "" }); // Limpia el formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{clienteSeleccionado ? "Editar Cliente" : "Agregar Cliente"}</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={cliente.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="contacto"
        placeholder="Email"
        value={cliente.contacto}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={cliente.telefono}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
      {clienteSeleccionado && (
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default FormCliente;