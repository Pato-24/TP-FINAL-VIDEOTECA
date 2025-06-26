const TablaPeliculas = ({ peliculas, onEditar, onEliminar }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Título</th>
          <th>Género</th>
          <th>Año</th>
          <th>Sinopsis</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {peliculas.map((peli) => (
          <tr key={peli.id}>
            <td>{peli.titulo}</td>
            <td>{peli.genero}</td>
            <td>{peli.anio}</td>
            <td>{peli.sinopsis}</td>
            <td>
              <button onClick={() => onEditar(peli)}>Editar</button>
              <button onClick={() => onEliminar(peli.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPeliculas;
