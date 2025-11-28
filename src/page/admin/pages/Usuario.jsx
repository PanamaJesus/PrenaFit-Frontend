// page/admin/pages/Usuario.jsx
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react';

const Usuario = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  // Cargar usuarios reales
  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/usuario/");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Rol
  const getRolLabel = (rol) => {
    return rol === 1 ? 'Administrador' : 'Usuario';
  };

  const getRolStyle = (rol) => {
    return rol === 1 
      ? { backgroundColor: '#BA487F', color: '#FFFFFF', borderColor: '#722323' }
      : { backgroundColor: '#FFECCC', color: '#722323', borderColor: '#FFC29B' };
  };

  // Búsqueda
  const filteredUsuarios = usuarios.filter(user => 
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.ap_pat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-0 m-0 min-h-full w-full" style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#722323' }}>
              Gestión de Usuarios
            </h1>
            <p style={{ color: '#BA487F' }}>Administra los usuarios del sistema</p>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative max-w-md">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2" 
            style={{ color: '#BA487F' }} 
            size={20} 
          />
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o correo..."
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

      {/* TABLA */}
      <div className="mx-6 mb-6">
        <div className="bg-white rounded-xl shadow-md border-2" style={{ borderColor: '#BA487F' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              
              <thead style={{ backgroundColor: '#FFECCC' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Nombre</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Apellido Paterno</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Apellido Materno</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Correo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Semana Embarazo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Rol</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsuarios.map((usuario) => (
                  <tr 
                    key={usuario.id} 
                    className="border-b transition-colors" 
                    style={{ borderBottomColor: '#FFECCC' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFECC0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    
                    {/* ID */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold" style={{ color: '#722323' }}>
                        #{usuario.id}
                      </span>
                    </td>

                    {/* Nombre + Avatar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ background: 'linear-gradient(135deg, #FF9587 0%, #BA487F 100%)' }}
                        >
                          {usuario.nombre.charAt(0)}{usuario.ap_pat.charAt(0)}
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#722323' }}>
                          {usuario.nombre}
                        </span>
                      </div>
                    </td>

                    {/* Apellidos */}
                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: '#722323' }}>
                        {usuario.ap_pat}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: '#722323' }}>
                        {usuario.ap_mat}
                      </span>
                    </td>

                    {/* Correo */}
                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: '#BA487F' }}>
                        {usuario.correo}
                      </span>
                    </td>

                    {/* Semana embarazo */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold" style={{ color: '#722323' }}>
                        {usuario.semana_embarazo} semanas
                      </span>
                    </td>

                    {/* Rol */}
                    <td className="px-6 py-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold border"
                        style={getRolStyle(usuario.rol)}
                      >
                        {getRolLabel(usuario.rol)}
                      </span>
                    </td>

                    {/* Acciones (solo UI, no funcional) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-2 rounded-lg"
                          style={{ color: '#722323' }}
                        >
                          <Eye size={18} />
                        </button>

                        <button 
                          className="p-2 rounded-lg"
                          style={{ color: '#BA487F' }}
                        >
                          <Edit size={18} />
                        </button>

                        <button 
                          className="p-2 rounded-lg"
                          style={{ color: '#FF9587' }}
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

          {/* Footer */}
          <div className="px-6 py-4 border-t-2" 
            style={{ borderTopColor: '#FFECCC', backgroundColor: '#FFECC0' }}>
            <p className="text-sm" style={{ color: '#722323' }}>
              Mostrando <span className="font-semibold">{filteredUsuarios.length}</span> de{" "}
              <span className="font-semibold">{usuarios.length}</span> usuarios
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Usuario;
