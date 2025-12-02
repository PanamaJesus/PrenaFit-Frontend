import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarE from "./NavEmb";
import { Mail, Calendar, Baby } from "lucide-react";

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("usuario");
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user.id : null;

    if (!userId) {
      setError("No se encontró el ID del usuario.");
      return;
    }

    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/usuario/${userId}/`);
        if (!response.ok) {
          setError("No se pudo cargar la información del usuario.");
          return;
        }
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        setError("Error de conexión con el servidor.");
      }
    };

    fetchUsuario();
  }, []);

  if (error) return <p className="text-red-600 text-center mt-4">{error}</p>;
  if (!usuario) return <p className="text-center mt-4">Cargando...</p>;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Fondo con blur */}
      <div className="absolute -top-28 -left-28 w-[500px] h-screen bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <NavbarE />

      {/* Fondo superior */}
      <div className=" mt-20 w-full h-60 bg-gradient-to-r from-[#BA487F] to-[#F39F9F]">
      </div>

      {/* Card principal */}
      <div className="max-w-3xl mx-auto -mt-24 bg-white shadow-xl rounded-xl p-8 relative">
        {/* Foto de perfil */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="perfil"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 018.31 5.5h7.38c.518 0 1.02.183 1.483.52l.07.05c.462.338.836.77 1.09 1.273.253.503.367 1.054.333 1.61-.034.557-.214 1.095-.525 1.565l-3.67 5.505a2.31 2.31 0 01-1.92 1.01H9.31a2.31 2.31 0 01-1.92-1.01L3.72 10.52a2.31 2.31 0 01-.525-1.565c-.034-.556.08-1.107.333-1.61a3.61 3.61 0 011.09-1.273l.07-.05z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Nombre */}
        <h2 className="text-2xl font-bold text-center mt-4">
          {usuario.nombre} {usuario.ap_pat} {usuario.ap_mat}
        </h2>

        {/* Descripción placeholder */}
        {/* <p className="text-center text-gray-500 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p> */}

        {/* Iconos lado derecho
        <div className="flex justify-center gap-4 mt-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow">F</div>
          <div className="w-10 h-10 rounded-full bg-sky-400 flex items-center justify-center text-white shadow">T</div>
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white shadow">I</div>
        </div> */}

        {/* Info del usuario */}
        <div className="grid grid-cols-2 gap-6 mt-10 p-6 border rounded-xl shadow-sm">
          
          {/* Correo */}
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-700" />
            <div>
              <p className="font-semibold text-gray-700">Correo:</p>
              <p className="text-gray-600">{usuario.correo}</p>
            </div>
          </div>

          {/* Fecha nacimiento */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-700" />
            <div>
              <p className="font-semibold text-gray-700">Fecha nacimiento:</p>
              <p className="text-gray-600">{usuario.fecha_nacimiento}</p>
            </div>
          </div>

          {/* Semanas embarazo */}
          <div className="flex items-center gap-2">
            <Baby className="w-5 h-5 text-gray-700" />
            <div>
              <p className="font-semibold text-gray-700">Semanas embarazo:</p>
              <p className="text-gray-600">{usuario.semana_embarazo}</p>
            </div>
          </div>
        </div>

        {/* Botón editar */}
        <button
          onClick={() => navigate("/UpdProfile")}
          className="w-full mt-8 bg-[#BA487F] hover:bg-[#a03c71] text-white py-3 rounded-lg font-semibold  transition"
        >
          Editar Perfil
        </button>
      </div>
    </main>
  );
}
