import { useState, useEffect } from "react";
import ProfesorForm from "../components/ProfesorForm";
import ProfesorCard from "../components/ProfesorCard";
import foto from "../assets/img/foto.png";

const ProfesoresPage = () => {

  const [profesores,     setProfesores]     = useState([]);
  const [profesorEditar, setProfesorEditar] = useState(null);
  const [cargando,       setCargando]       = useState(true);
  const [eliminandoId,   setEliminandoId]   = useState(null);

  const cargarProfesores = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch("http://127.0.0.1:8000/api/profesores");
      const datos = await respuesta.json();
      setProfesores(datos);
    } catch (err) {
      console.error("Error al cargar profesores:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarProfesores(); }, []);

  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este profesor?")) return;
    setEliminandoId(id);
    try {
      await fetch(`http://127.0.0.1:8000/api/profesores/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" },
      });
      await cargarProfesores();
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("No se pudo eliminar el profesor");
    } finally {
      setEliminandoId(null);
    }
  };

  const manejarEditar = (profesor) => {
    setProfesorEditar(profesor);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container py-5">

      <h1 className="mb-2 text-center">Directorio de Profesores</h1>
      <p className="text-center mb-5" style={{
        color: "#8a93a8",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.85rem",
        letterSpacing: "1px",
      }}>
        {profesores.length} profesor{profesores.length !== 1 ? "es" : ""} registrado{profesores.length !== 1 ? "s" : ""}
      </p>

      {/* Formulario */}
      <ProfesorForm
        profesorEditar={profesorEditar}
        onGuardado={() => { setProfesorEditar(null); cargarProfesores(); }}
        onCancelar={() => setProfesorEditar(null)}
      />

      {/* Separador */}
      <div className="d-flex align-items-center gap-3 mb-4" style={{ opacity: 0.4 }}>
        <div style={{ flex: 1, height: "1px", background: "#2a3048" }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#8a93a8", letterSpacing: "2px", textTransform: "uppercase" }}>
          Profesores
        </span>
        <div style={{ flex: 1, height: "1px", background: "#2a3048" }} />
      </div>

      {/* Cards */}
      {cargando ? (
        <div className="text-center py-5" style={{ color: "#8a93a8" }}>
          <div className="spinner-border mb-3" style={{ color: "#00cfff", width: "2rem", height: "2rem" }} />
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>Cargando profesores...</p>
        </div>
      ) : profesores.length === 0 ? (
        <div className="text-center py-5">
          <p style={{ color: "#8a93a8", fontFamily: "'JetBrains Mono', monospace" }}>No hay profesores registrados.</p>
        </div>
      ) : (
        <div className="row justify-content-center">
          {profesores.map((p) => (
            <ProfesorCard
              key={p.id_profesor}
              profesor={p}
              imagen={foto}
              onEditar={manejarEditar}
              onEliminar={manejarEliminar}
              eliminando={eliminandoId === p.id_profesor}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default ProfesoresPage;
