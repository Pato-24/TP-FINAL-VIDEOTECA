import { useEffect, useState } from "react";
import { getAlquileres } from "../services/alquileres";
import { getPeliculas, addPelicula, editPelicula, deletePelicula } from "../services/peliculas";
import TablaPeliculas from "../components/TablaPeliculas";
import FormPelicula from "../components/FormPelicula";

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [editando, setEditando] = useState(null);

  const cargarPeliculas = async () => {
    const res = await getPeliculas();
    setPeliculas(res.data);
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const handleAgregar = async (data) => {
    await addPelicula(data);
    cargarPeliculas();
  };

  const handleEditar = (peli) => setEditando(peli);

  const handleActualizar = async (data) => {
    await editPelicula(editando.id, data);
    setEditando(null);
    cargarPeliculas();
  };

  const handleEliminar = async (id) => {
    const res = await getAlquileres();
    const tieneAlquileres = res.data.some(a => String(a.peliculaId) === String(id));
    if (tieneAlquileres) {
      alert("No puedes eliminar esta película porque tiene alquileres asociados.");
      return;
    }
    await deletePelicula(id);
    cargarPeliculas();
  };

  return (
    <div>
      <h2>Películas</h2>
      <FormPelicula
        onGuardar={editando ? handleActualizar : handleAgregar}
        peliculaSeleccionada={editando}
        onCancelar={() => setEditando(null)}
      />
      <TablaPeliculas peliculas={peliculas} onEditar={handleEditar} onEliminar={handleEliminar} />
    </div>
  );
};

export default Peliculas;