// src/App.jsx

import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import AlumnoCard from "./components/AlumnoCard";
import AlumnoForm from "./components/AlumnoForm";
import foto from "./assets/img/foto.png";

function App() {

  const [alumnos, setAlumnos] = useState([]);

  const obtenerAlumnos = async () => {
    try {
      const respuesta = await fetch("http://127.0.0.1:8000/api/alumnos");
      const datos = await respuesta.json();
      setAlumnos(datos);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
    }
  };

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h1 className="mb-2 text-center">Directorio de Alumnos</h1>
        <p
          className="text-center mb-5"
          style={{
            color: "#8a93a8",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.85rem",
            letterSpacing: "1px",
          }}
        >
          {alumnos.length} alumno{alumnos.length !== 1 ? "s" : ""} registrado{alumnos.length !== 1 ? "s" : ""}
        </p>

        {/* Formulario */}
        <AlumnoForm recargarAlumnos={obtenerAlumnos} />

        {/* Separador */}
        <div
          className="d-flex align-items-center gap-3 mb-4"
          style={{ opacity: 0.4 }}
        >
          <div style={{ flex: 1, height: "1px", background: "#2a3048" }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#8a93a8",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Alumnos
          </span>
          <div style={{ flex: 1, height: "1px", background: "#2a3048" }} />
        </div>

        {/* Cards */}
        <div className="row justify-content-center">
          {alumnos.map((alumno) => (
            <AlumnoCard
              key={alumno.id_alumno}
              nombre={`${alumno.nombre} ${alumno.apellidos}`}
              carrera={alumno.email}
              estadoInicial={alumno.estado_matricula}
              imagen={foto}
            />
          ))}
        </div>

      </div>
    </>
  );
}

export default App;