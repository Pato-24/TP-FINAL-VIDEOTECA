import { useEffect, useState } from "react";
import axios from "axios";
import "../components/Usuarios.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editUsuario, setEditUsuario] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRol, setEditRol] = useState("");

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [nuevoPassword, setNuevoPassword] = useState("");
  const [nuevoEmail, setNuevoEmail] = useState("");
  const [nuevoRol, setNuevoRol] = useState("cliente");

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

    if (
      window.confirm(
        `¿Estás seguro de eliminar a ${usuarioSeleccionado.nombre || usuarioSeleccionado.usuario}?`
      )
    ) {
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
    setEditNombre(usuario.nombre || "");
    setEditUsuario(usuario.usuario || "");
    setEditPassword(usuario.password || "");
    setEditEmail(usuario.email || "");
    setEditRol(usuario.rol || "cliente");
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    if (usuarioEditando.rol === "cliente" && editRol === "admin") {
      alert("❌ Un cliente no puede convertirse en administrador.");
      return;
    }

    try {
      const usuarioActualizado = {
        ...usuarioEditando,
        nombre: editNombre,
        usuario: editUsuario,
        password: editPassword,
        email: editEmail,
        rol: editRol,
      };

      await axios.put(
        `http://localhost:3001/usuarios/${usuarioActualizado.id}`,
        usuarioActualizado
      );
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
      );
      setUsuarioEditando(null);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const agregarUsuario = async (e) => {
    e.preventDefault();
    if (usuarios.some((u) => u.usuario === nuevoUsuario)) {
      alert("⚠️ Ese nombre de usuario ya existe.");
      return;
    }

    try {
      const nuevoUsuarioObj = {
        id: Math.max(...usuarios.map((u) => Number(u.id) || 0)) + 1,
        nombre: nuevoNombre,
        usuario: nuevoUsuario,
        password: nuevoPassword,
        email: nuevoEmail,
        rol: nuevoRol,
      };
      const { data } = await axios.post("http://localhost:3001/usuarios", nuevoUsuarioObj);
      setUsuarios([...usuarios, data]);
      setNuevoNombre("");
      setNuevoUsuario("");
      setNuevoPassword("");
      setNuevoEmail("");
      setNuevoRol("cliente");
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <div className="usuarios-container">
      <h2>Usuarios Registrados</h2>

      <form onSubmit={agregarUsuario} className="crear-form">
        <h3>Agregar Usuario</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Usuario"
          value={nuevoUsuario}
          onChange={(e) => setNuevoUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={nuevoPassword}
          onChange={(e) => setNuevoPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email (opcional)"
          value={nuevoEmail}
          onChange={(e) => setNuevoEmail(e.target.value)}
        />
        <select value={nuevoRol} onChange={(e) => setNuevoRol(e.target.value)}>
          <option value="cliente">cliente</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit">Agregar</button>
      </form>

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
          <input
            type="password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
          />
          <select value={editRol} onChange={(e) => setEditRol(e.target.value)}>
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
              <td>{u.nombre || "(sin nombre)"}</td>
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