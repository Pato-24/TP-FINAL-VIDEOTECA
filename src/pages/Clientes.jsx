import { useEffect, useState } from "react";
import { getClientes, addCliente, editCliente, deleteCliente } from "../services/clientes";
import { getAlquileres } from "../services/alquileres";
import { getPeliculas } from "../services/peliculas";
import TablaClientes from "../components/TablaClientes";
import FormCliente from "../components/FormCliente";
import HistorialAlquileres from "../components/HistorialAlquileres";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [alquileres, setAlquileres] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [clienteHistorial, setClienteHistorial] = useState(null); // Cliente seleccionado para ver historial

  // Carga clientes, alquileres y películas
  const cargarDatos = async () => {
    const [cliRes, alqRes, peliRes] = await Promise.all([
      getClientes(),
      getAlquileres(),
      getPeliculas()
    ]);
    setClientes(cliRes.data);
    setAlquileres(alqRes.data);
    setPeliculas(peliRes.data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleAgregar = async (data) => {
    await addCliente(data);
    cargarDatos();
  };

  const handleEditar = (cli) => setEditando(cli);

  const handleActualizar = async (data) => {
    await editCliente(editando.id, data);
    setEditando(null);
    cargarDatos();
  };

  const handleEliminar = async (id) => {
    // Trae todos los alquileres
  const res = await getAlquileres();
  // Verifica si hay alquileres asociados a este cliente
  const tieneAlquileres = res.data.some(a => String(a.clienteId) === String(id));
  if (tieneAlquileres) {
    alert("No puedes eliminar este cliente porque tiene alquileres asociados.");
    return;
  }
  // Si no tiene alquileres, elimina el cliente
  await deleteCliente(id);
  cargarDatos(); // Vuelve a cargar la lista
};

  // Muestra el historial del cliente seleccionado
  const handleVerHistorial = (cli) => {
    setClienteHistorial(cli);
  };

  // Cierra el historial
  const handleCerrarHistorial = () => {
    setClienteHistorial(null);
  };

  // Filtra los alquileres del cliente seleccionado
  const alquileresCliente = clienteHistorial
    ? alquileres.filter(a => String(a.clienteId) === String(clienteHistorial.id))
    : [];

  return (
    <div>
      <h2>Clientes</h2>
      <FormCliente
        onGuardar={editando ? handleActualizar : handleAgregar}
        clienteSeleccionado={editando}
        onCancelar={() => setEditando(null)}
      />
      <TablaClientes
        clientes={clientes}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onVerHistorial={handleVerHistorial}
      />
      {/* Muestra el historial si hay un cliente seleccionado */}
      {clienteHistorial && (
        <HistorialAlquileres
          alquileres={alquileresCliente}
          peliculas={peliculas}
          onCerrar={handleCerrarHistorial}
        />
      )}
    </div>
  );
};

export default Clientes;