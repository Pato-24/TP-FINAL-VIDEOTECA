import { useEffect, useState } from "react";
import { getClientes, addCliente, editCliente, deleteCliente } from "../services/clientes";
import { getAlquileres } from "../services/alquileres"; // para manejar el historial de alquileres 
// Importa las funciones del servicio para manejar la API de películas
import { getPeliculas, addPelicula, editPelicula, deletePelicula } from "../services/peliculas";
// Importa el componente de tabla y el formulario reutilizable
import TablaPeliculas from "../components/TablaPeliculas";
import FormPelicula from "../components/FormPelicula";

// Componente principal para el CRUD de películas
const Peliculas = () => {
  // Estado para la lista de películas
  const [peliculas, setPeliculas] = useState([]);
  // Estado para saber si se está editando una película
  const [editando, setEditando] = useState(null);

  // Función para cargar todas las películas desde la API
  const cargarPeliculas = async () => {
    const res = await getPeliculas();
    setPeliculas(res.data);
  };

  // Carga las películas al montar el componente
  useEffect(() => {
    cargarPeliculas();
  }, []);

  // Maneja el agregado de una nueva película
  const handleAgregar = async (data) => {
    await addPelicula(data);
    cargarPeliculas();
  };

  // Cuando se hace clic en "Editar", guarda la película seleccionada en el estado
  const handleEditar = (peli) => setEditando(peli);

  // Maneja la actualización de una película existente
  const handleActualizar = async (data) => {
    await editPelicula(editando.id, data);
    setEditando(null); // Sale del modo edición
    cargarPeliculas();
  };

  // Maneja la eliminación de una película, revisando si tiene alquileres asociados
  const handleEliminar = async (id) => {
    // Trae todos los alquileres
  const res = await getAlquileres();
  // Verifica si hay alquileres asociados a esta película
  const tieneAlquileres = res.data.some(a => String(a.peliculaId) === String(id));
  if (tieneAlquileres) {
    alert("No puedes eliminar esta película porque tiene alquileres asociados.");
    return;
  }
  // Si no tiene alquileres, elimina la película
  await deletePelicula(id);
  cargarPeliculas(); // Vuelve a cargar la lista
};

  return (
    <div>
      <h2>Películas</h2>
      {/* Formulario para agregar o editar una película */}
      <FormPelicula
        onSubmit={editando ? handleActualizar : handleAgregar}
        initialData={editando}
        onCancel={() => setEditando(null)}
      />
      {/* Tabla que muestra todas las películas y permite editar/eliminar */}
      <TablaPeliculas peliculas={peliculas} onEditar={handleEditar} onEliminar={handleEliminar} />
    </div>
  );
};

export default Peliculas;