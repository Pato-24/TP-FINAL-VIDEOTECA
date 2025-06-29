// Componente de tabla para mostrar la lista de alquileres
// Recibe por props: 
// - alquileres: array de alquileres a mostrar
// - clientes: array de clientes para mostrar el nombre
// - peliculas: array de películas para mostrar el título
// - onEditar: función para editar un alquiler
// - onEliminar: función para eliminar un alquiler
import "./TablaAlquileres.css";
const TablaAlquileres = ({ alquileres, clientes, peliculas, onEditar, onEliminar }) => {
  // Función para obtener el nombre del cliente por ID
  const getNombreCliente = (id) => {
    const cliente = clientes.find(c => String(c.id) === String(id));
    return cliente ? cliente.nombre : "Desconocido";
  };

  // Función para obtener el título de la película por ID
  const getTituloPelicula = (id) => {
    const peli = peliculas.find(p => String(p.id) === String(id));
    return peli ? peli.titulo : "Desconocida";
  };

  return (
    <table className="tabla-alquileres">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Película</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Devuelto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alquileres.map((alq) => (
          <tr key={alq.id}>
            <td>{getNombreCliente(alq.clienteId)}</td>
            <td>{getTituloPelicula(alq.peliculaId)}</td>
            <td>{alq.fechaInicio}</td>
            <td>{alq.fechaFin}</td>
            <td>{alq.devuelto ? "Sí" : "No"}</td>
            <td>
              <button onClick={() => onEditar(alq)}>Editar</button>
              <button onClick={() => onEliminar(alq.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaAlquileres;