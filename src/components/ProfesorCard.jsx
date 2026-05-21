import { useState } from "react";

const ProfesorCard = ({ profesor, imagen, onEditar, onEliminar, eliminando }) => {

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="alumno-card h-100">

        {/* Imagen */}
        <div className="card-img-wrap">
          <img src={imagen} alt={profesor.nombre} />
        </div>

        <div className="card-body d-flex flex-column">

          {/* Badge especialidad */}
          <div className="mb-2">
            <span style={{
              background: "#00cfff22",
              color: "#00cfff",
              border: "1px solid #00cfff44",
              borderRadius: "999px",
              padding: "3px 12px",
              fontSize: "0.75rem",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {profesor.especialidad}
            </span>
          </div>

          {/* Nombre */}
          <h5 className="card-title mb-1">{profesor.nombre}</h5>

          {/* Email */}
          <p className="card-subtitle small mb-1">{profesor.email}</p>

          {/* DNI */}
          <p className="small mb-3" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.78rem",
            color: "#8a93a8",
          }}>
            DNI: {profesor.dni}
          </p>

          {/* Botones */}
          <div className="mt-auto d-flex gap-2">
            <button
              className="btn btn-outline-success btn-sm flex-fill"
              onClick={() => onEditar(profesor)}
            >
              Editar
            </button>
            <button
              className="btn btn-outline-danger btn-sm px-3"
              onClick={() => onEliminar(profesor.id_profesor)}
              disabled={eliminando}
            >
              {eliminando ? "..." : "✕"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfesorCard;
