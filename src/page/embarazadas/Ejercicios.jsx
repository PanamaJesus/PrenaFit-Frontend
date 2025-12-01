import React, { useEffect, useState } from "react";
import "../../App.css";
import NavbarE from "./NavEmb";
import AllEjercicios from "./AllEjercicios";

function Ejercicios() {
  // Obtener usuario desde localStorage
  const userString = localStorage.getItem("usuario");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user ? user.id : null;

  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [semanaUsuario, setSemanaUsuario] = useState(null);

  // 1️⃣ Obtener todos los ejercicios
  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/ejercicio/");
        const data = await response.json();
        setEjercicios(data);
      } catch (error) {
        console.error("Error al cargar ejercicios:", error);
      }
    };

    fetchEjercicios();
  }, []);

  // 2️⃣ Obtener datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        console.log("⚠ No hay userId");
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/usuario/${userId}/`
        );
        const data = await response.json();
        setSemanaUsuario(data.semana_embarazo);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // 3️⃣ Filtrar solo ejercicios del usuario
  const ejerciciosDelUsuario = ejercicios.filter(
    (item) => String(item.usuario) === String(userId)
  );

  // 4️⃣ Filtrar por rango de semanas del embarazo
  let ejerciciosPorSemana = [];

  if (semanaUsuario >= 1 && semanaUsuario <= 12) {
    ejerciciosPorSemana = ejerciciosDelUsuario.filter(
      (item) => item.sug_semanas >= 1 && item.sug_semanas <= 12
    );
  } else if (semanaUsuario >= 13 && semanaUsuario <= 27) {
    ejerciciosPorSemana = ejerciciosDelUsuario.filter(
      (item) => item.sug_semanas >= 13 && item.sug_semanas <= 27
    );
  } else if (semanaUsuario >= 28 && semanaUsuario <= 40) {
    ejerciciosPorSemana = ejerciciosDelUsuario.filter(
      (item) => item.sug_semanas >= 28 && item.sug_semanas <= 40
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-screen bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <NavbarE />

        <div className="mt-28 px-6">
          <h1 className="text-3xl font-bold mb-6">Mis Ejercicios</h1>

          {loading && <p>Cargando ejercicios...</p>}

          {!loading && ejerciciosPorSemana.length === 0 && (
            <p>No tienes ejercicios disponibles para tu semana de embarazo.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ejerciciosPorSemana.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white/40 backdrop-blur-lg rounded-xl shadow-md"
              >
                <h2 className="font-semibold text-xl">{item.nombre}</h2>

                <p className="mt-2 text-sm">{item.descripcion}</p>

                <p className="mt-2 text-sm">
                  <strong>Nivel de esfuerzo:</strong> {item.nivel_esfuerzo}
                </p>

                <p className="mt-1 text-sm">
                  <strong>Sugerido desde semana:</strong> {item.sug_semanas}
                </p>
              </div>
            ))}
          </div>
        </div>

        <AllEjercicios/>
      </div>
    </main>
  );
}

export default Ejercicios;