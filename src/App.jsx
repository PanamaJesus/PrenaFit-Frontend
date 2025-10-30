import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import ContenidoList from "./page/Contenido/ContenidoList";
import ContenidoUsuario from "./page/Contenido/ContenidoUsuario";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<ContenidoList />} />
        <Route path="/contenido" element={<ContenidoUsuario />} />
        <Route path="/contenido-usuario" element={<ContenidoUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
