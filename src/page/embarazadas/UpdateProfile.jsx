// // UpdateProfile.jsx
// UpdateProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarE from "./NavEmb";

function UpdateProfile() {
  const navigate = useNavigate();

  const userString = localStorage.getItem("usuario");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user ? user.id : null;

  const [userData, setUserData] = useState(null);
  const [rangos, setRangos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // -----------------------------------------------------
  //  PATCH USUARIO
  // -----------------------------------------------------
  const updateProfile = async (userData) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/usuario/${userId}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) throw new Error();
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  // -----------------------------------------------------
  //  PATCH RANGOS
  // -----------------------------------------------------
  const updateRangos = async () => {
    if (!rangos || !rangos.id) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/rangos/${rangos.id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rangos),
        }
      );

      if (!response.ok) throw new Error();
      return { success: true };
    } catch {
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
        const dataUser = await resUser.json();
        setUserData(dataUser);

        // Rangos
        const resRangos = await fetch(
          `http://127.0.0.1:8000/api/rangos/?usuario=${userId}`
        );
        const dataRangos = await resRangos.json();

        if (Array.isArray(dataRangos) && dataRangos.length > 0) {
          setRangos(dataRangos[0]); // toma el primer registro
        }
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
    e.preventDefault();

    const resultUser = await updateProfile(userData);
    const resultRangos = await updateRangos();

    if (resultUser.success || resultRangos.success) {
      setMsg("Datos actualizados correctamente 🎉");
      setTimeout(() => navigate("/profile"), 1500);
    } else {
      setMsg("No se pudieron guardar los cambios");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!userData) return <p className="text-center mt-10">No se encontraron datos</p>;

  return (
    <main className="relative min-h-screen bg-gray-100 overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-screen bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

      <NavbarE />

      <div className="w-full h-64 bg-gradient-to-r from-[#BA487F] to-[#F39F9F]"></div>

      <div className="max-w-3xl mx-auto -mt-24 bg-white shadow-xl rounded-xl p-8 relative">
<<<<<<< HEAD
=======
        
        {/* Foto de perfil */}
>>>>>>> 53a16513be64c8eb627441e3d2d35bfac565027f
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

        {/* FORMULARIO */}
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-10 p-6 border rounded-xl shadow-sm">

=======
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6 mt-10 p-6 border rounded-xl shadow-sm"
        >
>>>>>>> 53a16513be64c8eb627441e3d2d35bfac565027f
          {/* Nombre */}
          <div>
            <p className="font-semibold">Nombre:</p>
            <input
              type="text"
              value={userData.nombre}
              onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Apellido paterno */}
          <div>
            <p className="font-semibold">Apellido Paterno:</p>
            <input
              type="text"
              value={userData.ap_pat}
              onChange={(e) => setUserData({ ...userData, ap_pat: e.target.value })}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Apellido materno */}
          <div>
            <p className="font-semibold">Apellido Materno:</p>
            <input
              type="text"
              value={userData.ap_mat}
              onChange={(e) => setUserData({ ...userData, ap_mat: e.target.value })}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Correo */}
          <div>
            <p className="font-semibold">Correo:</p>
            <input
              type="email"
              value={userData.correo}
              onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Fecha nacimiento */}
          <div>
            <p className="font-semibold">Fecha de nacimiento:</p>
            <input
              type="date"
              value={userData.fecha_nacimiento}
              onChange={(e) =>
                setUserData({ ...userData, fecha_nacimiento: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Semanas embarazo */}
          <div>
            <p className="font-semibold">Semanas de embarazo:</p>
            <input
              type="number"
              value={userData.semana_embarazo}
              onChange={(e) =>
                setUserData({ ...userData, semana_embarazo: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

<<<<<<< HEAD
          {/* ------------------------------ */}
          {/*           RANGOS               */}
          {/* ------------------------------ */}
          {rangos && (
            <>
              <div>
                <p className="font-semibold">Ritmo cardíaco mínimo:</p>
                <input
                  type="number"
                  value={rangos.rbpm_inferior}
                  onChange={(e) =>
                    setRangos({ ...rangos, rbpm_inferior: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <p className="font-semibold">Ritmo cardíaco máximo:</p>
                <input
                  type="number"
                  value={rangos.rbpm_superior}
                  onChange={(e) =>
                    setRangos({ ...rangos, rbpm_superior: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <p className="font-semibold">Oxigenación mínima:</p>
                <input
                  type="number"
                  value={rangos.rox_inferior}
                  onChange={(e) =>
                    setRangos({ ...rangos, rox_inferior: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <p className="font-semibold">Oxigenación máxima:</p>
                <input
                  type="number"
                  value={rangos.rox_superior}
                  onChange={(e) =>
                    setRangos({ ...rangos, rox_superior: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>
            </>
          )}
        </form>

=======
>>>>>>> 53a16513be64c8eb627441e3d2d35bfac565027f
        {/* Botón Guardar */}
        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-[#BA487F] text-white py-3 rounded-lg font-semibold hover:bg-[#a03c71] transition"
        >
          Guardar cambios
        </button>

        {/* Cancelar */}
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
<<<<<<< HEAD

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NavbarE from "./NavEmb";

// function UpdateProfile() {
//   const navigate = useNavigate();

//   const userString = localStorage.getItem("usuario");
//   const user = userString ? JSON.parse(userString) : null;
//   const userId = user ? user.id : null;

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [msg, setMsg] = useState("");

//   const updateProfile = async (userData) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/usuario/${userId}/`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) throw new Error();
//       return { success: true, message: "Datos actualizados correctamente 🎉" };
//     } catch {
//       return { success: false, message: "No se pudieron guardar los cambios" };
//     }
//   };

//   useEffect(() => {
//     if (!userId) {
//       setMsg("No se encontró el ID del usuario.");
//       setLoading(false);
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/usuario/${userId}/`);
//         const data = await response.json();
//         setUserData(data);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await updateProfile(userData);
//     setMsg(result.message);

//     if (result.success) setTimeout(() => navigate("/profile"), 1500);
//   };

//   if (loading) return <p className="text-center mt-10">Cargando...</p>;
//   if (!userData) return <p className="text-center mt-10">No se encontraron datos</p>;

//   return (
//     <main className="relative min-h-screen bg-gray-100 overflow-x-hidden">
//       <div className="absolute -top-28 -left-28 w-[500px] h-screen bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
//       <NavbarE />

//       {/* Fondo superior */}
//       <div className="w-full h-64 bg-gradient-to-r from-[#BA487F] to-[#F39F9F]"></div>

//       {/* Card principal */}
//       <div className="max-w-3xl mx-auto -mt-24 bg-white shadow-xl rounded-xl p-8 relative">
//         {/* Foto de perfil */}
//         <div className="flex justify-center">
//           <div className="relative">
//             <img
//               src="https://i.pravatar.cc/150?img=32"
//               alt="perfil"
//               className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
//             />
//           </div>
//         </div>

//         {/* Nombre */}
//         <h2 className="text-2xl font-bold text-center mt-4 text-[#BA487F]">
//           Editar Perfil
//         </h2>

//         {/* Mensaje */}
//         {msg && <p className="text-center mt-2 text-[#BA487F] font-semibold">{msg}</p>}

//         {/* FORMULARIO */}
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-10 p-6 border rounded-xl shadow-sm">
//           {/* Nombre */}
//           <div>
//             <p className="font-semibold text-gray-700">Nombre:</p>
//             <input
//               type="text"
//               value={userData.nombre}
//               onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
//               className="w-full mt-1 px-4 py-2 border rounded-lg"
//             />
//           </div>

//           {/* Apellido Paterno */}
//           <div>
//             <p className="font-semibold text-gray-700">Apellido Paterno:</p>
//             <input
//               type="text"
//               value={userData.ap_pat}
//               onChange={(e) => setUserData({ ...userData, ap_pat: e.target.value })}
//               className="w-full mt-1 px-4 py-2 border rounded-lg"
//             />
//           </div>

//           {/* Apellido Materno */}
//           <div>
//             <p className="font-semibold text-gray-700">Apellido Materno:</p>
//             <input
//               type="text"
//               value={userData.ap_mat}
//               onChange={(e) => setUserData({ ...userData, ap_mat: e.target.value })}
//               className="w-full mt-1 px-4 py-2 border rounded-lg"
//             />
//           </div>

//           {/* Correo */}
//           <div>
//             <p className="font-semibold text-gray-700">Correo:</p>
//             <input
//               type="email"
//               value={userData.correo}
//               onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
//               className="w-full mt-1 px-4 py-2 border rounded-lg"
//             />
//           </div>

//           {/* Fecha nacimiento */}
//           <div>
//             <p className="font-semibold text-gray-700">Fecha nacimiento:</p>
//             <input
//               type="date"
//               value={userData.fecha_nacimiento}
//               onChange={(e) => setUserData({ ...userData, fecha_nacimiento: e.target.value })}
//               className="w-full mt-1 px-4 py-2 border rounded-lg"
//             />
//           </div>

//           {/* Semana embarazo */}
//           <div>
//             <p className="font-semibold text-gray-700">Semanas embarazo:</p>
//             <input
//               type="number"
//               value={userData.semana_embarazo}
//               onChange={(e) => setUserData({ ...userData, semana_embarazo: e.target.value })}
//               className="w-full mt-1 px-4 py-2 border rounded-lg"
//             />
//           </div>
//         </form>

        

//         {/* Botón Guardar */}
//         <button
//           onClick={handleSubmit}
//           className="w-full mt-8 bg-[#BA487F] hover:bg-[#a03c71] text-white py-3 rounded-lg font-semibold hover:bg-[#F39F9F] transition"
//         >
//           Guardar Cambios
//         </button>

//         {/* Botón Cancelar */}
//         <button
//           onClick={() => navigate("/profile")}
//           className="w-full mt-4 bg-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-300"
//         >
//           Cancelar
//         </button>
//       </div>
//     </main>
//   );
// }

// export default UpdateProfile;
=======
>>>>>>> 53a16513be64c8eb627441e3d2d35bfac565027f
