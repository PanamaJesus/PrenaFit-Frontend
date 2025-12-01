import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RutinasSeleccionadas() {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  const navigate = useNavigate();
          const usuario = JSON.parse(localStorage.getItem("usuario"));



  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        if (!usuario || !usuario.id) return;

        const response = await fetch("http://127.0.0.1:8000/api/rutinasguardados/guardadas-usuario/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario_id: usuario.id }),
        });

        const data = await response.json();
        setRutinas(data);
      } catch (error) {
        console.error("Error al obtener rutinas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRutinas();
  }, []);

  const abrirModal = (rutina) => {
    setRutinaSeleccionada(rutina);
    console.log("rutina seleccionada:", rutina);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setRutinaSeleccionada(null);
    setModalOpen(false);
  };

  const eliminarRutina = async () => {
    console.log("body:", { rutina_id: rutinaSeleccionada.guardado_id, usuario_id: usuario.id });
    try {
      await fetch(`http://127.0.0.1:8000/api/rutinasguardados/eliminar-guardada/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rutina_id: rutinaSeleccionada.guardado_id, usuario_id: usuario.id }),
      });
      setRutinas(rutinas.filter(r => r.id !== rutinaSeleccionada.id));
      cerrarModal();
    } catch (error) {
      console.error("Error al eliminar rutina:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-gray-100 p-6 rounded-xl pb-14 shadow-lg relative">
        <div className="w-full flex justify-between items-center mb-4">

        <h2 className="text-xl font-semibold">Mis rutinas</h2>

    <button
    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
    onClick={() => navigate("/Administrar-rutinas")}
>
      Administrar rutinas
  </button>
</div>



        {loading ? (
          <p className="text-center text-gray-500">Cargando rutinas...</p>
        ) : !rutinas.length ? (
          <p className="text-center text-gray-500">No tienes rutinas guardadas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rutinas.map((rutina) => (
              <div
                key={rutina.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">{rutina.nombre}</h3>
                   <span
        className={
          "text-xs font-semibold px-2 py-1 rounded " +
          (rutina.es_publica
            ? "bg-green-200 text-green-800"
            : "bg-yellow-200 text-yellow-800")
        }
      >
        {rutina.es_publica ? "Pública" : "Privada"}
      </span>
                  <p className="text-gray-600 text-sm mb-1">
                    Duración: <span className="font-medium">{rutina.duracion_min} min</span>
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    Semanas: <span className="font-medium">{rutina.sug_semanas_em}</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Guardada el: {new Date(rutina.fecha_guardado).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() =>{ const slug = rutina.nombre.toLowerCase().replace(/ /g, "-");
                              navigate(`/Rutina/${slug}`);
                            }
                      }
                  className="mt-4 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Ver Detalles
                </button>
                <button
                  onClick={() => abrirModal(rutina)}
                  
                  className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal de confirmación */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80">
              <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
              <p className="text-gray-700 mb-6">
                ¿Seguro que deseas eliminar la rutina "{rutinaSeleccionada.nombre}"?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={eliminarRutina}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
