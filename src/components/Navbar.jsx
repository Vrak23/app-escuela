// src/components/Navbar.jsx

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const location  = useLocation();
  const [dropOpen, setDropOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const mantenimientoActivo = ["/alumnos", "/profesores", "/cursos"].includes(location.pathname);

  const navLinkStyle = (active) => ({
    fontFamily: "'Exo 2', sans-serif",
    fontSize: "0.9rem",
    letterSpacing: "0.8px",
    color: active ? "#00cfff" : "#8a93a8",
    transition: "color 0.2s",
    borderRadius: "8px",
    textDecoration: "none",
    padding: "8px 12px",
    display: "block",
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-lg py-3"
      style={{
        background: "#0d0f14",
        borderBottom: "1px solid #2a3048",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container">

        {/* Logo */}
        <Link to="/" style={{
          color: "#00cfff",
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 800,
          fontSize: "1.6rem",
          letterSpacing: "3px",
          textShadow: "0 0 18px #00cfff88",
          textDecoration: "none",
        }}>
          SENATI
        </Link>

        {/* Toggler mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-lg-1 text-center align-items-lg-center">

            {/* Inicio */}
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link fw-semibold"
                style={navLinkStyle(isActive("/"))}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00cfff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive("/") ? "#00cfff" : "#8a93a8")}
              >
                Inicio
              </Link>
            </li>

            {/* Especializaciones */}
            <li className="nav-item">
              <a href="#" className="nav-link fw-semibold" style={navLinkStyle(false)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00cfff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8a93a8")}
              >
                Especializaciones
              </a>
            </li>

            {/* Contactos */}
            <li className="nav-item">
              <a href="#" className="nav-link fw-semibold" style={navLinkStyle(false)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00cfff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8a93a8")}
              >
                Contactos
              </a>
            </li>

            {/* ── Mantenimiento dropdown ── */}
            <li
              className="nav-item position-relative"
              onMouseEnter={() => setDropOpen(true)}
              onMouseLeave={() => setDropOpen(false)}
            >
              <button
                className="nav-link fw-semibold btn border-0 bg-transparent d-flex align-items-center gap-1"
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "0.9rem",
                  letterSpacing: "0.8px",
                  color: mantenimientoActivo ? "#00cfff" : "#8a93a8",
                  transition: "color 0.2s",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Mantenimiento
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
                  style={{ transition: "transform 0.2s", transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path d="M6 8L1 3h10L6 8z" />
                </svg>
              </button>

              {dropOpen && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#13161e",
                  border: "1px solid #2a3048",
                  borderRadius: "12px",
                  padding: "8px",
                  minWidth: "170px",
                  boxShadow: "0 12px 32px #00000088",
                  zIndex: 2000,
                }}>
                  {[
                    { label: "👤 Alumnos",    path: "/alumnos"    },
                    { label: "🎓 Profesores", path: "/profesores" },
                    { label: "📚 Cursos",     path: "/cursos"     },
                  ].map(({ label, path }) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setDropOpen(false)}
                      style={{
                        display: "block",
                        padding: "9px 16px",
                        borderRadius: "8px",
                        fontFamily: "'Exo 2', sans-serif",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        color: isActive(path) ? "#00cfff" : "#e8ecf4",
                        textDecoration: "none",
                        transition: "background 0.15s, color 0.15s",
                        background: isActive(path) ? "#00cfff11" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#00cfff18";
                        e.currentTarget.style.color = "#00cfff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isActive(path) ? "#00cfff11" : "transparent";
                        e.currentTarget.style.color = isActive(path) ? "#00cfff" : "#e8ecf4";
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

          </ul>

          {/* Login */}
          <button
            className="btn fw-bold px-4 rounded-pill"
            style={{
              background: "transparent",
              border: "1.5px solid #00cfff",
              color: "#00cfff",
              fontFamily: "'Exo 2', sans-serif",
              letterSpacing: "1px",
              fontSize: "0.85rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00cfff";
              e.currentTarget.style.color = "#0d0f14";
              e.currentTarget.style.boxShadow = "0 0 18px #00cfff55";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#00cfff";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Login
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;