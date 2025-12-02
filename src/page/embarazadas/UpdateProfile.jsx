// // // UpdateProfile.jsx
// UpdateProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarE from "./NavEmb";

function UpdateProfile() {
  const navigate = useNavigate();

  const userString = localStorage.getItem("usuario");
  // Asegúrate de que 'user' es el objeto parseado o null
  const user = userString ? JSON.parse(userString) : null; 
  const userId = user ? user.id : null;

  // Inicializa userData con una estructura para evitar errores al acceder a sus propiedades
  const [userData, setUserData] = useState({
    nombre: "",
    ap_pat: "",
    ap_mat: "",
    correo: "",
    fecha_nacimiento: "",
    semana_embarazo: "",
  });
  const [rangos, setRangos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // -----------------------------------------------------
  //  PATCH USUARIO
  // -----------------------------------------------------
  const updateProfile = async (data) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/usuario/${userId}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data), // Usa la data pasada como argumento
        }
      );

      // Si la respuesta no es OK, lanza un error para ir al catch
      if (!response.ok) {
        // Opcional: obtener y loguear el error del backend
        // const errorData = await response.json();
        // console.error("Error en updateProfile:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { success: true };
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return { success: false };
    }
  };

  // -----------------------------------------------------
  //  PATCH RANGOS
  // -----------------------------------------------------
  const updateRangos = async () => {
    // Solo procede si 'rangos' existe y tiene un 'id'
    if (!rangos || !rangos.id) {
      // Si no hay rangos para actualizar, lo consideramos un éxito para la lógica de handleSubmit
      return { success: true }; 
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/rangos/${rangos.id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rangos),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { success: true };
    } catch (error) {
      console.error("Error al actualizar rangos:", error);
      return { success: false };
    }
  };

  // -----------------------------------------------------
  //  Cargar usuario + rangos
  // -----------------------------------------------------
  useEffect(() => {
    if (!userId) {
      setMsg("No se encontró el ID del usuario.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Usuario
        const resUser = await fetch(
          `http://127.0.0.1:8000/api/usuario/${userId}/`
        );
        if (!resUser.ok) throw new Error("Error al cargar usuario");
        const dataUser = await resUser.json();

        // Formatea la fecha si es necesario para el input type="date"
        if (dataUser.fecha_nacimiento) {
          // Asume que el backend devuelve un formato compatible o haz la conversión
          // Si devuelve 'YYYY-MM-DDTHH:MM:SSZ', solo toma 'YYYY-MM-DD'
          dataUser.fecha_nacimiento = dataUser.fecha_nacimiento.split('T')[0];
        }

        setUserData(dataUser);

        // Rangos
        const resRangos = await fetch(
          `http://127.0.0.1:8000/api/rangos/?usuario=${userId}`
        );
        if (!resRangos.ok) throw new Error("Error al cargar rangos");
        const dataRangos = await resRangos.json();

        if (Array.isArray(dataRangos) && dataRangos.length > 0) {
          setRangos(dataRangos[0]); // toma el primer registro
        }
      } catch (error) {
        console.error("Error en fetchData:", error);
        setMsg(`Error al cargar datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // -----------------------------------------------------
  //  Submit
  // -----------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento de envío por defecto del formulario

    // Verifica que userData no sea nulo antes de intentar actualizar
    if (!userData) {
      setMsg("Error: Datos de usuario no disponibles para actualizar.");
      return;
    }

    // Actualiza el usuario con la data actual de su estado
    const resultUser = await updateProfile(userData); 
    // Actualiza los rangos
    const resultRangos = await updateRangos();

    // Comprueba si al menos una de las actualizaciones fue exitosa
    if (resultUser.success || resultRangos.success) {
      setMsg("Datos actualizados correctamente 🎉");
      // Actualiza el localStorage si la actualización del usuario fue exitosa
      if(resultUser.success) {
        // Si el usuario existe en localStorage, actualiza sus datos locales
        if (user) {
          localStorage.setItem("usuario", JSON.stringify({ ...user, ...userData }));
        }
      }
      setTimeout(() => navigate("/profile"), 1500);
    } else {
      setMsg("No se pudieron guardar los cambios");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!userData || !userId) return <p className="text-center mt-10">No se encontraron datos o ID de usuario</p>;

  // Función genérica para manejar los cambios en userData
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Función genérica para manejar los cambios en rangos
  const handleRangosChange = (e) => {
    const { name, value } = e.target;
    setRangos((prevRangos) => ({ ...prevRangos, [name]: value }));
  };

  return (
    <main className="relative min-h-screen bg-gray-100 overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-screen bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

      {/* Asegúrate de que NavbarE está correctamente importado y funcional */}
      <NavbarE /> 

      <div className="w-full h-64 bg-gradient-to-r from-[#BA487F] to-[#F39F9F]"></div>

      <div className="max-w-3xl mx-auto -mt-24 bg-white shadow-xl rounded-xl p-8 relative">
        
        {/* Foto de perfil */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="perfil"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-4 text-[#BA487F]">
          Editar Perfil
        </h2>

        {msg && <p className="text-center mt-2 text-[#BA487F] font-semibold">{msg}</p>}

        {/* FORMULARIO ÚNICO Y CORREGIDO */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6 mt-10 p-6 border rounded-xl shadow-sm"
        >
          {/* Nombre */}
          <div>
            <p className="font-semibold">Nombre:</p>
            <input
              type="text"
              name="nombre"
              value={userData.nombre || ''} // Usa || '' para evitar advertencias de React si es undefined/null
              onChange={handleUserChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Apellido paterno */}
          <div>
            <p className="font-semibold">Apellido Paterno:</p>
            <input
              type="text"
              name="ap_pat"
              value={userData.ap_pat || ''}
              onChange={handleUserChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Apellido materno */}
          <div>
            <p className="font-semibold">Apellido Materno:</p>
            <input
              type="text"
              name="ap_mat"
              value={userData.ap_mat || ''}
              onChange={handleUserChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Correo */}
          <div>
            <p className="font-semibold">Correo:</p>
            <input
              type="email"
              name="correo"
              value={userData.correo || ''}
              onChange={handleUserChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Fecha nacimiento */}
          <div>
            <p className="font-semibold">Fecha de nacimiento:</p>
            <input
              type="date"
              name="fecha_nacimiento"
              value={userData.fecha_nacimiento || ''}
              onChange={handleUserChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Semanas embarazo */}
          <div>
            <p className="font-semibold">Semanas de embarazo:</p>
            <input
              type="number"
              name="semana_embarazo"
              value={userData.semana_embarazo || 0} // Usa || 0 para un campo numérico
              onChange={handleUserChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* ------------------------------ */}
          {/* RANGOS              */}
          {/* ------------------------------ */}
          {rangos && (
            <>
              <div>
                <p className="font-semibold">Ritmo cardíaco mínimo:</p>
                <input
                  type="number"
                  name="rbpm_inferior"
                  value={rangos.rbpm_inferior || 0}
                  onChange={handleRangosChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <p className="font-semibold">Ritmo cardíaco máximo:</p>
                <input
                  type="number"
                  name="rbpm_superior"
                  value={rangos.rbpm_superior || 0}
                  onChange={handleRangosChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <p className="font-semibold">Oxigenación mínima:</p>
                <input
                  type="number"
                  name="rox_inferior"
                  value={rangos.rox_inferior || 0}
                  onChange={handleRangosChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <p className="font-semibold">Oxigenación máxima:</p>
                <input
                  type="number"
                  name="rox_superior"
                  value={rangos.rox_superior || 0}
                  onChange={handleRangosChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {/* Botón Guardar - Debe ser type="submit" dentro del formulario */}
          <button
            type="submit"
            className="col-span-2 w-full mt-8 bg-[#BA487F] text-white py-3 rounded-lg font-semibold hover:bg-[#a03c71] transition"
          >
            Guardar cambios
          </button>
        </form>

        {/* Cancelar - Fuera del formulario */}
        <button
          onClick={() => navigate("/profile")}
          className="w-full mt-4 bg-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </main>
  );
}

export default UpdateProfile;
