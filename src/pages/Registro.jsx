import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Componente de registro de usuario
const Registro = () => {
    // Estados para los campos del formulario y control de errores/carga
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Función que maneja el envío del formulario de registro
  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Verifica si el usuario ya existe
      const { data } = await axios.get("http://localhost:3001/usuarios");
      const existe = data.find((u) => u.usuario === usuario);
      if (existe) {
        setError("El usuario ya existe");
        setLoading(false);
        return;
      }
      // Si no  existe, crea el nuevo usuario con rol "cliente"
      await axios.post("http://localhost:3001/usuarios", {
        nombre,
        usuario,
        password,
        email,
        rol: "cliente"
      });
      alert("¡Registro exitoso! Bienvenido a Videoteca Trancas.");
      // Redirige al login después del registro exitoso
      navigate("/login");
    } catch (err) {
      setError("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      {/* Formulario de registro */}
      <form onSubmit={handleRegistro} className="registro-form">
        <h2>Registro</h2>
        {/* Muestra mensaje de error si existe */}
        {error && <p className="registro-error">{error}</p>}
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Botón de registro, deshabilitado si falta algún campo o está cargando */}
        <button type="submit" disabled={!nombre || !usuario || !password || !email || loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        {/* Enlace para ir al login si ya tiene cuenta */}
        <p className="registro-link">
          ¿Ya tienes cuenta?{" "}
          <span onClick={() => navigate("/login")} className="link-login">
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
};

export default Registro;