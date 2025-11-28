// Rutinas.jsx
import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Plus, Search, X } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/rutina/";

const Rutinas = () => {
  const [rutinas, setRutinas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingRutina, setEditingRutina] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    sug_semanas_em: "",
  });

  // ------------------------ GET RUTINAS ------------------------
  const obtenerRutinas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRutinas(data);
    } catch (error) {
      console.error("Error al obtener rutinas:", error);
    }
  };

  useEffect(() => {
    obtenerRutinas();
  }, []);

  // ------------------------ CREAR / EDITAR ------------------------
  const manejarSubmit = async (e) => {
    e.preventDefault();
    const esEdicion = Boolean(editingRutina);

    try {
      const res = await fetch(
        esEdicion ? `${API_URL}${editingRutina.id}/` : API_URL,
        {
          method: esEdicion ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        alert("Error al guardar la rutina");
        return;
      }

      setOpenModal(false);
      setEditingRutina(null);
      setFormData({ nombre: "", descripcion: "", sug_semanas_em: "" });
      obtenerRutinas();
    } catch (error) {
      console.error("Error al guardar rutina:", error);
    }
  };

  // ------------------------ ELIMINAR ------------------------
  const eliminarRutina = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta rutina?")) return;

    try {
      await fetch(`${API_URL}${id}/`, { method: "DELETE" });
      obtenerRutinas();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // ------------------------ FILTRO DE BÚSQUEDA ------------------------
  const filteredRutinas = rutinas.filter((rutina) =>
    rutina.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rutina.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ------------------------ ABRIR MODAL ------------------------
  const abrirModalCrear = () => {
    setEditingRutina(null);
    setFormData({ nombre: "", descripcion: "", sug_semanas_em: "" });
    setOpenModal(true);
  };

  const abrirModalEditar = (rutina) => {
    setEditingRutina(rutina);
    setFormData({
      nombre: rutina.nombre,
      descripcion: rutina.descripcion,
      sug_semanas_em: rutina.sug_semanas_em,
    });
    setOpenModal(true);
  };

  return (
    <div className="p-0 m-0 min-h-full w-full bg-white">

      {/* --- HEADER --- */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "#722323" }}>
              Gestión de Rutinas
            </h1>
            <p style={{ color: "#BA487F" }}>
              Administra las rutinas de ejercicios del sistema
            </p>
          </div>

          {/* Botón Nueva Rutina */}
          <button
            onClick={abrirModalCrear}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all font-medium hover:shadow-lg transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #722323 0%, #BA487F 100%)",
            }}
          >
            <Plus size={20} />
            Nueva Rutina
          </button>
        </div>

        {/* Búsqueda */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            style={{ color: "#BA487F" }}
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
            style={{ borderColor: "#FFECCC", "--tw-ring-color": "#BA487F" }}
            onFocus={(e) => (e.target.style.borderColor = "#BA487F")}
            onBlur={(e) => (e.target.style.borderColor = "#FFECCC")}
          />
        </div>
      </div>

      {/* --- TABLA --- */}
      <div className="mx-6 mb-6">
        <div className="bg-white rounded-xl shadow-md border-2" style={{ borderColor: "#BA487F" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: "#FFECCC" }}>
                <tr>
                  {["ID", "Nombre", "Descripción", "Semanas sugeridas", "Acciones"].map((t) => (
                    <th
                      key={t}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#722323" }}
                    >
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredRutinas.map((rutina) => (
                  <tr
                    key={rutina.id}
                    className="border-b transition-colors"
                    style={{ borderBottomColor: "#FFECCC" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFECC0")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold" style={{ color: "#722323" }}>
                        #{rutina.id}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{
                            background: "linear-gradient(135deg, #FF9587 0%, #BA487F 100%)",
                          }}
                        >
                          {rutina.nombre.charAt(0)}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "#722323" }}>
                          {rutina.nombre}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: "#722323" }}>
                        {rutina.descripcion}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold" style={{ color: "#722323" }}>
                        {rutina.sug_semanas_em} semanas
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {/* EDITAR */}
                        <button
                          className="p-2 rounded-lg"
                          style={{ color: "#BA487F" }}
                          onClick={() => abrirModalEditar(rutina)}
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>

                        {/* ELIMINAR */}
                        <button
                          className="p-2 rounded-lg"
                          style={{ color: "#FF9587" }}
                          onClick={() => eliminarRutina(rutina.id)}
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="px-6 py-4 border-t-2"
            style={{ borderTopColor: "#FFECCC", backgroundColor: "#FFECC0" }}
          >
            <p className="text-sm" style={{ color: "#722323" }}>
              Mostrando{" "}
              <span className="font-semibold">{filteredRutinas.length}</span> de{" "}
              <span className="font-semibold">{rutinas.length}</span> rutinas
            </p>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg border-2"
            style={{ borderColor: "#BA487F" }}>
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: "#722323" }}>
                {editingRutina ? "Editar Rutina" : "Nueva Rutina"}
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="p-2 rounded-lg"
                style={{ color: "#FF9587" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={manejarSubmit} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Nombre"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="border p-2 rounded-lg"
                style={{ borderColor: "#FFC29B" }}
              />

              <textarea
                placeholder="Descripción"
                required
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className="border p-2 rounded-lg"
                style={{ borderColor: "#FFC29B" }}
              ></textarea>

              <input
                type="number"
                placeholder="Semanas sugeridas"
                required
                value={formData.sug_semanas_em}
                onChange={(e) =>
                  setFormData({ ...formData, sug_semanas_em: e.target.value })
                }
                className="border p-2 rounded-lg"
                style={{ borderColor: "#FFC29B" }}
              />

              <button
                type="submit"
                className="w-full py-2 text-white rounded-lg mt-2 font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, #722323 0%, #BA487F 100%)",
                }}
              >
                {editingRutina ? "Guardar cambios" : "Crear Rutina"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Rutinas;
