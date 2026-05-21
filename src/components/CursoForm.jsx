import { useState, useEffect } from "react";

const VACIO = {
  nombre_curso: "",
  creditos:     "",
  descripcion:  "",
};

const CursoForm = ({ cursoEditar, onGuardado, onCancelar }) => {

  const [form,     setForm]     = useState(VACIO);
  const [cargando, setCargando] = useState(false);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (cursoEditar) {
      setForm({
        nombre_curso: cursoEditar.nombre_curso ?? "",
        creditos:     cursoEditar.creditos     ?? "",
        descripcion:  cursoEditar.descripcion  ?? "",
      });
    } else {
      setForm(VACIO);
    }
  }, [cursoEditar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const url = cursoEditar
      ? `http://127.0.0.1:8000/api/cursos/${cursoEditar.id_curso}`
      : "http://127.0.0.1:8000/api/cursos";

    const method = cursoEditar ? "PUT" : "POST";

    try {
      const respuesta = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(form),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        alert(cursoEditar ? "Curso actualizado" : "Curso guardado correctamente");
        setForm(VACIO);
        onGuardado();
      } else {
        console.log(datos.errors);
        setError(JSON.stringify(datos.errors ?? datos.message ?? "Error al guardar"));
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con Laravel");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-card-wrapper mb-5 mx-auto" style={{ maxWidth: "620px" }}>
      <div className="card shadow-lg">

        <div className="card-header">
          <h5 className="mb-0 text-center">
            {cursoEditar ? "✏️ Editar Curso" : "➕ Registrar Curso"}
          </h5>
        </div>

        <div className="card-body p-4">

          {error && (
            <div className="mb-3 px-3 py-2 rounded" style={{
              background: "#ff4d6a22",
              border: "1px solid #ff4d6a",
              color: "#ff4d6a",
              fontSize: "0.85rem",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={manejarEnvio}>
            <div className="row g-3">

              {/* Nombre */}
              <div className="col-md-8">
                <label className="form-label">Nombre del Curso</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre_curso"
                  value={form.nombre_curso}
                  onChange={manejarCambio}
                  placeholder="Ej. Cálculo I"
                  required
                />
              </div>

              {/* Créditos */}
              <div className="col-md-4">
                <label className="form-label">Créditos</label>
                <input
                  type="number"
                  className="form-control"
                  name="creditos"
                  value={form.creditos}
                  onChange={manejarCambio}
                  placeholder="Ej. 4"
                  min="1"
                  max="20"
                  required
                />
              </div>

              {/* Descripción */}
              <div className="col-12">
                <label className="form-label">
                  Descripción{" "}
                  <span style={{ color: "#8a93a8", fontSize: "0.8rem" }}>(opcional)</span>
                </label>
                <textarea
                  className="form-control"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={manejarCambio}
                  placeholder="Breve descripción del curso..."
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="col-12 d-flex justify-content-center gap-3 mt-2">
                <button
                  type="submit"
                  className="btn btn-info fw-bold px-5"
                  disabled={cargando}
                >
                  {cargando ? "Guardando..." : cursoEditar ? "Actualizar" : "Guardar Curso"}
                </button>

                {cursoEditar && (
                  <button
                    type="button"
                    className="btn fw-bold px-4"
                    onClick={onCancelar}
                    style={{
                      background: "transparent",
                      border: "1px solid #8a93a8",
                      color: "#8a93a8",
                      borderRadius: "10px",
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CursoForm;