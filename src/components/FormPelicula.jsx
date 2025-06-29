import { useState, useEffect } from "react";

// Formulario para agregar o editar una película
const FormPelicula = ({ onGuardar, peliculaSeleccionada, onCancelar }) => {
  // Estado local para los campos del formulario
  const [pelicula, setPelicula] = useState({
    titulo: "",
    genero: "",
    anio: "",
    sinopsis: "",
    imagenUrl: ""
  });

  // Si se selecciona una película para editar, se cargan sus datos en el formulario
  useEffect(() => {
    if (peliculaSeleccionada) {
      setPelicula(peliculaSeleccionada);
    } else {
      setPelicula({ titulo: "", genero: "", anio: "", sinopsis: "", imagenUrl: "" });
    }
  }, [peliculaSeleccionada]);

  // Maneja el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPelicula({ ...pelicula, [name]: value });
  };

  // Maneja el envío del formulario (agregar o editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(pelicula); // Llama a la función recibida por props para guardar
    setPelicula({ titulo: "", genero: "", anio: "", sinopsis: "", imagenUrl: "" }); // Limpia el formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{peliculaSeleccionada ? "Editar Película" : "Agregar Película"}</h3>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={pelicula.titulo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="genero"
        placeholder="Género"
        value={pelicula.genero}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="anio"
        placeholder="Año"
        value={pelicula.anio}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="imagenUrl"
        placeholder="URL Imagen"
        value={pelicula.imagenUrl}
        onChange={handleChange}
        required
      />
      <textarea
        name="sinopsis"
        placeholder="Sinopsis"
        value={pelicula.sinopsis}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
      {peliculaSeleccionada && (
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default FormPelicula;