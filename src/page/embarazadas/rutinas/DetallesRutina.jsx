import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarE from '../NavEmb'
import Footer from '../../../components/Footer'

export default function DetallesRutina() {
const { slug } = useParams();
const [rutina, setRutina] = useState(null);
const [loading, setLoading] = useState(true);
const [comentario, setComentario] = useState("");
const [enviando, setEnviando] = useState(false);
const usuarioData = JSON.parse(localStorage.getItem("usuario") || "{}");console.log(usuarioData);
const usuarioId = usuarioData?.id;
const [pagina, setPagina] = useState(1);
const porPagina = 5;
const [mostrarResenas, setMostrarResenas] = useState(false);




    const enviarResena = async () => {
  if (!comentario.trim()) return;

  setEnviando(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/api/retroalimentacion/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rutina: rutina.id,
        usuario: usuarioId,
        comentario: comentario
      })
    });

    
    // const data = await res.json();
    const nuevaResena = await res.json();

    if (res.ok) {
        setPagina(1);


    nuevaResena.usuario = `${usuarioData.nombre_completo}`; // Agregar nombre completo al objeto de reseña}`;

      // agregar reseña a la lista sin recargar
     setRutina(prev => ({
        ...prev,
        reseñas: [nuevaResena, ...prev.reseñas],
        total_reseñas: prev.total_reseñas + 1
      }));
      setComentario("");
    }
  } catch (error) {
    console.error(error);
  }

  setEnviando(false);
};

  useEffect(() => {
    const fetchRutina = async () => {
      try {
        const nombreOriginal = slug.replace(/-/g, " ");
        console.log("Buscando rutina con nombre:", nombreOriginal);

        // Buscar por nombre
        const resNombre = await fetch("http://127.0.0.1:8000/api/rutina/buscar-por-nombre/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre: nombreOriginal }),
        });

        const dataNombre = await resNombre.json();
        console.log("Datos de rutina por nombre:", dataNombre);
        // if (!dataNombre.rutina) return setLoading(false);

        const rutinaId = dataNombre.id;
        console.log("ID de la rutina encontrada:", rutinaId);

        // Obtener detalle total
        const resDetalle = await fetch("http://127.0.0.1:8000/api/rutina/detalle-rutina/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rutina_id: rutinaId }),
        });

        const dataDetalle = await resDetalle.json();
        console.log("Detalle completo de la rutina:", dataDetalle);
        setRutina(dataDetalle);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRutina();
  }, [slug]);

  if (loading) return <p className="text-center p-6">Cargando...</p>;
  if (!rutina) return <p className="text-center p-6">No se encontró la rutina.</p>;
  const inicio = (pagina - 1) * porPagina;
const fin = inicio + porPagina;
const reseñasVisibles = rutina.reseñas.slice(inicio, fin);


  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <NavbarE />
      <div className="max-w-4xl mx-auto px-5 py-8 pt-24">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        {rutina.icono_url && (
          <img
            src={`http://127.0.0.1:8000${rutina.icono_url}`}
            className="w-20 h-20 rounded-xl shadow"
            alt="icono"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{rutina.nombre}</h1>
          <p className="text-gray-600">{rutina.descripcion}</p>
        </div>
      </div>

      {/* INFO PRINCIPAL */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="p-4 bg-white rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Semanas</p>
          <p className="text-xl font-bold">{rutina.sug_semanas_em}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Duración total</p>
          <p className="text-xl font-bold">{rutina.duracion_total_minutos} min</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Ejercicios</p>
          <p className="text-xl font-bold">{rutina.total_ejercicios}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Creador</p>
          <p className="font-semibold text-gray-700">{rutina.creado_por}</p>
        </div>

      </div>

      {/* EJERCICIOS */}
      <h2 className="text-2xl font-bold mb-3">Ejercicios incluidos</h2>

      <div className="space-y-4 mb-10">
        {rutina.ejercicios.map((e) => (
  <div
    key={e.id}
    className="p-4 bg-white rounded-xl shadow border flex gap-4"
  >

    {e.imagen_url && (
      <img
        src={`http://127.0.0.1:8000${e.imagen_url}`}
        className="w-28 h-28 object-cover rounded-lg"
      />
    )}

    <div className="flex-1">
      <h3 className="text-lg font-bold">{e.ejercicio.nombre}</h3>
      <p className="text-gray-500 text-sm">{e.ejercicio.descripcion}</p>

      <div className="flex gap-5 mt-3">
        <div className="text-center">
          <p className="text-xs text-gray-500">Series</p>
          <p className="font-bold">{e.series}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Reps</p>
          <p className="font-bold">{e.repeticiones}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Tiempo</p>
          <p className="font-bold">{e.tiempo_seg}s</p>
        </div>
      </div>
    </div>
  </div>
))}

      </div>

      {/* RESEÑAS */}
{/* RESEÑAS (con minimizar) */}
<div className="flex items-center justify-between mb-3">
  <h2 className="text-2xl font-bold">Reseñas ({rutina.total_reseñas})</h2>

  <button
    onClick={() => setMostrarResenas(prev => !prev)}
    className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
  >
    {mostrarResenas ? "Ocultar" : "Mostrar"}
  </button>
</div>

{mostrarResenas && (
  <>
    <div className="space-y-3">
      {reseñasVisibles.map((r, i) => (
        <div key={i} className="p-4 bg-gray-50 rounded-xl shadow">
  <div className="flex items-center gap-3 mb-2">

    {r.usuario_foto ? (
      <img
        src={`http://127.0.0.1:8000${r.usuario_foto}`}
        className="w-10 h-10 rounded-full object-cover border"
      />
    ) : (
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
        {r.usuario.charAt(0)}
      </div>
    )}

    <p className="font-semibold">{r.usuario}</p>
  </div>

  <p className="text-gray-700">{r.comentario}</p>
  <p className="text-xs text-gray-500 mt-1">
    {new Date(r.fecha).toLocaleString()}
  </p>
</div>
      ))}
    </div>

    {/* PAGINACIÓN */}
    <div className="flex justify-between mt-4">
      <button
        disabled={pagina === 1}
        onClick={() => setPagina(pagina - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
      >
        ← Anterior
      </button>

      <button
        disabled={fin >= rutina.reseñas.length}
        onClick={() => setPagina(pagina + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
      >
        Siguiente →
      </button>
    </div>
  </>
)}


      
 <h2 className="text-xl font-bold mt-6">Agregar reseña</h2>

<div className="mt-3 bg-white p-4 rounded-xl shadow border">

  <div className="flex gap-4 items-start">

    {/* FOTO DEL USUARIO */}
    <img
      src={
        usuarioData?.imagen_perfil
          ? `http://127.0.0.1:8000${usuarioData.imagen_perfil}`
          : "https://cdn-icons-png.flaticon.com/512/847/847969.png" // fallback
      }
      className="w-12 h-12 rounded-full object-cover border"
      alt="avatar"
    />

    {/* TEXTAREA */}
    <textarea
      value={comentario}
      onChange={(e) => setComentario(e.target.value)}
      className="flex-1 border rounded-lg p-3 resize-none"
      placeholder="Escribe tu opinión sobre esta rutina..."
      rows={3}
    />
  </div>

  {/* BOTÓN */}
  <button
    onClick={enviarResena}
    disabled={enviando}
    className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
  >
    {enviando ? "Enviando..." : "Enviar reseña"}
  </button>

</div>




      </div>
      <Footer />
    </main>
  );
}
