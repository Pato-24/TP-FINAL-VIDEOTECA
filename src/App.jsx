import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPeliculas from "./pages/AdminPeliculas";
import AdminClientes from "./pages/AdminClientes";
import AdminAlquileres from "./pages/AdminAlquileres";
import HistorialClienteRoute from "./routes/HistorialCliente";
import ProtectedRoute from "./routes/protectedroute";
import Navbar from "./components/Navbar";
import Integrantes from "./pages/Integrantes";
import Registro from "./pages/Registro";
import Usuarios from "./pages/Usuarios";




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPeliculas />
            </ProtectedRoute>
          }
        />
        <Route path="/clientes" element={<AdminClientes />} />
        <Route path="/alquileres" element={<AdminAlquileres />} />
        <Route path="/clientes/:clienteId/historial" element={<HistorialClienteRoute />} />
        <Route path="/peliculas" element={<AdminPeliculas />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/registro" element={<Registro />} />
          <Route path="/usuarios" element={<Usuarios />} />

      </Routes>
    </Router>
  );
}

export default App;

