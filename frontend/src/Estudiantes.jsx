import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/estudiantes";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");

  const cargarEstudiantes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setEstudiantes(data);
  };

  const agregarEstudiante = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, dni }),
    });
    setNombre("");
    setDni("");
    cargarEstudiantes();
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  return (
    <div>
      <h2>Estudiantes</h2>
      <ul>
        {estudiantes.map((e) => (
          <li key={e.id}>
            {e.nombre} - DNI: {e.dni}
          </li>
        ))}
      </ul>
      <h3>Agregar Estudiante</h3>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        placeholder="DNI"
      />
      <button onClick={agregarEstudiante}>Agregar</button>
    </div>
  );
}

export default Estudiantes;