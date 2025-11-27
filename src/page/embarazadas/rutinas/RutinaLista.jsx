import { useEffect, useState } from "react";

export default function RutinaLista() {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscador
  const [busqueda, setBusqueda] = useState("");

  // Selects
  const [rangoSemanas, setRangoSemanas] = useState("");
  const [rangoEjercicios, setRangoEjercicios] = useState("");
  const [duracionMax, setDuracionMax] = useState("");

  // Modal
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  const onClose = () => setRutinaSeleccionada(null);

  const intervalosSemanas = [
    "0-3", "4-8", "8-12", "12-16", "16-20",
    "20-24", "24-28", "28-32", "32-36", "36-40", "38-42"
  ];

  const intervalosEjercicios = ["0-4", "4-8", "8-12"];

  const intervalosDuracion = ["0-5", "5-10", "10-15", "15-20", "20-25", "25-30"];

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

  if (loading)
    return <p className="text-center text-lg font-semibold">Cargando rutinas...</p>;

  return (
    <div className="w-full mb-16 px-4">

      {/* 🔍 BUSCADOR Y SELECTS */}
      <div className="bg-white px-4 py-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="border rounded-lg p-2"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* SELECT DE SEMANAS */}
        <select
          className="border rounded-lg p-2"
          value={rangoSemanas}
          onChange={(e) => setRangoSemanas(e.target.value)}
        >
          <option value="">Filtrar por semanas</option>
          {intervalosSemanas.map((r, idx) => (
            <option key={idx} value={r}>{r} semanas</option>
          ))}
        </select>

        {/* SELECT DE EJERCICIOS */}
        <select
          className="border rounded-lg p-2"
          value={rangoEjercicios}
          onChange={(e) => setRangoEjercicios(e.target.value)}
        >
          <option value="">Filtrar por ejercicios</option>
          {intervalosEjercicios.map((r, idx) => (
            <option key={idx} value={r}>{r} ejercicios</option>
          ))}
        </select>

        {/* SELECT DE DURACIÓN */}
        <select
          className="border rounded-lg p-2"
          value={duracionMax}
          onChange={(e) => setDuracionMax(e.target.value)}
        >
          <option value="">Duración (min)</option>
          {intervalosDuracion.map((d, idx) => (
            <option key={idx} value={d}>{d} min</option>
          ))}
        </select>

      </div>

      {/* 🔥 TARJETAS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rutinasFiltradas.map((r) => (
          <div
            key={r.id}
            className="p-5 bg-white shadow rounded-xl hover:shadow-lg transition cursor-pointer border"
          >

            {/* ⭐ ICONO DE LA RUTINA */}
            {r.icono_url && (
              <img
                src={`http://127.0.0.1:8000${r.icono_url}`}
                alt="Icono rutina"
                className="w-14 h-14 mx-auto mb-3"
              />
            )}

            <h3 className="text-xl font-bold text-center mb-2">{r.nombre}</h3>
            <p className="text-gray-600 text-sm h-12 overflow-hidden text-center">{r.descripcion}</p>

            <div className="mt-4 text-sm">
              <p><strong>Creado por:</strong> {r.creado_por}</p>
              <p><strong>Semanas sugeridas:</strong> {r.sug_semanas_em}</p>
              <p><strong>Ejercicios:</strong> {r.total_ejercicios}</p>
              <p><strong>Duración (min):</strong> {r.duracion_total_minutos}</p>
            </div>

            <button
              onClick={() => setRutinaSeleccionada(r)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
