import { useState, useEffect } from "react";

const VACIO = {
  nombre:            "",
  id_alumno:         "",
  fecha_naciemiento: "",
  dni:               "",
  direccion:         "",
  telefono:          "",
  email:             "",
  especialidad:      "",
};

const ProfesorForm = ({ profesorEditar, onGuardado, onCancelar }) => {

  const [form,     setForm]     = useState(VACIO);
  const [cargando, setCargando] = useState(false);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (profesorEditar) {
      setForm({
        nombre:            profesorEditar.nombre            ?? "",
        id_alumno:         profesorEditar.id_alumno         ?? "",
        fecha_naciemiento: profesorEditar.fecha_naciemiento ?? "",
        dni:               profesorEditar.dni               ?? "",
        direccion:         profesorEditar.direccion         ?? "",
        telefono:          profesorEditar.telefono          ?? "",
        email:             profesorEditar.email             ?? "",
        especialidad:      profesorEditar.especialidad      ?? "",
      });
    } else {
      setForm(VACIO);
    }
  }, [profesorEditar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const url = profesorEditar
      ? `http://127.0.0.1:8000/api/profesores/${profesorEditar.id_profesor}`
      : "http://127.0.0.1:8000/api/profesores";

    const method = profesorEditar ? "PUT" : "POST";

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
        alert(profesorEditar ? "Profesor actualizado" : "Profesor guardado correctamente");
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

  const campos = [
    { name: "nombre",            label: "Nombre",           type: "text",  placeholder: "Ej. Carlos",         col: 6 },
    { name: "id_alumno",         label: "ID Alumno",        type: "text",  placeholder: "Ej. 1",              col: 6 },
    { name: "fecha_naciemiento", label: "Fecha Nacimiento", type: "date",  placeholder: "",                   col: 6 },
    { name: "dni",               label: "DNI",              type: "text",  placeholder: "12345678",           col: 6 },
    { name: "especialidad",      label: "Especialidad",     type: "text",  placeholder: "Ej. Matemáticas",    col: 6 },
    { name: "email",             label: "Email",            type: "email", placeholder: "correo@ejemplo.com", col: 6 },
    { name: "telefono",          label: "Teléfono",         type: "text",  placeholder: "999888777",          col: 6 },
    { name: "direccion",         label: "Dirección",        type: "text",  placeholder: "Ej. Av. Lima 123",   col: 6 },
  ];

  return (
    <div className="form-card-wrapper mb-5 mx-auto" style={{ maxWidth: "720px" }}>
      <div className="card shadow-lg">

        <div className="card-header">
          <h5 className="mb-0 text-center">
            {profesorEditar ? "✏️ Editar Profesor" : "➕ Registrar Profesor"}
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

              {campos.map(({ name, label, type, placeholder, col }) => (
                <div className={`col-md-${col}`} key={name}>
                  <label className="form-label">{label}</label>
                  <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={form[name]}
                    onChange={manejarCambio}
                    placeholder={placeholder}
                    required={name !== "direccion"}
                  />
                </div>
              ))}

              <div className="col-12 d-flex justify-content-center gap-3 mt-2">
                <button
                  type="submit"
                  className="btn btn-info fw-bold px-5"
                  disabled={cargando}
                >
                  {cargando ? "Guardando..." : profesorEditar ? "Actualizar" : "Guardar Profesor"}
                </button>

                {profesorEditar && (
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

export default ProfesorForm;