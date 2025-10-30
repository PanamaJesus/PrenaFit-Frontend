import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Bienvenida a PrenaFit</h1>
      <div className="flex justify-center gap-4">
        <Link
          to="/admin"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ir a Admin
        </Link>
        <Link
          to="/contenido"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ver Contenido
        </Link>
      </div>
    </div>
  );
}

export default Home;
