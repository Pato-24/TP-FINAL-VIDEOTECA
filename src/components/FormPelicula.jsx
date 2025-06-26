import { useState, useEffect } from "react";

const FormPelicula = ({ onGuardar, peliculaSeleccionada, onCancelar }) => {
  const [pelicula, setPelicula] = useState({
    titulo: "",
    genero: "",
    anio: "",
    sinopsis: "",
  });

  // Cuando seleccionamos una película para editar, llenamos el formulario
  useEffect(() => {
    if (peliculaSeleccionada) {
      setPelicula(peliculaSeleccionada);
    }
  }, [peliculaSeleccionada]);

  // Se actualiza el valor de cada campo al escribir
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPelicula({ ...pelicula, [name]: value });
  };

  // Se ejecuta al presionar "Guardar"
  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(pelicula);
    setPelicula({ titulo: "", genero: "", anio: "", sinopsis: "" });
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
