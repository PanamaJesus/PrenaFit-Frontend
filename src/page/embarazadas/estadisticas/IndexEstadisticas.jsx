import BarCard from "../../../components/charts/BarCard";
import LineCard from "../../../components/charts/LineCard";
import NavbarE from '../NavEmb'
import Footer from '../../../components/Footer'
import UltimasLecturas from "./UltimasLecturas";
import DatosRutinas from "./DatosRutinas";
import HistogramaRutinas from "../../../components/charts/HistogramaRutinas";

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
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col relative p-10">

      <NavbarE />

      {/* 🌈 Fondo decorativo (NO ENCERRAR CONTENIDO) */}
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] 
        bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 
        rounded-full blur-[80px] -z-10">
      </div>

      {/* CONTENIDO REAL */}
      <div className="flex-1 w-full px-6 py-10 max-w-7xl mx-auto">

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
        
        {/* 🔥 SECCIÓN DE GRÁFICAS (opcional)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <BarCard 
            title="Actividad Semanal"
            data={[
              { name: "Lun", value: 1200 },
              { name: "Mar", value: 1600 },
              { name: "Mié", value: 1000 },
              { name: "Jue", value: 1800 },
              { name: "Vie", value: 2100 }
            ]}
          />

          <LineCard 
            title="Histórico de FC"
            data={[
              { fecha: "01 Ene", valor: 85 },
              { fecha: "02 Ene", valor: 88 },
              { fecha: "03 Ene", valor: 90 },
              { fecha: "04 Ene", valor: 87 }
            ]}
          />
        </div>
        */}

      </div>

      <Footer />
    </main>
  );
}

export default IndexEstadisticas;
