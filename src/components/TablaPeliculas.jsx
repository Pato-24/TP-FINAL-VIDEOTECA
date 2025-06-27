import './TablaPeliculas.css';
const TablaPeliculas = ({ peliculas, onEditar, onEliminar }) => {
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
        {peliculas.map((peli) => (
          <tr key={peli.id}>
            <td>{peli.titulo}</td>
            <td>{peli.genero}</td>
            <td>{peli.anio}</td>
            <td>{peli.sinopsis}</td>
            <td><img src={peli.imagenUrl}></img></td>
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
