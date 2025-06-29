import { useEffect, useState } from "react";
import axios from "axios";
import "../components/Usuarios.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editUsuario, setEditUsuario] = useState("");
  const [editRol, setEditRol] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/usuarios");
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    const usuarioSeleccionado = usuarios.find((u) => u.id === id);
    if (usuarioSeleccionado?.rol === "admin") {
      alert("❌ No se puede eliminar a un administrador.");
      return;
    }

    if (window.confirm(`¿Estás seguro de eliminar a ${usuarioSeleccionado.nombre}?`)) {
      try {
        await axios.delete(`http://localhost:3001/usuarios/${id}`);
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  const seleccionarUsuario = (usuario) => {
    setUsuarioEditando(usuario);
    setEditNombre(usuario.nombre);
    setEditUsuario(usuario.usuario);
    setEditRol(usuario.rol);
  };

  const guardarCambios = async (e) => {
    e.preventDefault();

    // 🚫 Prevención: no permitir que un cliente se convierta en admin
    if (usuarioEditando.rol === "cliente" && editRol === "admin") {
      alert("❌ Un cliente no puede convertirse en administrador.");
      return;
    }

    try {
      const usuarioActualizado = {
        ...usuarioEditando,
        nombre: editNombre,
        usuario: editUsuario,
        rol: editRol,
      };

      await axios.put(`http://localhost:3001/usuarios/${usuarioActualizado.id}`, usuarioActualizado);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
      );

      setUsuarioEditando(null);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return (
    <div className="usuarios-container">
      <h2>Usuarios Registrados</h2>

      {usuarioEditando && (
        <form onSubmit={guardarCambios} className="editar-form">
          <h3>Editar Usuario</h3>
          <input
            type="text"
            value={editNombre}
            onChange={(e) => setEditNombre(e.target.value)}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            value={editUsuario}
            onChange={(e) => setEditUsuario(e.target.value)}
            placeholder="Usuario"
            required
          />
          <select
            value={editRol}
            onChange={(e) => setEditRol(e.target.value)}
          >
            <option value="cliente">cliente</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => setUsuarioEditando(null)}>
            Cancelar
          </button>
        </form>
      )}

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.usuario}</td>
              <td>{u.rol}</td>
              <td>
                <button onClick={() => eliminarUsuario(u.id)} className="btn-eliminar">
                  Eliminar
                </button>
                <button onClick={() => seleccionarUsuario(u)} className="btn-editar">
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;