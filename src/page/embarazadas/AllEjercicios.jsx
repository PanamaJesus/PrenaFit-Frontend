// AllEjercicios.jsx
import React, { useEffect, useState, useMemo } from "react";
// import NavbarE from "./NavEmb";

export default function AllEjercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [query, setQuery] = useState("");
  const [selectedSemana, setSelectedSemana] = useState("all"); // "all" | "1-12" | "13-27" | "28-40"
  const [selectedNivel, setSelectedNivel] = useState("all"); // "all" or "1","2","3"...

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/ejercicio/");
        const data = await res.json();
        setEjercicios(data);
      } catch (err) {
        console.error("Error al cargar ejercicios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEjercicios();
  }, []);

  // filtrado memoizado para rendimiento
  const ejerciciosFiltrados = useMemo(() => {
    return ejercicios.filter((item) => {
      // filtro por nombre (case-insensitive)
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (!String(item.nombre).toLowerCase().includes(q)) return false;
      }

      // filtro por semanas
      if (selectedSemana !== "all") {
        const s = Number(item.sug_semanas);
        if (selectedSemana === "1-12" && !(s >= 1 && s <= 12)) return false;
        if (selectedSemana === "13-27" && !(s >= 13 && s <= 27)) return false;
        if (selectedSemana === "28-40" && !(s >= 28 && s <= 40)) return false;
      }

      // filtro por nivel de esfuerzo
      if (selectedNivel !== "all") {
        // IMPORTANT: convertir ambos a Number para evitar mismatch string/number
        if (Number(item.nivel_esfuerzo) !== Number(selectedNivel)) return false;
      }

      return true;
    });
  }, [ejercicios, query, selectedSemana, selectedNivel]);

  return (
    <main className="relative min-h-screen overflow-x-hidden p-6">
      {/* <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div> */}
        {/* <NavbarE /> */}
      
      <div className="mt-28 px-6">
        <h1 className="text-3xl font-bold mb-6">Todos los Ejercicios</h1>

        {/* Barra de búsqueda / filtros */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
          />

          <select
            value={selectedSemana}
            onChange={(e) => setSelectedSemana(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">Filtrar por semanas</option>
            <option value="1-12">1 - 12 (1er trimestre)</option>
            <option value="13-27">13 - 27 (2do trimestre)</option>
            <option value="28-40">28 - 40 (3er trimestre)</option>
          </select>

          <select
            value={selectedNivel}
            onChange={(e) => setSelectedNivel(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">Filtrar por nivel de esfuerzo</option>
            <option value="1">1 - Bajo</option>
            <option value="2">2 - Moderado</option>
            <option value="3">3 - Alto</option>
          </select>

          <button
            onClick={() => {
              setQuery("");
              setSelectedSemana("all");
              setSelectedNivel("all");
            }}
            className="ml-auto px-4 py-2 bg-gray-100 rounded-lg"
          >
            Limpiar
          </button>
        </div>

        {/* Contenido */}
        {loading ? (
          <p>Cargando ejercicios...</p>
        ) : ejerciciosFiltrados.length === 0 ? (
          <p>No se encontraron ejercicios con esos filtros.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ejerciciosFiltrados.map((item) => (
              <article
                key={item.id}
                className="p-4 bg-white shadow rounded-2xl hover:shadow-lg transition"
              >
                <h2 className="font-semibold text-xl mb-2">{item.nombre}</h2>
                <p className="text-sm text-gray-600 mb-3">{item.descripcion}</p>

                <div className="flex justify-between text-sm text-gray-700">
                  <span>
                    <strong>Nivel:</strong> {item.nivel_esfuerzo}
                  </span>
                  <span>
                    <strong>Semana:</strong> {item.sug_semanas}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
