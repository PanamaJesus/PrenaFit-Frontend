import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home/Home";
import ContenidoList from "./page/Contenido/ContenidoList";
import ContenidoUsuario from "./page/Contenido/ContenidoUsuario";
import IdxEmb from "./page/embarazadas/indexemb";
import IdxAdmin from "./page/admin/indexadmin";
import IndexEstadisticas from "./page/embarazadas/estadisticas/IndexEstadisticas.jsx";
import IndexRutinas from "./page/embarazadas/rutinas/IndexRutinas.jsx";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css' // <== IMPORTANTE
import MainEjerciciosAdmin from "./page/admin/EjerciciosAdmin.jsx";

// import Login from "./page/login/Login";
import IdxLogin from "./page/login/IdxLogin";
import './App.css';
import './index.css';

// ✅ Componente que protege rutas según rol
const PrivateRoute = ({ children, rol }) => {
  const userString = localStorage.getItem("usuario");
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem("accessToken");

  console.log("Usuario en PrivateRoute:", user);
  console.log("user.role:", user ? user.rol : "No user");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (rol && Number(user.rol) !== Number(rol)) {
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
            <PrivateRoute role={2}>
              <ContenidoUsuario />
            </PrivateRoute>
          }
        />

        <Route path="/IdxEmb" element={<PrivateRoute role={2}><IdxEmb /></PrivateRoute>} />
        <Route path="/Estadisticas" element={<PrivateRoute role={2}><IndexEstadisticas /></PrivateRoute>} />
        <Route path="/Rutinas" element={<PrivateRoute role={2}><IndexRutinas /></PrivateRoute>} />

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
