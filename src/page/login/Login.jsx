import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo }),
      });

      if (!response.ok) {
        setError("Correo no registrado");
        return;
      }

      const data = await response.json();
      const usuario = data.usuario;

      // Guardar en sessionStorage
      sessionStorage.setItem("usuario", JSON.stringify(usuario));

      // 🔥 Redirección según rol
      if (usuario.rol === 1) {
        navigate("/IdxAdmin");
      } else if (usuario.rol === 2) {
        navigate("/IdxEmb");
      } else {
        setError("Rol no reconocido");
      }

    } catch (err) {
      setError("Error de conexión con la API");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu correo"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
