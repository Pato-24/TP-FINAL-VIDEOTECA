import "./TablaClientes.css";

// Componente de tabla para mostrar la lista de clientes
// Recibe por props: 
// - clientes: array de clientes a mostrar
// - onEditar: función para editar un cliente
// - onEliminar: función para eliminar un cliente
const TablaClientes = ({ clientes, onEditar, onEliminar, onVerHistorial }) => {
  return (
    <table className="tabla-clientes">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Contacto</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cli) => (
          <tr key={cli.id}>
            <td>{cli.nombre}</td>
            <td>{cli.contacto}</td>
            <td>{cli.telefono}</td>
            <td>
              <button onClick={() => onEditar(cli)}>Editar</button>
              <button onClick={() => onEliminar(cli.id)}>Eliminar</button>
              {/* Botón para ver historial */}
              <button onClick={() => onVerHistorial(cli)}>Ver historial</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaClientes;