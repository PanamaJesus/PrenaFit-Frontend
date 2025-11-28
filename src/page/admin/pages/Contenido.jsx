// page/admin/pages/Contenido.jsx
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Plus, Search, Link as LinkIcon } from 'lucide-react';

const Contenido = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contenidos, setContenidos] = useState([]);

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

  return (
    <div className="p-0 m-0 min-h-full w-full" style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#722323' }}>Gestión de Contenidos</h1>
            <p style={{ color: '#BA487F' }}>Administra los contenidos educativos del sistema</p>
          </div>

          <button 
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
            onFocus={(e) => e.target.style.borderColor = '#BA487F'}
            onBlur={(e) => e.target.style.borderColor = '#FFECCC'}
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
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Título</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Texto</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>URL</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Tema</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredContenidos.map((contenido) => (
                  <tr 
                    key={contenido.id}
                    className="border-b transition-colors"
                    style={{ borderBottomColor: '#FFECCC' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFECC0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold" style={{ color: '#722323' }}>#{contenido.id}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ background: 'linear-gradient(135deg, #FF9587 0%, #BA487F 100%)' }}
                        >
                          {contenido.titulo.charAt(0)}
                        </div>
                        <p className="text-sm font-medium" style={{ color: '#722323' }}>{contenido.titulo}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm truncate" style={{ color: '#722323' }}>{contenido.texto}</p>
                    </td>

                    {/* CAMBIO AQUÍ: imagen → URL con icono de link */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <LinkIcon size={16} style={{ color: '#BA487F' }} />
                        <a 
                          href={contenido.urls_img}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs hover:underline"
                          style={{ color: '#BA487F' }}
                        >
                          Abrir enlace
                        </a>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold border"
                        style={getTemaStyle(contenido.tema)}
                      >
                        {getTemaLabel(contenido.tema)}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg transition-colors" style={{ color: '#722323' }}>
                          <Eye size={18} />
                        </button>
                        <button className="p-2 rounded-lg transition-colors" style={{ color: '#BA487F' }}>
                          <Edit size={18} />
                        </button>
                        <button className="p-2 rounded-lg transition-colors" style={{ color: '#FF9587' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <div className="px-6 py-4 border-t-2" style={{ borderTopColor: '#FFECCC', backgroundColor: '#FFECC0' }}>
            <p className="text-sm" style={{ color: '#722323' }}>
              Mostrando <span className="font-semibold">{filteredContenidos.length}</span> de <span className="font-semibold">{contenidos.length}</span> contenidos
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contenido;
