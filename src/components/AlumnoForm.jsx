// src/components/AlumnoForm.jsx

import { useState } from "react";

const AlumnoForm = ({ recargarAlumnos }) => {

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    fecha_nacimiento: "",
    email: "",
    estado_matricula: "matriculado",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch("http://127.0.0.1:8000/api/alumnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formulario),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        alert("Alumno guardado correctamente");
        setFormulario({
          nombre: "",
          apellidos: "",
          dni: "",
          fecha_nacimiento: "",
          email: "",
          estado_matricula: "matriculado",
        });
        recargarAlumnos();
      } else {
        console.log(datos.errors);
        alert("Error al guardar");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con Laravel");
    }
  };

  return (
    <div
      className="form-card-wrapper mb-5 mx-auto"
      style={{ maxWidth: "620px" }}
    >
      <div className="card shadow-lg">

        <div className="card-header">
          <h5 className="mb-0 text-center">Registrar Alumno</h5>
        </div>

        <div className="card-body p-4">
          <form onSubmit={manejarEnvio}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  placeholder="Ej. Juan Carlos"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellidos"
                  value={formulario.apellidos}
                  onChange={manejarCambio}
                  placeholder="Ej. García López"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">DNI</label>
                <input
                  type="text"
                  className="form-control"
                  name="dni"
                  value={formulario.dni}
                  onChange={manejarCambio}
                  placeholder="12345678"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Fecha de Nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_nacimiento"
                  value={formulario.fecha_nacimiento}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formulario.email}
                  onChange={manejarCambio}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  name="estado_matricula"
                  value={formulario.estado_matricula}
                  onChange={manejarCambio}
                >
                  <option value="matriculado">Matriculado</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>

              <div className="col-12 text-center mt-2">
                <button
                  type="submit"
                  className="btn btn-info fw-bold px-5"
                >
                  Guardar Alumno
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AlumnoForm;