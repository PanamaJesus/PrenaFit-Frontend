import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home/Home";
import ContenidoList from "./page/Contenido/ContenidoList";
import ContenidoUsuario from "./page/Contenido/ContenidoUsuario";
import IdxEmb from "./page/embarazadas/indexemb";
import IndexAdmin2 from "./page/admin/indexadmin2"; // ← Cambio aquí
import './index.css'
import IdxAdmin from "./page/admin/indexadmin";
import IndexEstadisticas from "./page/embarazadas/estadisticas/IndexEstadisticas.jsx";
import IndexRutinas from "./page/embarazadas/rutinas/IndexRutinas.jsx";
import Ejercicios from "./page/embarazadas/Ejercicios.jsx";
import Profile from "./page/embarazadas/perfil.jsx";
import UpdateProfile from "./page/embarazadas/UpdateProfile.jsx";
import AllEjercicios from "./page/embarazadas/AllEjercicios.jsx";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css' // <== IMPORTANTE
import MainEjerciciosAdmin from "./page/admin/EjerciciosAdmin.jsx";

import IdxLogin from "./page/login/IdxLogin";
import './App.css';
import './index.css';

const PublicRoute = ({ children }) => {
  const userString = localStorage.getItem("usuario");
  const user = userString ? JSON.parse(userString) : null;

  // Si está logueado, lo mandamos a su pantalla según rol
  if (user) {
    if (user.rol === 1) return <Navigate to="/admin" replace />;
    if (user.rol === 2) return <Navigate to="/IdxEmb" replace />;
  }

  return children;
};

// ✅ Componente que protege rutas según rol
const PrivateRoute = ({ children, role }) => {
  const userString = localStorage.getItem("usuario");
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem("accessToken");

  console.log("Usuario en PrivateRoute:", user);
  console.log("user.rol:", user ? user.rol : "No user");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (role && Number(user.rol) !== Number(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// lo cambie porque me daba error en una cosa para el perfil

// const PrivateRoute = ({ children, rol }) => {
//   const userString = localStorage.getItem("usuario");
//   const user = userString ? JSON.parse(userString) : null;
//   const token = localStorage.getItem("accessToken");

//   console.log("Usuario en PrivateRoute:", user);
//   console.log("user.role:", user ? user.rol : "No user");

//   if (!user || !token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (rol && Number(user.rol) !== Number(rol)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

function App() {
  return (
    <Router>
      <Routes>
        
        {/*Página principal */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />

        {/*Login y Registro */}
        <Route path="/login" element={<PublicRoute><IdxLogin /></PublicRoute>} />

        {/* ✅ Ruta protegida solo para admins - Ahora usa indexadmin2.jsx */}
        {/* Ruta protegida solo para admins */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute role={1}>
              <IndexAdmin2 />
            </PrivateRoute>
          }
        />

        {/* ✅ Ruta protegida para usuario normal */}
        {/* <Route
          path="/contenido"
          element={
            <ContenidoUsuario />
          }
        /> */}

        {/* ✅ Para compatibilidad con la ruta que ya tenías */}
        <Route
          path="/contenido-usuario"
          element={
            <PrivateRoute rol={2}>
              <ContenidoUsuario />
            </PrivateRoute>
          }
        />

        <Route path="/IdxEmb" element={<PrivateRoute role={1}><IndexAdmin2 /></PrivateRoute>} />
        <Route path="/IdxAdmin" element={<IndexAdmin2/>} />
        <Route path="/IdxEmb" element={<PrivateRoute role={2}><IdxEmb /></PrivateRoute>} />
        <Route path="/Estadisticas" element={<PrivateRoute role={2}><IndexEstadisticas /></PrivateRoute>} />
        <Route path="/Rutinas" element={<PrivateRoute role={2}><IndexRutinas /></PrivateRoute>} />
        
        {/* Agregadas x chela */}
        <Route path="/Ejercicios" element={<PrivateRoute role={2}><Ejercicios /></PrivateRoute>} />
        <Route path="/Profile" element={<PrivateRoute role={2}><Profile /></PrivateRoute>} />
        <Route path="/UpdProfile" element={<PrivateRoute role={2}><UpdateProfile  /></PrivateRoute>} />
        {/* <Route path="/AllEjercicios" element={<PrivateRoute role={2}><AllEjercicios /></PrivateRoute>} /> */}
        <Route path="/IdxEmb" element={<PrivateRoute rol={2}><IdxEmb /></PrivateRoute>} />
        <Route path="/Estadisticas" element={<PrivateRoute rol={2}><IndexEstadisticas /></PrivateRoute>} />
        <Route path="/Rutinas" element={<PrivateRoute rol={2}><IndexRutinas /></PrivateRoute>} />

        


      </Routes>
    </Router>
  );
}

export default App;