// este objecto pool es la conecion a la base de datos
const pool = require('../pg')

const getAllTasks = async (req, res, next) => {
    try {
        const allTask = await pool.query("SELECT * FROM empleado")
        res.send(allTask.rows)
    } catch (error) {
       next(error)
    }
}

const getTask = async (req, res, next)=> {
    try {
        const {id} = req.params
        // estamos validando que el id de la tabla sea igual al id que me estan pasando
        const result =  await pool.query('SELECT * FROM empleado WHERE id = $1', [id])
        //  ESTA VALIDACION es por si no encuentra un id 
        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "TAREA NO ENCONTRADA"
            })
         
        res.json(result.rows[0])
    
    } catch (error) {
        next(error)
    }
}


const createTask = async (req, res, next) => {
    const { 
        nombre,
        apellido1,
        apellido2,
        nombre2,
        cedula,
        email,
        pais,
        hora 
    } = req.body;

        if (nombre.length > 19) {
            return res.json({
                ok: false,
                msg:"El nombre no debe ser mayor a 20 letras"
            })
        }

        if (apellido1.length > 19) {
            return res.json({
                ok: false,
                msg:"El nombre no debe ser mayor a 20 letras"
            })
        }

        if (apellido2.length > 19) {
            return res.json({
                ok: false,
                msg:"El nombre no debe ser mayor a 20 letras"
            })
        }

        if (nombre2.length > 49) {
            return res.json({
                ok: false,
                msg:"El nombre no debe ser mayor a 49 letras"
            })
        }

        if (cedula.length === 0 ) {
            return res.json({
                ok: false,
                msg:"El campo cedula no puede ir vacio"
            })
        }

    try {
        // vamos a crear una tarea
        // el valor de title sera reemplazado en $1 y el de description en $2
        const result = await pool.query("INSERT INTO empleado (nombre,apellido1,apellido2,nombre2,cedula,email,pais,hora) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [nombre, apellido1, apellido2, nombre2, cedula, email, pais,hora])
        // esto ya se deberia guardar en la base de datos
        res.json(result.rows[0]);
    } catch (error) {
        // si enviamos un description con el mismo texto lanzara el error
        // al pasarsel el error ya esta sabe que de deberia a la funsion en el index que tiene 4 parametros
        console.error(error.message);
        next(error);
    }
}

const deleteTask = async (req, res, next)=> {
    try {
        const { id} = req.params
        // console.log(id)
        const result = await pool.query("DELETE FROM empleado WHERE id = $1", [id])

        if (result.rowCount === 0) return res.status(404).json({
            message: "TAREA NO ENCONTRADA PARA ELIMINAR"
        })
        // solo mandara un mensaje de que todo fue ok con 204
        return res.sendStatus(204);

    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next)=> {
    try {   
        // necesitamos tambien el body para decirle que vamos a actualizar, vamos a desestructurarlo
        const { id } = req.params;
        const { nombre,apellido1,apellido2,nombre2,cedula,email,pais,hora } = req.body

        // actualizado
        const result = await pool.query("UPDATE empleado SET nombre = $1,apellido1=$2,apellido2 = $3,nombre2 = $4,cedula = $5,email = $6,pais = $7,hora = $8 WHERE id = $9 RETURNING *", [nombre,apellido1,apellido2,nombre2,cedula,email,pais,hora,id]);

        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "TAREA NO ENCONTRADA PARA ACTUALIZAR"
            });

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}

// heroku git:remote -a cliente-app-yess
// git push heroku master

