import { useLocation, useNavigate } from "react-router-dom";
import "./Gracias.css";

const Gracias = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const titulo = location.state?.titulo || "la película seleccionada";

  return (
    <div className="gracias-container">
      <h2>¡Muchas gracias por alquilar!</h2>
      <p>En unos momentos podrá ver <strong>{titulo}</strong>.</p>
      <button className="btn-volver" onClick={() => navigate("/home")}>
        Volver al inicio
      </button>
    </div>
  );
};

export default Gracias;