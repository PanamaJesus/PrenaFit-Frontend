// page/admin/indexadmin2.jsx
// Punto de entrada principal del panel administrativo
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Usuario from './pages/Usuario';
import Ejercicio from './pages/Ejercicio';
import Contenido from './pages/Contenido';
import TipoTema from './pages/TipoTema';

const IndexAdmin2 = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/ejercicio" element={<Ejercicio />} />
        <Route path="/contenido" element={<Contenido />} />
        <Route path="/tipotema" element={<div className="p-6"><h1 className="text-2xl font-bold" style={{ color: '#722323' }}>Tipo Tema - Próximamente</h1></div>} />
        <Route path="/rutina" element={<div className="p-6"><h1 className="text-2xl font-bold" style={{ color: '#722323' }}>Rutina - Próximamente</h1></div>} />
        <Route path="/resena" element={<div className="p-6"><h1 className="text-2xl font-bold" style={{ color: '#722323' }}>Reseña - Próximamente</h1></div>} />
        <Route path="/historial" element={<div className="p-6"><h1 className="text-2xl font-bold" style={{ color: '#722323' }}>Historial - Próximamente</h1></div>} />
      </Routes>
    </AdminLayout>
  );
};

export default IndexAdmin2;