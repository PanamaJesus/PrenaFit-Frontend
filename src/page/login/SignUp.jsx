import React, { useState } from "react";

export default function SignUpForm() {
  const [state, setState] = useState({
    nombre: "",
    ap_pat: "",
    ap_mat: "",
    correo: "",
    password: "",
    semana_embarazo: "",
    codigo_vinculacion: "",
    estado: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...state,
      semana_embarazo:
        state.semana_embarazo === "" ? null : Number(state.semana_embarazo),
      rol: 2 // ✅ rol por defecto sin pedirlo en el formulario
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + (data.error || "No se pudo registrar"));
        return;
      }

      alert("✅ Registro exitoso");
      console.log("Usuario registrado:", data);

      // Reset
      setState({
        nombre: "",
        ap_pat: "",
        ap_mat: "",
        correo: "",
        password: "",
        semana_embarazo: "",
        codigo_vinculacion: "",
        estado: false
      });
    } catch (error) {
      alert("Error al conectar con el servidor");
      console.error(error);
    }
  };
  const [step, setStep] = React.useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
  <div className="form-container form-animation sign-up flex items-center justify-center">
    <form
      onSubmit={handleOnSubmit}
      className="bg-white flex flex-col items-center justify-center px-10 h-full text-center"
    >
      <h1 className="text-3xl font-bold mb-3">Create Account</h1>
      <span className="text-xs text-gray-600 mb-4">
        Register with your personal information
      </span>

      {/* ✅ PASO 1 */}
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
        </>
      )}

      {/* ✅ PASO 2 */}
      {step === 2 && (
        <>
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

      {/* ✅ PASO 3 */}
      {step === 3 && (
        <>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={state.password}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
            required
          />

          <input
            type="number"
            name="semana_embarazo"
            placeholder="Semana de embarazo (opcional)"
            value={state.semana_embarazo}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
            min="1"
          />
        </>
      )}

      {/* ✅ PASO 4 */}
      {step === 4 && (
        <>
          <input
            type="text"
            name="codigo_vinculacion"
            placeholder="Código de vinculación (opcional)"
            value={state.codigo_vinculacion}
            onChange={handleChange}
            className="bg-gray-200 px-4 py-3 my-2 w-full rounded"
          />

          <label className="flex items-center gap-2 mt-2 text-sm">
            <input
              type="checkbox"
              name="estado"
              checked={state.estado}
              onChange={handleChange}
            />
            Activo
          </label>
        </>
      )}

      {/* ✅ FLECHAS DE NAVEGACIÓN */}
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

      {/* ✅ BOTÓN FINAL */}
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
