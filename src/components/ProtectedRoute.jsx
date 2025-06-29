import { Navigate } from "react-router-dom";

// Componente para proteger rutas según login y rol
// Recibe: children (el componente a renderizar), roles (array de roles permitidos)
const ProtectedRoute = ({ children, roles }) => {
  // Obtiene el usuario logueado desde localStorage
  const user = JSON.parse(localStorage.getItem("usuarioLogueado"));

  // Si no hay usuario logueado, redirige al login
  if (!user) return <Navigate to="/login" />;

  // Si se especifican roles y el usuario no tiene el rol adecuado, redirige al home
  if (roles && !roles.includes(user.rol)) return <Navigate to="/home" />;

  // Si pasa las validaciones, muestra el contenido protegido
  return children;
};

export default ProtectedRoute;