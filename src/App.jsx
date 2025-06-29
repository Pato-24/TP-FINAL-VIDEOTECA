import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Peliculas from "./pages/Peliculas";
import Clientes from "./pages/Clientes";
import Alquileres from "./pages/Alquileres";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Integrantes from "./pages/Integrantes";
import Registro from "./pages/Registro";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar visible en todas las páginas */}
      <Navbar />
      <Routes>
        {/* Redirección por defecto a /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Ruta pública: Home */}
        <Route path="/home" element={<Home />} />

        {/* Ruta pública: Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta pública: Registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Ruta pública: Integrantes */}
        <Route path="/integrantes" element={<Integrantes />} />

        {/* Rutas protegidas solo para admin */}
        <Route
          path="/peliculas"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Peliculas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Clientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alquileres"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Alquileres />
            </ProtectedRoute>
          }
        />

        {/* Ruta comodín para página no encontrada */}
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;