import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminPeliculas from "./pages/AdminPeliculas";
import AdminClientes from "./pages/AdminClientes";
import AdminAlquileres from "./pages/AdminAlquileres";
import HistorialClienteRoute from "./routes/HistorialCliente";
import ProtectedRoute from "./routes/protectedroute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
