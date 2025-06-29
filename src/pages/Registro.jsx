import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      // Crea el nuevo usuario con rol "user"
      await axios.post("http://localhost:3001/usuarios", {
        usuario,
        password,
        email,
        rol: "user"
      });
      alert("¡Registro exitoso! Bienvenido a Videoteca Trancas, ahora puedes disfrutar de las mejores películas");
      navigate("/login");
    } catch (err) {
      setError("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleRegistro} className="registro-form">
        <h2>Registro</h2>
        {error && <p className="registro-error">{error}</p>}
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
        <button type="submit" disabled={!usuario || !password || !email || loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
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