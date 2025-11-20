import { useEffect, useState } from "react";

export default function RutinaLista() {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscador
  const [busqueda, setBusqueda] = useState("");

  // Selects nuevos
  const [rangoSemanas, setRangoSemanas] = useState("");
  const [rangoEjercicios, setRangoEjercicios] = useState("");
  const [duracionMax, setDuracionMax] = useState(""); // ⭐ NUEVO

  // Modal
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  const onClose = () => setRutinaSeleccionada(null);

  // Intervalos de semanas (4 en 4 hasta 42)
  const intervalosSemanas = [
    "0-3","4-8", "8-12", "12-16", "16-20",
    "20-24", "24-28", "28-32", "32-36", "36-40", "38-42"
  ];

  // Intervalos de ejercicios (4 en 4 hasta 12)
  const intervalosEjercicios = ["0-4", "4-8", "8-12"];

  // Intervalos de duración en minutos (hasta 30)
  const intervalosDuracion = ["0-5", "5-10", "10-15", "15-20", "20-25", "25-30"]; // ⭐ NUEVO

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/rutina/con-ejercicios/");
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

    // Filtrar por intervalo de semanas
    let matchSemanas = true;
    if (rangoSemanas !== "") {
      const [minS, maxS] = rangoSemanas.split("-").map(Number);
      matchSemanas = r.sug_semanas_em >= minS && r.sug_semanas_em <= maxS;
    }

    // Filtrar por intervalo de ejercicios
    let matchEjercicios = true;
    if (rangoEjercicios !== "") {
      const [minE, maxE] = rangoEjercicios.split("-").map(Number);
      matchEjercicios = r.total_ejercicios >= minE && r.total_ejercicios <= maxE;
    }

    // ⭐ FILTRAR POR DURACIÓN MÁXIMA
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

        {/* ⭐ SELECT DE DURACIÓN */}
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rutinasFiltradas.map((r) => (
          <div
            key={r.id}
            className="p-5 bg-white shadow rounded-xl hover:shadow-lg transition cursor-pointer border"
          >
            <h3 className="text-xl font-bold mb-2">{r.nombre}</h3>
            <p className="text-gray-600 text-sm h-12 overflow-hidden">{r.descripcion}</p>

            <div className="mt-4 text-sm">
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

      {/* 🟣 MODAL */}
      {rutinaSeleccionada && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden animate-fadeIn">

            <div className="bg-yellow-400 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {rutinaSeleccionada.nombre}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-900 text-xl font-bold hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 font-semibold">Ejercicios totales</p>
                  <p className="text-lg font-medium text-gray-800">
                    {rutinaSeleccionada.total_ejercicios}
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 font-semibold">Duración (min)</p>
                  <p className="text-lg font-medium text-gray-800">
                    {rutinaSeleccionada.duracion_total_minutos}
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 font-semibold">Semanas</p>
                  <p className="text-lg font-medium text-gray-800">
                    {rutinaSeleccionada.sug_semanas_em}
                  </p>
                </div>
              </div>

              {/* LISTA DE EJERCICIOS */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Ejercicios incluidos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(rutinaSeleccionada.ejercicios || []).map((ej, i) => (
                    <div
                      key={i}
                      className="border p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition"
                    >
                      <p className="text-sm font-medium text-gray-700 text-center">
                        {ej.ejercicio?.nombre || "Sin nombre"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="px-6 py-4 bg-gray-100 flex justify-end gap-4 border-t">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cerrar
              </button>

              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Seleccionar rutina
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
