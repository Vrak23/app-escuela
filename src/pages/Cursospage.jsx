import { useState, useEffect } from "react";
import CursoForm from "../components/CursoForm";

const CursosPage = () => {

  const [cursos, setCursos] = useState([]);
  const [cursoEditar, setCursoEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // ── Obtener cursos ────────────────────────────────
  const cargarCursos = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch("http://127.0.0.1:8000/api/cursos");
      const datos = await respuesta.json();
      setCursos(datos);
    } catch (err) {
      console.error("Error al cargar cursos:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarCursos(); }, []);

  // ── Eliminar ──────────────────────────────────────
  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este curso?")) return;
    setEliminandoId(id);
    try {
      await fetch(`http://127.0.0.1:8000/api/cursos/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" },
      });
      await cargarCursos();
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("No se pudo eliminar el curso");
    } finally {
      setEliminandoId(null);
    }
  };

  // ── Filtro ────────────────────────────────────────
  const filtrados = cursos.filter((c) => {
    const q = busqueda.toLowerCase();
    return (
      c.nombre_curso?.toLowerCase().includes(q) ||
      c.descripcion?.toLowerCase().includes(q)
    );
  });

  // ── Estilos ───────────────────────────────────────
  const thStyle = {
    background: "#13161e",
    color: "#00cfff",
    fontFamily: "'Exo 2', sans-serif",
    fontWeight: 700,
    fontSize: "0.78rem",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    borderBottom: "2px solid #2a3048",
    padding: "12px 16px",
    whiteSpace: "nowrap",
  };

  const tdStyle = {
  color: "#1f2937",
  fontFamily: "'Exo 2', sans-serif",
  fontSize: "0.88rem",
  borderBottom: "1px solid #1f2433",
  padding: "12px 16px",
  verticalAlign: "middle",
};

  return (
    <div className="container py-5">

      <h1 className="mb-2 text-center">Directorio de Cursos</h1>

      <p className="text-center mb-5" style={{
        color: "#8a93a8",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.85rem",
        letterSpacing: "1px",
      }}>
        {cursos.length} curso{cursos.length !== 1 ? "s" : ""} registrado{cursos.length !== 1 ? "s" : ""}
      </p>

      {/* Formulario */}
      <CursoForm
        cursoEditar={cursoEditar}
        onGuardado={() => { setCursoEditar(null); cargarCursos(); }}
        onCancelar={() => setCursoEditar(null)}
      />

      {/* Separador */}
      <div className="d-flex align-items-center gap-3 mb-4" style={{ opacity: 0.4 }}>
        <div style={{ flex: 1, height: "1px", background: "#2a3048" }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          color: "#8a93a8",
          letterSpacing: "2px",
          textTransform: "uppercase"
        }}>
          Lista
        </span>
        <div style={{ flex: 1, height: "1px", background: "#2a3048" }} />
      </div>

      {/* Buscador */}
      <div className="mb-3" style={{ maxWidth: "360px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            background: "#1a1e2a",
            border: "1px solid #2a3048",
            color: "#e8ecf4",
            borderRadius: "10px",
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "0.88rem",
          }}
        />
      </div>

      {/* Tabla */}
      <div style={{
        background: "#13161e",
        borderRadius: "16px",
        border: "1px solid #2a3048",
        overflow: "hidden",
        boxShadow: "0 8px 32px #00000066",
      }}>

        {cargando ? (
          <div className="text-center py-5" style={{ color: "#8a93a8" }}>
            <div className="spinner-border mb-3" style={{ color: "#00cfff", width: "2rem", height: "2rem" }} />
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>
              Cargando cursos...
            </p>
          </div>

        ) : filtrados.length === 0 ? (
          <div className="text-center py-5">
            <p style={{ color: "#8a93a8", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}>
              {busqueda ? "Sin resultados para la búsqueda." : "No hay cursos registrados."}
            </p>
          </div>

        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table table-borderless mb-0 cursos-registrados-table">
              <thead>
                <tr>
                  {["#", "Nombre del Curso", "Créditos", "Descripción", "Acciones"].map(
                    (h) => <th key={h} style={thStyle}>{h}</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {filtrados.map((c, idx) => (
                  <tr
                    key={c.id_curso}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    style={{ transition: "background 0.2s" }}
                  >
                    <td style={{ ...tdStyle, color: "#475569", width: "40px" }}>
                      {idx + 1}
                    </td>

                    <td style={{ ...tdStyle, fontWeight: 600 }}>
                      {c.nombre_curso}
                    </td>

                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <span style={{
                        background: "#00cfff22",
                        color: "#00cfff",
                        border: "1px solid #00cfff44",
                        borderRadius: "999px",
                        padding: "3px 14px",
                        fontSize: "0.82rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                      }}>
                        {c.creditos} cr.
                      </span>
                    </td>

                    <td style={{ ...tdStyle, color: "#334155", maxWidth: "320px" }}>
                      {c.descripcion
                        ? c.descripcion.length > 80
                          ? c.descripcion.substring(0, 80) + "..."
                          : c.descripcion
                        : <span style={{ fontStyle: "italic", opacity: 0.5 }}>
                            Sin descripción
                          </span>
                      }
                    </td>

                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-sm"
                          onClick={() => {
                            setCursoEditar(c);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          style={{
                            background: "transparent",
                            border: "1px solid #00cfff",
                            color: "#00cfff",
                            borderRadius: "8px",
                            fontSize: "0.78rem",
                            fontFamily: "'Exo 2', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-sm"
                          onClick={() => manejarEliminar(c.id_curso)}
                          disabled={eliminandoId === c.id_curso}
                          style={{
                            background: "transparent",
                            border: "1px solid #ff4d6a",
                            color: "#ff4d6a",
                            borderRadius: "8px",
                            fontSize: "0.78rem",
                            fontFamily: "'Exo 2', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {eliminandoId === c.id_curso ? "..." : "✕"}
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default CursosPage;
