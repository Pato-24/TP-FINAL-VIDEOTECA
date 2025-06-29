import { useEffect, useState } from "react";
import { getAlquileres, addAlquiler, editAlquiler, deleteAlquiler } from "../services/alquileres";
import { getClientes } from "../services/clientes";
import { getPeliculas } from "../services/peliculas";
import TablaAlquileres from "../components/TablaAlquileres";
import FormAlquiler from "../components/FormAlquiler";

// Componente principal para el CRUD de alquileres
const Alquileres = () => {
  // Estado para la lista de alquileres, clientes y películas
  const [alquileres, setAlquileres] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  // Estado para saber si se está editando un alquiler
  const [editando, setEditando] = useState(null);

  // Función para cargar todos los alquileres, clientes y películas desde la API
  const cargarDatos = async () => {
    const [alqRes, cliRes, peliRes] = await Promise.all([
      getAlquileres(),
      getClientes(),
      getPeliculas()
    ]);
    setAlquileres(alqRes.data);
    setClientes(cliRes.data);
    setPeliculas(peliRes.data);
  };

  // Carga los datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  // Maneja el agregado de un nuevo alquiler
  const handleAgregar = async (data) => {
    await addAlquiler(data);
    cargarDatos();
  };

  // Cuando se hace clic en "Editar", guarda el alquiler seleccionado en el estado
  const handleEditar = (alq) => setEditando(alq);

  // Maneja la actualización de un alquiler existente
  const handleActualizar = async (data) => {
    await editAlquiler(editando.id, data);
    setEditando(null); // Sale del modo edición
    cargarDatos();
  };

  // Maneja la eliminación de un alquiler
  const handleEliminar = async (id) => {
    await deleteAlquiler(id);
    cargarDatos();
  };

  return (
    <div>
      <h2>Alquileres</h2>
      {/* Formulario para agregar o editar un alquiler */}
      <FormAlquiler
        onGuardar={editando ? handleActualizar : handleAgregar}
        alquilerSeleccionado={editando}
        onCancel={() => setEditando(null)}
        clientes={clientes}
        peliculas={peliculas}
      />
      {/* Tabla que muestra todos los alquileres y permite editar/eliminar */}
      <TablaAlquileres
        alquileres={alquileres}
        clientes={clientes}
        peliculas={peliculas}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  );
};

export default Alquileres;