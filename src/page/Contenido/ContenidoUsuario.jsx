import { useEffect, useState } from "react";
import NavbarE from '../embarazadas/NavEmb';
import Footer from '../../components/Footer';

function ContenidoUsuario() {
  const [contenidos, setContenidos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [categoria, setCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Cargar contenidos
  useEffect(() => {
    fetch("http://localhost:8000/api/contenido/")
      .then((res) => res.json())
      .then((data) => setContenidos(data))
      .catch((err) => console.error("Error al cargar contenidos:", err));
  }, []);

  // Cargar tipos de tema
  useEffect(() => {
    fetch("http://localhost:8000/api/tipotema/")
      .then((res) => res.json())
      .then((data) => setTipos(data))
      .catch((err) => console.error("Error al cargar tipos:", err));
  }, []);

  // Filtrar por categoría y búsqueda
  const filtrados = contenidos.filter((item) => {
    const cumpleCategoria =
      categoria === "Todos" ||
      item.tema === tipos.find((t) => t.nombre === categoria)?.id;
    const cumpleBusqueda =
      item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.texto.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden">

<div className="absolute -top-28 -left-28 w-[500px] h-screen bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <NavbarE />
        <div className="mt-28 px-6">
          <h1 className="text-2xl font-bold mb-4">Contenido educativo</h1>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            {/* Selector de categoría */}
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option>Todos</option>
              {tipos.map((t) => (
                <option key={t.id}>{t.nombre}</option>
              ))}
            </select>

            {/* Barra de búsqueda */}
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border rounded px-3 py-2 flex-1"
            />
          </div>

          {/* Grid de contenidos */}
          <div className="grid md:grid-cols-3 gap-4">
            {filtrados.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold">{item.titulo}</h2>
                <p className="text-gray-600 mb-3">{item.texto}</p>
                <a
                  href={item.urls_img}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Ver artículo completo
                </a>
              </div>
            ))}

            {filtrados.length === 0 && (
              <p className="text-gray-500 col-span-full">No se encontraron resultados.</p>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}

export default ContenidoUsuario;
