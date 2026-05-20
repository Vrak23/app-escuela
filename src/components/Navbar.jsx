// src/components/Navbar.jsx
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-lg py-3"
      style={{
        background: "#0d0f14",
        borderBottom: "1px solid #2a3048",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container">

        {/* Logo */}
        <a
          className="navbar-brand fw-bold fs-3"
          href="#"
          style={{
            color: "#00cfff",
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 800,
            letterSpacing: "3px",
            textShadow: "0 0 18px #00cfff88",
          }}
        >
          SENATI
        </a>

        {/* Botón responsive */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav mx-auto gap-lg-1 text-center">
            {["Inicio", "Cursos", "Especializaciones", "Contactos"].map(
              (item, i) => (
                <li className="nav-item" key={i}>
                  <a
                    className="nav-link fw-semibold px-3 py-2"
                    href="#"
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontSize: "0.9rem",
                      letterSpacing: "0.8px",
                      color: i === 0 ? "#00cfff" : "#8a93a8",
                      transition: "color 0.2s",
                      borderRadius: "8px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#00cfff")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = i === 0 ? "#00cfff" : "#8a93a8")
                    }
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* Botón Login */}
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
              e.target.style.background = "#00cfff";
              e.target.style.color = "#0d0f14";
              e.target.style.boxShadow = "0 0 18px #00cfff55";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#00cfff";
              e.target.style.boxShadow = "none";
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