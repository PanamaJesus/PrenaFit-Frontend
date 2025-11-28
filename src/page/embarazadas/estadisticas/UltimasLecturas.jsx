import React, { useEffect, useState } from "react";
import SignoGauge from "../../../components/charts/SignoGauge";

export default function UltimasLecturas() {
  const [lectura, setLectura] = useState(null);
  const [rangos, setRangos] = useState(null);

  useEffect(() => {
    const usuarioId = JSON.parse(localStorage.getItem("usuario"));
    console.log("Usuario ID desde localStorage:", usuarioId);
    if (!usuarioId) return;

    fetch("http://127.0.0.1:8000/api/lectura/ultimaLectura/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario_id: usuarioId.id }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener la última lectura");
        }
        return response.json();
      })
      .then(data => {
        setLectura(data.lectura);
        setRangos(data.rangos);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (!lectura || !rangos) return <p>Cargando lecturas...</p>;
    const fechaHora = new Date(lectura.fecha).toLocaleString();


  return (
    <div className="w-full flex flex-wrap gap-6 justify-center mt-6">
      <SignoGauge
        title="Frecuencia Cardíaca"
        valor={lectura.lectura_bpm}
        unidad="bpm"
        rangos={{
          normalMin: rangos.rbpm_inferior,
          normalMax: rangos.rbpm_superior,
          peligroMin: rangos.rbpm_inferior - 10,
          peligroMax: rangos.rbpm_superior + 20
        }}
      />

      <SignoGauge
        title="Oxigenación"
        valor={lectura.lectura_ox}
        unidad="%"
        rangos={{
          normalMin: rangos.rox_inferior,
          normalMax: rangos.rox_superior,
          peligroMin: rangos.rox_inferior - 5,
          peligroMax: rangos.rox_superior + 5
        }}
      />

      <SignoGauge
        title="Temperatura"
        valor={lectura.temperatura}
        unidad="°C"
        rangos={{
          normalMin: 36,
          normalMax: 37.5,
          peligroMin: 33,
          peligroMax: 38
        }}
      />
    </div>
  );
}
