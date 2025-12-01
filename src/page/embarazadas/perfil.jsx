import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarE from "./NavEmb";

function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("usuario");
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user.id : null;

    console.log("userId obtenido del localStorage:", userId);

    if (!userId) {
      setError("No se encontró el ID del usuario.");
      return;
    }

    const fetchUsuario = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/usuario/${userId}/`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          setError("No se pudo cargar la información del usuario.");
          return;
        }

        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        setError("Error de conexión con el servidor.");
      }
    };

    fetchUsuario();
  }, []);

  if (error) {
    return <p className="text-red-600 text-center mt-4">{error}</p>;
  }

  if (!usuario) {
    return <p className="text-center mt-4">Cargando...</p>;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Fondo con blur */}
      <div className="absolute -top-28 -left-28 w-[500px] h-screen bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <NavbarE />

      {/* CONTENIDO */}
      <div className="mt-28 min-h-screen flex justify-center items-center p-6">
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Perfil del Usuario
          </h2>

          {/* Campo: Nombre */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Nombre</label>
            <input
              type="text"
              value={usuario.nombre}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

           {/* Campo: Apellido Paterno */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Apellido Paterno</label>
            <input
              type="text"
              value={usuario.ap_pat}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

           {/* Campo: Apellido Materno */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Apellido Materno</label>
            <input
              type="text"
              value={usuario.ap_mat}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Campo: Correo */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Correo</label>
            <input
              type="text"
              value={usuario.correo}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Campo: Semanas de embarazo */}
          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-1">Rol</label>
            <input
              type="number"
              value={usuario.semana_embarazo}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Botón para editar */}
          <button
            onClick={() => navigate("/UpdProfile")}
            className="w-full bg-[#A83279] text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
