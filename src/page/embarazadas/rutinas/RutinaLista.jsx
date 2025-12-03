import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RutinaLista() {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Buscador
  const [busqueda, setBusqueda] = useState("");

  // Selects
  const [rangoSemanas, setRangoSemanas] = useState("");
  const [rangoEjercicios, setRangoEjercicios] = useState("");
  const [duracionMax, setDuracionMax] = useState("");

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const rutinasPorPagina = 12;

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/rutina/vista_basica/");
        const data = await res.json();
        setRutinas(data);
      } catch (error) {
        console.error("Error cargando rutinas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRutinas();
  }, []);

  // FILTRADO
  const rutinasFiltradas = rutinas.filter((r) => {
    const matchNombre = r.nombre.toLowerCase().includes(busqueda.toLowerCase());

    let matchSemanas = true;
    if (rangoSemanas !== "") {
      const [minS, maxS] = rangoSemanas.split("-").map(Number);
      matchSemanas = r.sug_semanas_em >= minS && r.sug_semanas_em <= maxS;
    }

    let matchEjercicios = true;
    if (rangoEjercicios !== "") {
      const [minE, maxE] = rangoEjercicios.split("-").map(Number);
      matchEjercicios = r.total_ejercicios >= minE && r.total_ejercicios <= maxE;
    }

    let matchDuracion = true;
    if (duracionMax !== "") {
      const [minD, maxD] = duracionMax.split("-").map(Number);
      matchDuracion =
        r.duracion_total_minutos >= minD &&
        r.duracion_total_minutos <= maxD;
    }

    return matchNombre && matchSemanas && matchEjercicios && matchDuracion;
  });

  // 🟦 PAGINACIÓN LÓGICA
  const totalPaginas = Math.ceil(rutinasFiltradas.length / rutinasPorPagina);

  const indexInicio = (currentPage - 1) * rutinasPorPagina;
  const indexFin = indexInicio + rutinasPorPagina;

  const rutinasPagina = rutinasFiltradas.slice(indexInicio, indexFin);

  const cambiarPagina = (num) => {
    setCurrentPage(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return <p className="text-center text-lg font-semibold">Cargando rutinas...</p>;

  return (
    <div className="w-full mb-16 px-4">

      {/* 🔍 BUSCADOR Y SELECTS */}
      <div className="bg-white px-4 py-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="border rounded-lg p-2"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="border rounded-lg p-2"
          value={rangoSemanas}
          onChange={(e) => { setRangoSemanas(e.target.value); setCurrentPage(1); }}
        >
          <option value="">Filtrar por semanas</option>
          {["0-3","4-8","8-12","12-16","16-20","20-24","24-28","28-32","32-36","36-40","38-42"]
            .map((r, i) => <option key={i} value={r}>{r} semanas</option>)}
        </select>

        <select
          className="border rounded-lg p-2"
          value={rangoEjercicios}
          onChange={(e) => { setRangoEjercicios(e.target.value); setCurrentPage(1); }}
        >
          <option value="">Filtrar por ejercicios</option>
          {["0-4", "4-8", "8-12"].map((r, i) => (
            <option key={i} value={r}>{r} ejercicios</option>
          ))}
        </select>

        <select
          className="border rounded-lg p-2"
          value={duracionMax}
          onChange={(e) => { setDuracionMax(e.target.value); setCurrentPage(1); }}
        >
          <option value="">Duración (min)</option>
          {["0-5","5-10","10-15","15-20","20-25","25-30"].map((d, i) => (
            <option key={i} value={d}>{d} min</option>
          ))}
        </select>
      </div>

      {/* 🔥 TARJETAS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rutinasPagina.map((r) => (
          <div key={r.id}
            className="p-5 bg-white shadow rounded-xl hover:shadow-lg transition cursor-pointer border">

            {r.icono_url && (
              <img
                src={`http://127.0.0.1:8000${r.icono_url}`}
                alt="Icono rutina"
                className="w-14 h-14 mx-auto mb-3"
              />
            )}

            <h3 className="text-xl font-bold text-center mb-2">{r.nombre}</h3>

            <p className="text-xs text-center mt-1 px-2 py-1 rounded-full inline-block bg-[#F8D9E4] text-[#B95E82] font-semibold">
              {r.creado_por ? `Creado por: ${r.creado_por}` : "Creador desconocido"}
            </p>

            <p className="text-gray-600 text-sm h-12 overflow-hidden text-center">{r.descripcion}</p>

            <div className="mt-4 text-sm">
              <p><strong>Semanas sugeridas:</strong> {r.sug_semanas_em}</p>
              <p><strong>Ejercicios:</strong> {r.total_ejercicios}</p>
              <p><strong>Duración (min):</strong> {r.duracion_total_minutos}</p>
            </div>

            <button
              onClick={() => {
                const slug = r.nombre.toLowerCase().replace(/ /g, "-");
                navigate(`/Rutina/${slug}`);
              }}
              className="mt-4 w-full bg-[#F39F9F] text-white py-2 rounded-lg hover:bg-[#d57a7a] transition"

>
              Ver detalles
            </button>
          </div>
        ))}
      </div>

      {/* 📌 PAGINACIÓN */}
      <div className="flex justify-center mt-8 space-x-2">

        {/* PREV */}
        <button
          disabled={currentPage === 1}
          onClick={() => cambiarPagina(currentPage - 1)}
          className={`px-3 py-2 rounded-lg font-semibold ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#F39F9F] text-white hover:bg-[#d57a7a]"
          }`}
        >
          ←
        </button>

        {/* NÚMEROS */}
        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            onClick={() => cambiarPagina(i + 1)}
            className={`px-4 py-2 rounded-lg font-semibold border ${
              currentPage === i
                ? "bg-[#F39F9F] text-white border-[#F39F9F]"
                : "bg-white text-[#F39F9F] border-[#F39F9F] hover:bg-[#F39F9F] hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={currentPage === totalPaginas}
          onClick={() => cambiarPagina(currentPage + 1)}
          className={`px-3 py-2 rounded-lg font-semibold ${
            currentPage === totalPaginas
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#F39F9F] text-white hover:bg-[#d57a7a]"
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
}
