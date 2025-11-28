// // UpdateProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarE from "./NavEmb";

function UpdateProfile() {
  const navigate = useNavigate();

  // Obtener el usuario desde localStorage (CORRECTO)
  const userString = localStorage.getItem("usuario");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user ? user.id : null;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // FUNCIÓN PARA ACTUALIZAR PERFIL (PATCH)
  const updateProfile = async (userData) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/usuario/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      return { success: true, message: "Datos actualizados correctamente 🎉" };
    } catch (error) {
      console.error("Error en updateProfile:", error);
      return { success: false, message: "No se pudieron guardar los cambios" };
    }
  };

  // CARGAR DATOS DEL USUARIO
  useEffect(() => {
    if (!userId) {
      setMsg("No se encontró el ID del usuario.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/usuario/${userId}/`
        );

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // MANEJAR SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updateProfile(userData);
    setMsg(result.message);

    if (result.success) {
      setTimeout(() => navigate("/profile"), 1500);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!userData) return <p>No se encontraron datos</p>;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

      <NavbarE />

      <div className="mt-28 min-h-screen flex justify-center items-center p-6">
        <div className="max-w-lg w-full bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#A83279]">
            Editar Perfil
          </h2>

          {msg && <p className="text-center text-sm mb-3">{msg}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold">Nombre</label>
              <input
                type="text"
                value={userData.nombre}
                onChange={(e) =>
                  setUserData({ ...userData, nombre: e.target.value })
                }
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Apellido Paterno</label>
              <input
                type="text"
                value={userData.ap_pat}
                onChange={(e) =>
                  setUserData({ ...userData, ap_pat: e.target.value })
                }
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Apellido Materno</label>
              <input
                type="text"
                value={userData.ap_mat}
                onChange={(e) =>
                  setUserData({ ...userData, ap_mat: e.target.value })
                }
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Semana de Embarazo</label>
              <input
                type="number"
                value={userData.semana_embarazo}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    semana_embarazo: Number(e.target.value),
                  })
                }
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Correo</label>
              <input
                type="email"
                value={userData.correo}
                onChange={(e) =>
                  setUserData({ ...userData, correo: e.target.value })
                }
                className="w-full border p-2 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#A83279] text-white py-2 rounded-lg font-semibold hover:bg-[#8f2967]"
            >
              Guardar Cambios
            </button>
          </form>

          <button
            className="mt-4 w-full bg-gray-300 py-2 rounded-lg"
            onClick={() => navigate("/profile")}
          >
            Cancelar
          </button>
        </div>
      </div>
    </main>
  );
}

export default UpdateProfile;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NavbarE from "./NavEmb";

// function UpdateProfile() {
//   const navigate = useNavigate();

//   //Obtener el ID guardado en sessionStorage
//   const userId = sessionStorage.getItem("userId");

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [msg, setMsg] = useState("");

//   //FUNCIÓN PARA ACTUALIZAR PERFIL (PATCH)
//   const updateProfile = async (userData) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/usuario/${userId}/`, 
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Error al actualizar el usuario");
//       }

//       return { success: true, message: "Datos actualizados correctamente 🎉" };
//     } catch (error) {
//       console.error("Error en updateProfile:", error);
//       return { success: false, message: "No se pudieron guardar los cambios" };
//     }
//   };

//   //CARGAR DATOS DEL USUARIO EXISTENTE
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:8000/api/usuario/${userId}/`
//         );
//         const data = await response.json();
//         setUserData(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   // MANEJAR SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await updateProfile(userData);
//     setMsg(result.message);

//     if (result.success) {
//       setTimeout(() => navigate("/profile"), 1500);
//     }
//   };

//   if (loading) return <p>Cargando...</p>;
//   if (!userData) return <p>No se encontraron datos</p>;

//   return (
//     <main className="relative min-h-screen overflow-x-hidden">
//       <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
//       <div className="overflow-hidden">
//         <NavbarE />
//         <div className="mt-28">
//           <div className="min-h-screen flex justify-center items-center p-6">
//             <div className="max-w-lg w-full bg-white p-6 rounded-xl shadow-lg">
//               <h2 className="text-2xl font-bold mb-4 text-center text-[#A83279]">
//                 Editar Perfil
//               </h2>

//               {msg && <p className="text-center text-sm mb-3">{msg}</p>}

//               <form className="space-y-4" onSubmit={handleSubmit}>
//                 <div>
//                   <label className="block font-semibold">Nombre</label>
//                   <input
//                     type="text"
//                     value={userData.nombre}
//                     onChange={(e) =>
//                       setUserData({ ...userData, nombre: e.target.value })
//                     }
//                     className="w-full border p-2 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-semibold">Apellido Paterno</label>
//                   <input
//                     type="text"
//                     value={userData.ap_pat}
//                     onChange={(e) =>
//                       setUserData({ ...userData, ap_pat: e.target.value })
//                     }
//                     className="w-full border p-2 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-semibold">Apellido Materno</label>
//                   <input
//                     type="text"
//                     value={userData.ap_mat}
//                     onChange={(e) =>
//                       setUserData({ ...userData, ap_mat: e.target.value })
//                     }
//                     className="w-full border p-2 rounded-md"
//                   />
//                 </div>

//                 {/*Falta validar que no pueda escribir menos semans de las que ya tiene*/}
//                 <div>
//                   <label className="block font-semibold">Semana de Embarazo</label>
//                   <input
//                     type="number"
//                     value={userData.semana_embarazo}
//                     onChange={(e) =>
//                       setUserData({
//                         ...userData,
//                         semana_embarazo: Number(e.target.value),
//                       })
//                     }
//                     className="w-full border p-2 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-semibold">Correo</label>
//                   <input
//                     type="email"
//                     value={userData.correo}
//                     onChange={(e) =>
//                       setUserData({ ...userData, correo: e.target.value })
//                     }
//                     className="w-full border p-2 rounded-md"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#A83279] text-white py-2 rounded-lg font-semibold hover:bg-[#8f2967]"
//                 >
//                   Guardar Cambios
//                 </button>
//               </form>

//               <button
//                 className="mt-4 w-full bg-gray-300 py-2 rounded-lg"
//                 onClick={() => navigate("/profile")}
//               >
//                 Cancelar
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default UpdateProfile;
