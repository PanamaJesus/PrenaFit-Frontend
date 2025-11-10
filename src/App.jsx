import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home/Home";
import ContenidoList from "./page/Contenido/ContenidoList";
import ContenidoUsuario from "./page/Contenido/ContenidoUsuario";
import IdxEmb from "./page/embarazadas/indexemb";
import IdxAdmin from "./page/admin/indexadmin";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css' // <== IMPORTANTE
import MainEjerciciosAdmin from "./page/admin/EjerciciosAdmin.jsx";

import Login from "./page/login/Login";

import './App.css';
import './index.css';

// ✅ Componente que protege rutas según rol
const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(sessionStorage.getItem("usuario"));
  const token = localStorage.getItem("accessToken");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
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
        <Route path="/login" element={<Login />} />

        {/* ✅ Ruta protegida solo para admins */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role={1}>
              <ContenidoList />
              <MainEjerciciosAdmin/>
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

        <Route path="/IdxEmb" element={<PrivateRoute role={1}><IdxAdmin /></PrivateRoute>} />
        <Route path="/IdxAdmin" element={< IdxAdmin />} />


      </Routes>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./page/Home/Home";
// import ContenidoList from "./page/Contenido/ContenidoList";
// import ContenidoUsuario from "./page/Contenido/ContenidoUsuario";
// import './App.css';
// import './index.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/admin" element={<ContenidoList />} />
//         <Route path="/contenido" element={<ContenidoUsuario />} />
//         <Route path="/contenido-usuario" element={<ContenidoUsuario />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
