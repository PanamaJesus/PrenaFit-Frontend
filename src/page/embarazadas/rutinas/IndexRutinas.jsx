import NavbarE from '../NavEmb'
import Footer from '../../../components/Footer'
import RutinaLista from './RutinaLista'
import RutinasSeleccionadas from './RutinasSeleccionadas'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function IndexRutinas() {
  const navigate = useNavigate();

  const irACrearRutina = () => {
    navigate('/crear-rutina'); // Redirige a la página de creación de rutinas
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

      <NavbarE />

      <div className="flex-1 w-full px-6 py-10">

        {/* Banner anuncio */}
        <div className="bg-indigo-100 border-l-4 border-indigo-500 p-8 rounded-lg mb-10 flex flex-col md:flex-row items-center justify-between gap-4 ">
          <p className="text-indigo-800 font-semibold text-lg">
            ¡Crea tu propia rutina personalizada!
          </p>
          <button
            onClick={irACrearRutina}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Crear Rutina
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center">Rutinas guardadas</h2>
        <RutinasSeleccionadas/>

        <div className="px-6 py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Rutinas para Embarazadas</h2>
          <RutinaLista />
        </div>
        
      </div>

      <Footer />
    </main>
  )
}

export default IndexRutinas
