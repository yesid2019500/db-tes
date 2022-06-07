const express =  require('express')
const app = express();
const { config } = require('dotenv')
config()
const {pool} = require('./pg')

// heroku git:remote -a test-db-yessi 
// git push heroku master
// heroku logs --tail

app.get('/', (req,res) => {
    res.send('hellow')
})

app.get('/pi', async (req,res) => {
   const resultado = await pool.query('SELECT NOW()')
   res.send({
       message:resultado
   })
})




const taskRouter = require('./routes/task.routes');
// este modulo es para que nuestro servidor entiendo los archivos json, asi ya el servidor entendera las peticiones post que vengan
app.use(express.json());

// ROUTES
app.use(taskRouter)



app.use((error, req, res, next)=> {
    return res.json({
        message: error.message
    })
 })

// SERVER
app.listen(process.env.PORT || 3002)
console.log('server on port', process.env.PORT || 3002);