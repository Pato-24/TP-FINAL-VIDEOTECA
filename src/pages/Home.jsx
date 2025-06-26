import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/peliculas").then((res) => {
      setPeliculas(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Catálogo de Películas</h1>
      <ul>
        {peliculas.map((peli) => (
          <li key={peli.id}>
            <strong>{peli.titulo}</strong> ({peli.anio}) - {peli.genero}
            <p>{peli.sinopsis}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;