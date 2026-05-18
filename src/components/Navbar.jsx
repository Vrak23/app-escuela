// src/components/Navbar.jsx

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg py-3">
      <div className="container">

        {/* Logo */}
        <a className="navbar-brand fw-bold fs-3 text-info" href="#">
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

          {/* Links */}
          <ul className="navbar-nav mx-auto gap-lg-3 text-center">

            <li className="nav-item">
              <a className="nav-link active fw-semibold" href="#">
                Inicio
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#">
                Cursos
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#">
                Especializaciones
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#">
                Contactos
              </a>
            </li>

          </ul>

          {/* Botón Login */}
          <button className="btn btn-info fw-bold px-4 rounded-pill">
            Login
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;