import BarCard from "../../../components/charts/BarCard";
import LineCard from "../../../components/charts/LineCard";
import NavbarE from '../NavEmb'
import Footer from '../../../components/Footer'
import UltimasLecturas from "./UltimasLecturas";
import DatosRutinas from "./DatosRutinas";
import HistogramaRutinas from "../../../components/charts/HistogramaRutinas";
import { div } from "framer-motion/client";

function IndexEstadisticas() {
  const lecturasMock = [
  { fecha: "2025-01-01", oxigenacion: 96, frecuencia: 85, temperatura: 36.7 },
  { fecha: "2025-01-02", oxigenacion: 92, frecuencia: 90, temperatura: 37.0 },
  { fecha: "2025-01-02", oxigenacion: 94, frecuencia: 88, temperatura: 36.8 },
  { fecha: "2025-01-05", oxigenacion: 97, frecuencia: 82, temperatura: 36.5 },
  { fecha: "2025-01-10", oxigenacion: 89, frecuencia: 95, temperatura: 37.8 },
  { fecha: "2025-01-11", oxigenacion: 89, frecuencia: 95, temperatura: 37.8 },

  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },
  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },

  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },

  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },
  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },
  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },
  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },

  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },
  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },
  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },
  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },
  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },
  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },

  { fecha: "2025-02-03", oxigenacion: 95, frecuencia: 87, temperatura: 36.6 },

];

  return (
    <div>
    <NavbarE />
    <main className="w-full overflow-x-hidden flex flex-col relative pt-20 md:pt-24">

      

      {/* 🌈 Fondo decorativo (NO ENCERRAR CONTENIDO) */}
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] 
        bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 
        rounded-full blur-[80px] -z-10">
      </div>

      {/* CONTENIDO REAL */}
      <div className="flex-1 w-full px-6 py-10">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          Signos vitales y Estadísticas
        </h1>

        <h4 className="text-2xl font-bold text-gray-800 mb-6">
          Última lectura
        </h4>

        {/* 🔥 SECCIÓN DE SIGNOS VITALES */}
        <UltimasLecturas />

        {/* 🔥 SECCIÓN DE RUTINAS */}
        <DatosRutinas />
        

        <HistogramaRutinas/>


      </div>

     
    </main>
      <Footer />
    </div>
  );
}

export default IndexEstadisticas;
