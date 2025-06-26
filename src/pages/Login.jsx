import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        localStorage.setItem("usuario", JSON.stringify(user));
        navigate("/admin");
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
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        autoFocus
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={!usuario || !password || loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default Login;