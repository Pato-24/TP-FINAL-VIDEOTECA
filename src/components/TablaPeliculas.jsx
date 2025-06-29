import './TablaPeliculas.css';

// Componente de tabla para mostrar la lista de películas
// Recibe por props: 
// - peliculas: array de películas a mostrar
// - onEditar: función para editar una película
// - onEliminar: función para eliminar una película
const TablaPeliculas = ({ peliculas, onEditar, onEliminar }) => {
  // Obtiene el usuario logueado desde localStorage
  const user = JSON.parse(localStorage.getItem("usuarioLogueado"));

  return (
    <table className="tabla-peliculas">
      <thead>
        <tr>
          <th>Título</th>
          <th>Género</th>
          <th>Año</th>
          <th>Sinopsis</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Recorre el array de películas y muestra cada una en una fila */}
        {peliculas.map((peli) => (
          <tr key={peli.id}>
            <td>{peli.titulo}</td>
            <td>{peli.genero}</td>
            <td>{peli.anio}</td>
            <td>{peli.sinopsis}</td>
            <td>
              {/* Muestra la imagen de la película */}
              <img
                src={peli.imagenUrl}
                alt={peli.titulo}
                style={{ width: "80px", height: "120px", objectFit: "cover", borderRadius: "8px" }}
              />
            </td>
            <td>
              {/* Solo muestra los botones si el usuario es admin */}
              {user && user.rol === "admin" && (
                <>
                  {/* Botón para editar la película */}
                  <button onClick={() => onEditar(peli)}>Editar</button>
                  {/* Botón para eliminar la película */}
                  <button onClick={() => onEliminar(peli.id)}>Eliminar</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPeliculas;