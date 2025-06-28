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
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Título con el mismo estilo que Home */}
      <h1
        className="text-center mb-4 animate__animated animate__fadeInDown"
        style={{
          fontFamily: "'Bebas Neue', Arial, sans-serif",
          fontSize: "3.5rem",
          letterSpacing: "2px",
          color: "#fff",
          textShadow: "2px 2px 8px #0008",
        }}
      >
        Administración de Películas
      </h1>
      <div className="container">
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
    </div>
  );
};

export default AdminPeliculas;
