// page/admin/pages/Contenido.jsx
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Plus, Search, Link as LinkIcon, X } from 'lucide-react';

const Contenido = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contenidos, setContenidos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Datos del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    texto: '',
    urls_img: '',
    tema: 1
  });

  // Cargar contenido
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/contenido/")
      .then(res => res.json())
      .then(data => setContenidos(data))
      .catch(err => console.error("Error cargando contenidos:", err));
  }, []);

  const getTemaLabel = (tema) => {
    const temas = {
      1: 'Nutrición',
      2: 'Ejercicio',
      3: 'Parto',
      4: 'Relajación',
      5: 'Postparto'
    };
    return temas[tema] || `Tema ${tema}`;
  };

  const getTemaStyle = (tema) => {
    const styles = {
      1: { backgroundColor: '#FFECCC', color: '#722323', borderColor: '#FFC29B' },
      2: { backgroundColor: '#FFC29B', color: '#722323', borderColor: '#F39F9F' },
      3: { backgroundColor: '#F39F9F', color: '#722323', borderColor: '#B95E82' },
      4: { backgroundColor: '#BA487F', color: '#FFFFFF', borderColor: '#722323' },
      5: { backgroundColor: '#FF9587', color: '#722323', borderColor: '#BA487F' }
    };
    return styles[tema] || styles[1];
  };

  const filteredContenidos = contenidos.filter(contenido =>
    contenido.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contenido.texto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/contenido/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(newItem => {
        setContenidos([...contenidos, newItem]);
        setModalOpen(false);

        // Reiniciar form
        setFormData({
          titulo: '',
          texto: '',
          urls_img: '',
          tema: 1
        });
      })
      .catch(err => console.error("Error creando contenido:", err));
  };

  return (
    <div className="p-0 m-0 min-h-full w-full" style={{ backgroundColor: '#FFFFFF' }}>

      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#722323' }}>Gestión de Contenidos</h1>
            <p style={{ color: '#BA487F' }}>Administra los contenidos educativos del sistema</p>
          </div>

          {/* Botón abre modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all font-medium hover:shadow-lg transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #722323 0%, #BA487F 100%)' }}
          >
            <Plus size={20} />
            Nuevo Contenido
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#BA487F' }} size={20} />
          <input
            type="text"
            placeholder="Buscar por título o texto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
            style={{
              borderColor: '#FFECCC',
              '--tw-ring-color': '#BA487F'
            }}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="mx-6 mb-6">
        <div className="bg-white rounded-xl shadow-md border-2" style={{ borderColor: '#BA487F' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#FFECCC' }}>
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Título</th>
                  <th className="px-6 py-4">Texto</th>
                  <th className="px-6 py-4">URL</th>
                  <th className="px-6 py-4">Tema</th>
                  <th className="px-6 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredContenidos.map((contenido) => (
                  <tr key={contenido.id} className="border-b">
                    <td className="px-6 py-4">#{contenido.id}</td>
                    <td className="px-6 py-4">{contenido.titulo}</td>
                    <td className="px-6 py-4 truncate">{contenido.texto}</td>
                    <td className="px-6 py-4">
                      <a href={contenido.urls_img} target="_blank" className="text-sm text-blue-500 underline">
                        Ver enlace
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {getTemaLabel(contenido.tema)}
                    </td>
                    <td className="px-6 py-4">
                      <button><Edit size={18} /></button>
                      <button><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* MODAL PARA NUEVO CONTENIDO */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">

            {/* Cerrar modal */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setModalOpen(false)}
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-4" style={{ color: '#722323' }}>
              Agregar Nuevo Contenido
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Título"
                className="border p-2 rounded"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
              />

              <textarea
                placeholder="Texto"
                className="border p-2 rounded"
                value={formData.texto}
                onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
                required
              />

              <input
                type="text"
                placeholder="URL de la imagen"
                className="border p-2 rounded"
                value={formData.urls_img}
                onChange={(e) => setFormData({ ...formData, urls_img: e.target.value })}
              />

              <select
                className="border p-2 rounded"
                value={formData.tema}
                onChange={(e) => setFormData({ ...formData, tema: parseInt(e.target.value) })}
              >
                <option value="1">Nutrición</option>
                <option value="2">Ejercicio</option>
                <option value="3">Parto</option>
                <option value="4">Relajación</option>
                <option value="5">Postparto</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 text-white rounded-lg"
                style={{ background: 'linear-gradient(135deg, #722323 0%, #BA487F 100%)' }}
              >
                Guardar Contenido
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Contenido;
