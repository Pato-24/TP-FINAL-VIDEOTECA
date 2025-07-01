import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Peliculas from "./pages/Peliculas";
import Clientes from "./pages/Clientes";
import Alquileres from "./pages/Alquileres";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Integrantes from "./pages/Integrantes";
import Usuarios from "./pages/Usuarios";
import Gracias from "./pages/Gracias";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        {/* Redirección por defecto a /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Rutas públicas */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/integrantes" element={<Integrantes />} />

        {/* Ruta pública: Gracias */}
        <Route path="/gracias" element={<Gracias />} />

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
         <Route
          path="/usuarios" 
          element={
            <ProtectedRoute roles={["admin"]}>
              <Usuarios />
            </ProtectedRoute>
          }
        />
          {/* Ruta comodín para página no encontrada */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>Página no encontrada</h2>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;