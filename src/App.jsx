import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar         from "./components/Navbar";
import AlumnoCard     from "./components/AlumnoCard";
import AlumnoForm     from "./components/AlumnoForm";
import ProfesoresPage from "./pages/ProfesoresPage";
import CursosPage     from "./pages/Cursospage";
import foto           from "./assets/img/foto.png";

// ── Página Alumnos ────────────────────────────────────
const AlumnosPage = () => {
  const [alumnos, setAlumnos] = useState([]);

  const obtenerAlumnos = async () => {
    try {
      const res  = await fetch("http://127.0.0.1:8000/api/alumnos");
      const data = await res.json();
      setAlumnos(data);
    } catch (err) {
      console.error("Error al obtener alumnos:", err);
    }
  };

  useEffect(() => { obtenerAlumnos(); }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-2 text-center">Directorio de Alumnos</h1>
      <p className="text-center mb-5" style={{
        color: "#8a93a8",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.85rem",
        letterSpacing: "1px",
      }}>
        {alumnos.length} alumno{alumnos.length !== 1 ? "s" : ""} registrado{alumnos.length !== 1 ? "s" : ""}
      </p>

      <AlumnoForm recargarAlumnos={obtenerAlumnos} />

      <div className="d-flex align-items-center gap-3 mb-4" style={{ opacity: 0.4 }}>
        <div style={{ flex: 1, height: "1px", background: "#2a3048" }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#8a93a8", letterSpacing: "2px", textTransform: "uppercase" }}>
          Alumnos
        </span>
        <div style={{ flex: 1, height: "1px", background: "#2a3048" }} />
      </div>

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
  );
};

// ── Página Inicio ─────────────────────────────────────
const InicioPage = () => (
  <div className="container py-5 text-center">
    <h1 className="mb-3">Bienvenido a SENATI</h1>
    <p style={{ color: "#8a93a8", fontFamily: "'JetBrains Mono', monospace" }}>
      Usa el menú <strong style={{ color: "#00cfff" }}>Mantenimiento</strong> para gestionar Alumnos, Profesores y Cursos.
    </p>
  </div>
);

// ── App ───────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<InicioPage />}     />
        <Route path="/alumnos"    element={<AlumnosPage />}    />
        <Route path="/profesores" element={<ProfesoresPage />} />
        <Route path="/cursos"     element={<CursosPage />}     />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
