// src/components/AlumnoCard.jsx

import { useState } from "react";

const AlumnoCard = ({ nombre, carrera, estadoInicial, imagen }) => {

  const [estado, setEstado] = useState(estadoInicial);

  const isActive =
    estado === "Matriculado" || estado === "matriculado";

  const cambiarEstado = () => {
    setEstado(isActive ? "Inactivo" : "Matriculado");
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="alumno-card h-100">

        {/* Imagen */}
        <div className="card-img-wrap">
          <img src={imagen} alt={nombre} />
        </div>

        <div className="card-body d-flex flex-column">

          {/* Badge estado */}
          <div className="mb-2">
            <span className={`badge ${isActive ? "bg-info" : "bg-secondary"}`}>
              {isActive ? "● Matriculado" : "○ Inactivo"}
            </span>
          </div>

          {/* Nombre */}
          <h5 className="card-title mb-1">{nombre}</h5>

          {/* Email */}
          <p className="card-subtitle small mb-3">{carrera}</p>

          {/* Botones */}
          <div className="mt-auto d-flex gap-2">
            <button
              className="btn btn-outline-success btn-sm flex-fill"
              onClick={cambiarEstado}
            >
              Estado
            </button>
            <button className="btn btn-success btn-sm flex-fill">
              Editar
            </button>
            <button className="btn btn-outline-danger btn-sm px-3">
              ✕
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AlumnoCard;