import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home/Home";
import ContenidoList from "./page/Contenido/ContenidoList";
import ContenidoUsuario from "./page/Contenido/ContenidoUsuario";
import IdxEmb from "./page/embarazadas/indexemb";
import IndexAdmin2 from "./page/admin/indexadmin2"; // ← Cambio aquí
import './index.css'
import MainEjerciciosAdmin from "./page/admin/EjerciciosAdmin.jsx";

import IdxLogin from "./page/login/IdxLogin";
import './App.css';
import './index.css';

// ✅ Componente que protege rutas según rol
const PrivateRoute = ({ children, role }) => {
  // Leer el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("usuario"));

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay rol definido y no coincide con el rol del usuario, redirige a /
  if (role && user.rol !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};


function App() {
  return (
    <Router>
      <Routes>
        
        {/* ✅ Página principal */}
        <Route path="/" element={<Home />} />

        {/* ✅ Login y Registro */}
        <Route path="/login" element={<IdxLogin />} />

        {/* ✅ Ruta protegida solo para admins - Ahora usa indexadmin2.jsx */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute role={1}>
              <IndexAdmin2 />
            </PrivateRoute>
          }
        />

        {/* ✅ Ruta protegida para usuario normal */}
        <Route
          path="/contenido"
          element={
            <ContenidoUsuario />
          }
        />

        {/* ✅ Para compatibilidad con la ruta que ya tenías */}
        <Route
          path="/contenido-usuario"
          element={
            <PrivateRoute role={2}>
              <ContenidoUsuario />
            </PrivateRoute>
          }
        />

        <Route path="/IdxEmb" element={<PrivateRoute role={1}><IndexAdmin2 /></PrivateRoute>} />
        <Route path="/IdxAdmin" element={<IndexAdmin2/>} />

      </Routes>
    </Router>
  );
}

export default App;