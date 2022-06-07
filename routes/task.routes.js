const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos')
const { check } =  require('express-validator')
// vamos a traernos la conecxion a la base de datos
const {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
    
    } = require('../controllers/task.controller') 

// aqui estamos recibiendo las funsiones de consulta que estan manejando la logica en el js controller
const router = Router();

router.get('/empleado',getAllTasks);

// esta ruta es cuando queremos solicitar un solo dato
// con el id obtendremos la tarea por ejemplo el 11 es el id que estaria recibiendo
// http://localhost:4000/task/11 
router.get('/empleado/:id',getTask );


router.post('/empleado', [
    check('nombre').isLength({min:2}).isAlpha().withMessage('El nombre no debe contener caracteres  '),

    check('nombre2').isLength({min:2}).isAlpha().withMessage('El nombre no debe contener caracteres  '),

    check('apellido1').isLength({min:2}).isAlpha().withMessage('El apellido no debe contener caracteres  '),

    check('apellido2').isLength({min:2}).isAlpha().withMessage('El apellido no debe contener caracteres  '),

    check('cedula').isNumeric().not().withMessage('El numero de identidad no puede estar vacio'),

    check('email', 'El email es obligatorio').isEmail(),

    validarCampos
],


createTask);



router.delete('/empleado/:id', deleteTask);


router.put('/empleado/:id', updateTask);


module.exports = router;