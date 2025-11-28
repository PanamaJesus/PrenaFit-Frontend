import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    correo: "",
    contrasena: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { correo, contrasena } = state;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: correo,
          contrasena: contrasena
        }),
      });

      const data = await response.json();

      console.log(JSON.stringify({
          correo: correo,
          contrasena: contrasena
        }));
      if (!response.ok) {
        setError(data.error || "Error en el inicio de sesión");
        return;
      }

      const usuario = data.usuario;
      console.log(usuario);

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // ✅ Redirección según rol
      if (usuario.rol === 1) {
        navigate("/IdxAdmin");
      } else if (usuario.rol === 2) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        navigate("/IdxEmb");
      } else {
        setError("Rol no reconocido");
      }
    } catch (error) {
      setError("Error de conexión con la API");
    }
  };

  return (
    <div className="form-container form-animation sign-in flex items-center justify-center">
      <form
        onSubmit={handleOnSubmit}
        className="bg-white flex flex-col items-center justify-center px-10 h-full text-center"
      >
        <h1 className="text-3xl font-bold mb-3">Sign In</h1>

        {/* Mensaje de error */}
        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <div className="flex justify-center space-x-3 my-4">
          <a href="#" className="social-button flex items-center justify-center">
            <i className="fab fa-facebook-f text-gray-600" />
          </a>
          <a href="#" className="social-button flex items-center justify-center">
            <i className="fab fa-google-plus-g text-gray-600" />
          </a>
          <a href="#" className="social-button flex items-center justify-center">
            <i className="fab fa-linkedin-in text-gray-600" />
          </a>
        </div>

        <span className="text-xs text-gray-600">or use your account</span>

        <input
          type="email"
          name="correo"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
          className="bg-gray-200 border-none px-4 py-3 my-2 w-full outline-none rounded"
        />

        <input
          type="password"
          name="contrasena"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="bg-gray-200 border-none px-4 py-3 my-2 w-full outline-none rounded"
        />

        <button
          className="mt-3 rounded-full px-10 py-3 text-white text-xs font-bold bg-[#BA487F] tracking-widest uppercase border border-[#BA487F] hover:scale-95 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInForm;