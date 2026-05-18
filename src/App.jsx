import AlumnoCard from "./components/AlumnoCard"
import Navbar from "./components/Navbar"

function app() {
  return(
    <>
      <Navbar/>
      <div className="container">
        <h1 className="mb-4">Listado de alumnos</h1>
        <div className="row">

          <AlumnoCard
          nombre = "Rodrigo Ormeño"
          carrera = "Informatica y desarrollo de aplicaciones web"
          estado = "Matriculado"
          />

          <AlumnoCard
          nombre = "Tifa Ramos"
          carrera = "Enfermeria"
          estado = "Matriculado"
          />

          <AlumnoCard
          nombre="Carlos Mendoza"
          carrera="Diseño Gráfico"
          estado="Matriculado"
          />
          
          <AlumnoCard
          nombre="Lucía Fernández"
          carrera="Administración Industrial"
          estado="Matriculado"
          />
          
          <AlumnoCard
          nombre="Kevin Salazar"
          carrera="Mecatrónica"
          estado="Matriculado"
          />
          
          <AlumnoCard
          nombre="Andrea Torres"
          carrera="Contabilidad"
          estado="Matriculado"
          />
          
          <AlumnoCard
          nombre="Diego Herrera"
          carrera="Electricidad Industrial"
          estado="Inactivo"
          />

          <AlumnoCard
            nombre="Valeria Castro"
            carrera="Arquitectura de Plataformas y Servicios TI"
            estado="Inactivo"
          />

        </div>
      </div>
    </>
  )
}
export default app