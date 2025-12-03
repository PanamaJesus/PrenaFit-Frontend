import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RutinaLista() {
    const [rutinas, setRutinas] = useState([]); // Todas las rutinas públicas
    const [rutinasRecomendadas, setRutinasRecomendadas] = useState([]); // Rutinas del modelo ML
    const [loading, setLoading] = useState(true);
    const [loadingRecomendacion, setLoadingRecomendacion] = useState(false);
    const [modoRecomendacion, setModoRecomendacion] = useState(false); // Bandera para activar/desactivar ML
    
    // ✅ Estado para el ID del usuario (obtenido de localStorage)
    const [userId, setUserId] = useState(null); 
    
    const navigate = useNavigate();

    // Buscador y filtros
    const [busqueda, setBusqueda] = useState("");
    const [rangoSemanas, setRangoSemanas] = useState("");
    const [rangoEjercicios, setRangoEjercicios] = useState("");
    const [duracionMax, setDuracionMax] = useState("");

    // Modal (sin cambios)
    const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
    const onClose = () => setRutinaSeleccionada(null);

    const intervalosSemanas = [
        "0-3", "4-8", "8-12", "12-16", "16-20",
        "20-24", "24-28", "28-32", "32-36", "36-40", "38-42"
    ];
    const intervalosEjercicios = ["0-4", "4-8", "8-12"];
    const intervalosDuracion = ["0-5", "5-10", "10-15", "15-20", "20-25", "25-30"];

    // 1. Carga inicial de TODAS las rutinas Y obtención del ID
    useEffect(() => {
        // --- OBTENCIÓN DEL ID DESDE localStorage ---
        const userString = localStorage.getItem("usuario");
        const user = userString ? JSON.parse(userString) : null;
        const currentUserId = user ? user.id : null;

        if (currentUserId) {
            setUserId(currentUserId); // Guarda el ID en el estado
        } else {
            console.warn("No se encontró el ID del usuario. La recomendación ML estará deshabilitada.");
        }
        
        const fetchRutinas = async () => {
            try {
                // Endpoint para cargar todas las rutinas (vista básica)
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
    }, []); // Se ejecuta solo al montar el componente

    // 2. 🔥 Función para activar y cargar la recomendación ML 🔥
    const manejarRecomendacion = async () => {
        if (modoRecomendacion) {
            // Vuelve al modo normal
            setModoRecomendacion(false);
            // Limpia los filtros al cambiar de modo
            setBusqueda(""); 
            setRangoSemanas("");
            setRangoEjercicios("");
            setDuracionMax("");
            return;
        }

        // ✅ Verifica que el ID esté disponible antes de continuar
        if (!userId) { 
            alert("Necesitas iniciar sesión para obtener una recomendación personalizada.");
            setModoRecomendacion(false); 
            return;
        }

        // Activa el modo y carga las rutinas recomendadas
        setLoadingRecomendacion(true);
        setModoRecomendacion(true);

        try {
            // ✅ Usa el ID del estado para llamar al endpoint ML
            const urlRecomendacion = `http://127.0.0.1:8000/api/recomendacion/lista/${userId}/`;
            const res = await fetch(urlRecomendacion);
            const data = await res.json();
            
            setRutinasRecomendadas(data);
        } catch (error) {
            console.error("Error cargando rutinas recomendadas:", error);
            setModoRecomendacion(false); 
        } finally {
            setLoadingRecomendacion(false);
        }
    };


    // 3. Lógica de Filtrado (Aplica filtros a la lista ACTIVA)
    const listaActiva = modoRecomendacion ? rutinasRecomendadas : rutinas;

    const rutinasFiltradas = listaActiva.filter((r) => {
        const matchNombre = r.nombre.toLowerCase().includes(busqueda.toLowerCase());

        let matchSemanas = true;
        if (rangoSemanas !== "") {
            const [minS, maxS] = rangoSemanas.split("-").map(Number);
            // Filtro solo aplica a la lista completa si no estamos en modo recomendación
            if (!modoRecomendacion) {
                matchSemanas = r.sug_semanas_em >= minS && r.sug_semanas_em <= maxS;
            }
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

    if (loading || loadingRecomendacion)
        return <p className="text-center text-lg font-semibold">Cargando rutinas...</p>;

    return (
        <div className="w-full mb-16 px-4">

            {/* 🔥 BOTÓN DE RECOMENDACIÓN ML 🔥 */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={manejarRecomendacion}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        modoRecomendacion
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                    // Deshabilitado si está cargando o si no hay ID de usuario
                    disabled={loadingRecomendacion || !userId} 
                >
                    {loadingRecomendacion
                        ? "Analizando..."
                        : modoRecomendacion
                        ? "Ver TODAS las Rutinas"
                        : "Recomendación Personalizada (ML)"}
                </button>
            </div>


            {/* 🔍 BUSCADOR Y SELECTS */}
            <div className="bg-white px-4 py-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* BUSCADOR */}
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    className="border rounded-lg p-2"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    disabled={loadingRecomendacion} 
                />

                {/* SELECT DE SEMANAS (Deshabilitado en modo ML) */}
                <select
                    className={`border rounded-lg p-2 ${modoRecomendacion ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                    value={rangoSemanas}
                    onChange={(e) => setRangoSemanas(e.target.value)}
                    disabled={modoRecomendacion || loadingRecomendacion} 
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
                    disabled={loadingRecomendacion}
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
                    disabled={loadingRecomendacion}
                >
                    <option value="">Duración (min)</option>
                    {intervalosDuracion.map((d, idx) => (
                        <option key={idx} value={d}>{d} min</option>
                    ))}
                </select>

            </div>

            {/* Mensaje si no hay rutinas */}
            {rutinasFiltradas.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    {modoRecomendacion 
                        ? "El modelo no encontró rutinas adecuadas para tus parámetros de salud."
                        : "No se encontraron rutinas que coincidan con los filtros aplicados."
                    }
                </p>
            )}


            {/* 🔥 TARJETAS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {rutinasFiltradas.map((r) => (
                    <div
                        key={r.id}
                        className="p-5 bg-white shadow rounded-xl hover:shadow-lg transition cursor-pointer border relative"
                    >
                         {/* ✅ Etiqueta de Recomendación con Score ML (SOLO en modo ML) */}
                        {modoRecomendacion && r.score_ml && (
                            <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                                ML Score: {r.score_ml}
                            </span>
                        )}

                        {r.icono_url && (
                            <img
                                src={`http://127.0.0.1:8000${r.icono_url}`}
                                alt="Icono rutina"
                                className="w-14 h-14 mx-auto mb-3"
                            />
                        )}

                        <h3 className="text-xl font-bold text-center mb-2">{r.nombre}</h3>
                        
                        <p className="text-xs text-center mt-1 px-2 py-1 rounded-full inline-block
                            bg-purple-100 text-purple-700 font-semibold">
                            {r.creado_por ? `Creado por: ${r.creado_por}` : "Creador desconocido"}
                        </p>

                        <p className="text-gray-600 text-sm h-12 overflow-hidden text-center mt-2">{r.descripcion}</p>

                        <div className="mt-4 text-sm">
                            <p><strong>Semanas sugeridas:</strong> {r.sug_semanas_em}</p>
                            <p><strong>Ejercicios:</strong> {r.total_ejercicios}</p>
                            <p><strong>Duración (min):</strong> {r.duracion_total_minutos}</p>
                        </div>

                        <button
                            onClick={() => {
                                // Lógica de slug seguro (normalización)
                                const slug = r.nombre
                                    .toLowerCase()
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    .replace(/[^a-z0-9 -]/g, "")
                                    .replace(/\s+/g, "-") 
                                    .replace(/-+/g, "-");
                                navigate(`/Rutina/${slug}`);
                            }}
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