// components/Navbar.jsx
import React, { useState } from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  return (
    <header className="bg-white shadow-md border-b-4" style={{ borderBottomColor: '#BA487F' }}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Barra de búsqueda */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">

        </div>
        
        {/* Acciones rápidas y usuario */}
        <div className="flex items-center gap-4">
          {/* Notificaciones */}
          <button 
            className="relative p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: '#FFECCC',
              color: '#722323'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFC29B'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFECCC'}
          >
            <Bell size={22} />
            <span 
              className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-white"
              style={{ backgroundColor: '#BA487F' }}
            ></span>
          </button>
          
          {/* Usuario */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#FFECCC' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFC29B'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFECCC'}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #722323 0%, #BA487F 100%)' }}
              >
                JD
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold" style={{ color: '#722323' }}>John Doe</p>
                <p className="text-xs" style={{ color: '#BA487F' }}>Administrador</p>
              </div>
              <ChevronDown size={18} style={{ color: '#BA487F' }} />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 py-2 z-50" style={{ borderColor: '#FFECCC' }}>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#FFECCC] transition-colors" style={{ color: '#722323' }}>Mi Perfil</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#FFECCC] transition-colors" style={{ color: '#722323' }}>Configuración</a>
                <hr className="my-2" style={{ borderColor: '#FFECCC' }} />
                <a href="#" className="block px-4 py-2 text-sm hover:bg-red-50 transition-colors" style={{ color: '#BA487F' }}>Cerrar Sesión</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;