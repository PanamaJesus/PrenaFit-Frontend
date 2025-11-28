// page/admin/pages/Dashboard.jsx
import React from 'react';
import { Dumbbell, Users, Calendar, FileText, Eye, Edit, Trash2 } from 'lucide-react';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const stats = [
    { title: 'Total Ejercicios', value: '156', change: '+12.5%', icon: Dumbbell, colorIndex: 0 },
    { title: 'Usuarios Activos', value: '2,345', change: '+18.3%', icon: Users, colorIndex: 1 },
    { title: 'Rutinas Creadas', value: '89', change: '+5.2%', icon: Calendar, colorIndex: 2 },
    { title: 'Contenidos', value: '234', change: '+8.1%', icon: FileText, colorIndex: 3 }
  ];

  const recentActivities = [
    { id: 'ACT-001', user: 'María González', activity: 'Completó rutina "Cardio Intenso"', type: 'Rutina', status: 'Completado', date: '15/11/2024' },
    { id: 'ACT-002', user: 'Carlos Ramírez', activity: 'Nuevo ejercicio agregado "Sentadillas"', type: 'Ejercicio', status: 'Nuevo', date: '16/11/2024' },
    { id: 'ACT-003', user: 'Ana López', activity: 'Reseña en "Yoga Matutino"', type: 'Reseña', status: 'Pendiente', date: '16/11/2024' },
    { id: 'ACT-004', user: 'Luis Martínez', activity: 'Editó contenido "Nutrición Básica"', type: 'Contenido', status: 'Actualizado', date: '17/11/2024' },
    { id: 'ACT-005', user: 'Sofia Torres', activity: 'Nueva rutina "Fuerza y Resistencia"', type: 'Rutina', status: 'Nuevo', date: '17/11/2024' }
  ];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Completado': 
        return { backgroundColor: '#FFECCC', color: '#722323', borderColor: '#FFC29B' };
      case 'Nuevo': 
        return { backgroundColor: '#FFC29B', color: '#722323', borderColor: '#F39F9F' };
      case 'Pendiente': 
        return { backgroundColor: '#fdfdfdff', color: '#BA487F', borderColor: '#FFC29B' };
      case 'Actualizado': 
        return { backgroundColor: '#F39F9F', color: '#722323', borderColor: '#B95E82' };
      default: 
        return { backgroundColor: '#FFECCC', color: '#722323', borderColor: '#FFC29B' };
    }
  };

  return (
    <div className="p-0 m-0 min-h-full w-full" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div className="mb-8 px-6 pt-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#722323' }}>Dashboard</h1>
        <p style={{ color: '#BA487F' }}>Bienvenido de nuevo, aquí está tu resumen de hoy</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Tabla de actividades recientes */}
      <div className="bg-white rounded-xl shadow-md border-2 mx-6 mb-6" style={{ borderColor: '#BA487F' }}>
        <div className="p-6 border-b-2" style={{ borderBottomColor: '#FFECCC' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#722323' }}>Actividades Recientes</h2>
              <p className="text-sm mt-1" style={{ color: '#BA487F' }}>Últimas acciones en el sistema</p>
            </div>
            <button 
              className="px-4 py-2 text-white rounded-lg transition-all font-medium hover:shadow-lg transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #722323 0%, #BA487F 100%)' }}
            >
              Ver Todas
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#FFECCC' }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Usuario</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Actividad</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Estado</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#722323' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, index) => (
                <tr 
                  key={index} 
                  className="border-b transition-colors" 
                  style={{ borderBottomColor: '#FFECCC' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFECC0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold" style={{ color: '#722323' }}>{activity.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #FF9587 0%, #BA487F 100%)' }}
                      >
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#722323' }}>{activity.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm" style={{ color: '#722323' }}>{activity.activity}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium" style={{ color: '#BA487F' }}>{activity.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-semibold border"
                      style={getStatusStyle(activity.status)}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm" style={{ color: '#BA487F' }}>{activity.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#722323' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFECCC'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#BA487F' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFC29B'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#FF9587' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F39F9F'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
      </div>
    </div>
  );
};

export default Dashboard;