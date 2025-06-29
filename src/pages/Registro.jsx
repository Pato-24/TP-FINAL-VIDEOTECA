import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Login.css"; // Reutilizamos los estilos del login si querés

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const { data: usuarios } = await axios.get("http://localhost:3001/usuarios");
      const existe = usuarios.find((u) => u.usuario === usuario);

      if (existe) {
        setError("El nombre de usuario ya está en uso");
        return;
      }

      const nuevoUsuario = {
        nombre,
        usuario,
        password,
        rol: "cliente", // Podés cambiarlo si es necesario
      };

      await axios.post("http://localhost:3001/usuarios", nuevoUsuario);
      setMensaje("BIENVENIDO A VIDEOTECA TRANCAS, AHORA SÍ PODÉS DISFRUTAR DE LAS MEJORES PELÍCULAS");

      // Guardamos usuario en localStorage y redirigimos si querés
      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      setError("No se pudo registrar. Intentá nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegistro} className="login-form">
        <h2>Registro</h2>
        {mensaje && <p className="login-success">{mensaje}</p>}
        {error && <p className="login-error">{error}</p>}
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;