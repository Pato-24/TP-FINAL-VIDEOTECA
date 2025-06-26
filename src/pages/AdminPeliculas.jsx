import { useEffect, useState } from "react";
import axios from "axios";
import FormPelicula from "../components/FormPelicula";
import TablaPeliculas from "../components/TablaPeliculas";

const AdminPeliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaEditando, setPeliculaEditando] = useState(null);

  const cargarPeliculas = async () => {
    const res = await axios.get("http://localhost:3001/peliculas");
    setPeliculas(res.data);
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const guardarPelicula = async (pelicula) => {
    if (pelicula.id) {
      // Si tiene ID, es edición
      await axios.put(`http://localhost:3001/peliculas/${pelicula.id}`, pelicula);
    } else {
      // Si no tiene ID, es nueva
      await axios.post("http://localhost:3001/peliculas", pelicula);
    }
    setPeliculaEditando(null);
    cargarPeliculas();
  };

  const eliminarPelicula = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta película?")) {
      await axios.delete(`http://localhost:3001/peliculas/${id}`);
      cargarPeliculas();
    }
  };

  return (
    <div>
      <h2>Gestión de Películas</h2>
      <FormPelicula
        onGuardar={guardarPelicula}
        peliculaSeleccionada={peliculaEditando}
        onCancelar={() => setPeliculaEditando(null)}
      />
      <TablaPeliculas
        peliculas={peliculas}
        onEditar={setPeliculaEditando}
        onEliminar={eliminarPelicula}
      />
    </div>
  );
};

export default AdminPeliculas;
