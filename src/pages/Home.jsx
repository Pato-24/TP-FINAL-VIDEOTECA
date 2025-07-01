import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addAlquiler } from "../services/alquileres"; // importa tu servicio

const Home = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/peliculas").then((res) => {
      setPeliculas(res.data);
    });
  }, []);
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }
  }, []);
  const peliculasFiltradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.genero.toLowerCase().includes(busqueda.toLowerCase())
);
  const handleAlquilar = async (pelicula) => {
    // Genera fechas (puedes personalizar)
    const hoy = new Date();
    const fechaInicio = hoy.toISOString().slice(0, 10);
    const fechaFin = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    // Crea el objeto alquiler
    const nuevoAlquiler = {
      clienteId: user.id,
      peliculaId: pelicula.id,
      fechaInicio,
      fechaFin,
      devuelto: false
    };

    // Guarda el alquiler en la base de datos
    await addAlquiler(nuevoAlquiler);

    // Redirige a la página de gracias
    navigate("/gracias", { state: { titulo: pelicula.titulo } });
  };
  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
      }}
    >
      <h1
        className="text-center mb-4 animate__animated animate__fadeInDown"
        style={{
          fontFamily: "'Bebas Neue', Arial, sans-serif",
          fontSize: "3.5rem",
          letterSpacing: "2px",
          color: "#fff",
          textShadow: "2px 2px 8px #0008",
        }}
      >
        Catálogo de Películas
      </h1>
      <input
        type="text"
        placeholder="Buscar película..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className="form-control mb-4"
      />
      <div className="alert alert-warning text-center fw-bold mb-5 animate__animated animate__fadeIn">
        Para alquilar alguna de estas películas, debes registrarte o iniciar sesión.
      </div>
      <div className="row g-4 justify-content-center">
        {peliculasFiltradas.map((peli, idx) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
            key={peli.id}
          >
            <div
              className={`card h-100 shadow-lg w-100 animate__animated animate__zoomIn`}
              style={{
                background: "#23272b",
                border: "none",
                color: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                minHeight: "500px",
              }}
            >
              <img
                src={peli.imagenUrl}
                alt={peli.titulo}
                className="card-img-top mx-auto mt-3"
                style={{
                  height: "340px",
                  width: "90%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 16px #0006",
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title text-center mb-2"
                  style={{
                    fontFamily: "'Bebas Neue', Arial, sans-serif",
                    fontSize: "1.7rem",
                    letterSpacing: "1px",
                  }}
                >
                  {peli.titulo}
                </h5>
                <h6 className="card-subtitle mb-2 text-info text-center">
                  ({peli.anio}) - {peli.genero}
                </h6>
                <div
                  className="card-text flex-grow-1 mb-2"
                  style={{
                    maxHeight: "90px",
                    overflowY: "auto",
                    fontSize: "1rem",
                    color: "#e0e0e0",
                    background: "rgba(0,0,0,0.10)",
                    borderRadius: "6px",
                    padding: "6px",
                  }}
                >
                  {peli.sinopsis}
                </div>
                {user && user.rol === "cliente" && (
                  <button
                    className="btn btn-success mt-2"
                    onClick={() => handleAlquilar(peli)}
                  >
                    Alquilar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;