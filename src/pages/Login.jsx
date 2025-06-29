import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/Login.css"; // Asegurate de que la ruta sea correcta

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get("http://localhost:3001/usuarios");
      const user = data.find(
        (u) => u.usuario === usuario && u.password === password
      );

      if (user) {
        // Guarda el usuario logueado en localStorage
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));
        // Redirige según el rol
        if (user.rol === "admin") {
          navigate("/peliculas");
        } else {
          navigate("/home");
        }
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="login-error">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
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
        <button type="submit" disabled={!usuario || !password || loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        {/* Link de registro */}
        <p className="login-link">
          ¿No tenés cuenta?{" "}
          <span onClick={() => navigate("/registro")} className="link-registrate">
            Registrate gratis
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;