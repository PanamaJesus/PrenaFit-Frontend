import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home/Home";
import ContenidoList from "./page/Contenido/ContenidoList";
import ContenidoUsuario from "./page/Contenido/ContenidoUsuario";
import IdxEmb from "./page/embarazadas/indexemb";
import IdxAdmin from "./page/admin/indexadmin";

// import Login from "./page/login/Login";
import IdxLogin from "./page/login/IdxLogin";
import './App.css';
import './index.css';

// ✅ Componente que protege rutas según rol
const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
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
        <Route path="/login" element={<IdxLogin />} />

        {/* ✅ Ruta protegida solo para admins */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <ContenidoList />
            </PrivateRoute>
          }
        />

        {/* ✅ Ruta protegida para usuario normal */}
        <Route
          path="/contenido"
          element={
            <PrivateRoute role="usuario">
              <ContenidoUsuario />
            </PrivateRoute>
          }
        />

        {/* ✅ Para compatibilidad con la ruta que ya tenías */}
        <Route
          path="/contenido-usuario"
          element={
            <PrivateRoute role="usuario">
              <ContenidoUsuario />
            </PrivateRoute>
          }
        />

        <Route path="/IdxEmb" element={< IdxEmb />} />
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
