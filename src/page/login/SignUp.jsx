import React, { useState, useEffect } from "react";

export default function SignUpForm() {
  const [icons, setIcons] = useState([]);

  const [state, setState] = useState({
    nombre: "",
    ap_pat: "",
    ap_mat: "",
    correo: "",
    contrasena: "",
    semana_embarazo: "",
    rol: 2,
    codigo_vinculacion: "",
    estado: true,
    imagen_perfil: null,
    fecha_nacimiento: null
  });

  // 🔹 Cargar íconos del backend
  useEffect(() => {
    async function cargarIconos() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/imagenes/");
        const data = await res.json();

        console.log("📌 Íconos recibidos del backend:", data);
        setIcons(data);

      } catch (error) {
        console.error("❌ Error cargando íconos:", error);
      }
    }
    cargarIconos();
  }, []);

  // 🔹 Tracear los inputs en tiempo real
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    console.log(`✏️ Input cambiado: ${name} =`, type === "checkbox" ? checked : value);

    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // 🔹 Enviar el formulario
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...state,
       fecha_nacimiento: state.fecha_nacimiento || null,
      semana_embarazo:
        state.semana_embarazo === "" ? null : Number(state.semana_embarazo),
      rol: 2
    };

    console.log("📤 JSON que se enviará al backend:", payload);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      console.log("Respuesta del backend:", data);

      if (!response.ok) {
        alert("Error: " + (data.error || "No se pudo registrar"));
        return;
      }

      alert("✅ Registro exitoso");
      console.log("Usuario registrado:", data);

      setState({
        nombre: "",
        ap_pat: "",
        ap_mat: "",
        correo: "",
        contrasena: "",
        semana_embarazo: "",
        rol: 2,
        codigo_vinculacion: "",
        estado: true,
        imagen_perfil: null,
        fecha_nacimiento: null
      });

    } catch (error) {
      console.error("❌ Error al conectar con backend:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const [step, setStep] = React.useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
  <div className="form-container form-animation sign-up flex items-center justify-center">
    <form
      onSubmit={handleOnSubmit}
      className="bg-white flex flex-col items-center justify-center h-full text-center"
    >
      <h1 className="text-3xl font-bold mb-3">Create Account</h1>
      <span className="text-xs text-gray-600 mb-4">
        Register with your personal information
      </span>

      {/* PASO 1 */}
      {step === 1 && (
        <>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={state.nombre}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
            required
          />

          <input
            type="text"
            name="ap_pat"
            placeholder="Apellido Paterno"
            value={state.ap_pat}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
            required
          />

          <input
            type="text"
            name="ap_mat"
            placeholder="Apellido Materno"
            value={state.ap_mat}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
            required
          />

          <input
            type="date"
            name="fecha_nacimiento"
            value={state.fecha_nacimiento ?? ""}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
            required
          />

          <input
            type="number"
            name="semana_embarazo"
            placeholder="Semana de embarazo"
            value={state.semana_embarazo}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
            min="1"
            required
          />
        </>
      )}

      {/* PASO 2 */}
      {step === 2 && (
        <>
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={state.correo}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
            required
          />
        </>
      )}

      {/* PASO 3 */}
      {step === 3 && (
        <>
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={state.contrasena}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
            required
          />
        </>
      )}

      {/* PASO 4 */}
      {step === 4 && (
        <>
          <h2 className="text-lg font-semibold mb-3">Selecciona tu ícono</h2>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {icons.map((icon) => (
              <label
                key={icon.id}
                className={`cursor-pointer p-2 rounded-xl border transition transform
                  ${
                    state.imagen_perfil === icon.id
                      ? "border-[#ff4b2b] scale-105 shadow-md"
                      : "border-gray-300"
                  }`}
              >
                <input
                  type="radio"
                  name="imagen_perfil"
                  value={icon.id}
                  checked={state.imagen_perfil === icon.id}
                  onChange={(e) => {
                    console.log("🖼 Ícono seleccionado:", e.target.value);
                    setState({
                      ...state,
                      imagen_perfil: Number(e.target.value)
                    });
                  }}
                  className="hidden"
                />

                <img
                  src={icon.url}
                  alt="icono perfil"
                  className="w-16 h-16 object-contain mx-auto"
                />
              </label>
            ))}
          </div>
        </>
      )}

      {/* FLECHAS */}
      <div className="flex justify-between w-full mt-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="text-[#ff4b2b] font-bold text-xl"
          >
            ←
          </button>
        ) : (
          <div></div>
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className="text-[#ff4b2b] font-bold text-xl"
          >
            →
          </button>
        ) : (
          <div></div>
        )}
      </div>

      {step === 4 && (
        <button
          className="mt-4 rounded-full px-10 py-3 text-white text-xs font-bold bg-[#ff4b2b] uppercase hover:scale-95 transition"
        >
          Sign Up
        </button>
      )}
    </form>
  </div>
  );
}

