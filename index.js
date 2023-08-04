import pg from 'pg';  
const { Pool } = pg;

// 1. Realizar la conexión con Base de Datos
const pool = new Pool({
    host:"localhost", 
    user:"postgres", 
    password:"123momiaes",
    database:"postgres",
    port: 5432,
    max: 20, // máximo de 20 clientes
    idleTimeoutMillis: 5000, // 5 segundos de inactividad
    connectionTimeoutMillis: 2000, // 2 segundos de espera
});

const alumno = 
   {nombre:"david",
    rut:"1888888",
    edad : 27}

async function agregarEstudiante(estudiante){
    try {
        const query = {
          text: 'INSERT INTO estudiantes (nombre, rut, edad) VALUES ($1, $2, $3)',
          values: [estudiante.nombre, estudiante.rut, estudiante.edad],
          name:"agregarEstudiante"
        };
        const client = await pool.connect();
        await client.query(query);
        client.release();
        console.log('Estudiante agregado correctamente.');
      } catch (error) {
        console.error('Error al agregar el estudiante:', error);
      }
}

agregarEstudiante(alumno)


async function consultarEstudiantesArray(){
    try {
        const query = {
          text: 'SELECT * FROM estudiantes',
          rowMode:"array",
          name:"consultaEstudiante"
        };
        const client = await pool.connect();
        let resultado = await client.query(query);
        console.log("Estudiantes Array",resultado.rows);
        client.release();
      } catch (error) {
        console.error('Error al leer los estudiantes:', error);
      }
}

consultarEstudiantesArray()

async function consultarEstudiantes(){
    try {
        const query = {
          text: 'SELECT * FROM estudiantes',
          name:"consultaEstudiante",
        };
        const client = await pool.connect();
        let resultado = await client.query(query);
        console.log(resultado.rows);
        client.release();
      } catch (error) {
        console.error('Error al leer los estudiantes:', error);
      }
}

consultarEstudiantes()

async function consultarEstudiantesRut(rut){
    try {
        const query = {
            text: 'SELECT * FROM estudiantes WHERE rut = $1',
            values: [rut],
            name:"consultaEstudianteRut"
          }
        const client = await pool.connect();
        let resultado = await client.query(query);
        console.log(resultado.rows);
        client.release();
      } catch (error) {
        console.error('Alumno no encontrado', error);
      }
}

consultarEstudiantesRut(19370655)

async function actualizarEdadEstudiante(edad, id){
    let consulta ={
        text:"update estudiantes set edad = $1 where id = $2  RETURNING *",
        values:[edad,id],
        name:"actualizarEdadEstudiante"
    }
    const client = await pool.connect();
    let resultado = await client.query(consulta);
    console.log(resultado.rows);

    client.release()
}

actualizarEdadEstudiante(50,3)


async function eliminarEstudiante(id){
    let consulta ={
        text:"DELETE FROM estudiantes WHERE id = $1",
        values:[id],
        name:"eliminarEstudiante"
    }
    const client = await pool.connect();
    let resultado = await client.query(consulta);
    console.log(resultado.rows);

    client.release()
}

eliminarEstudiante(2) 

