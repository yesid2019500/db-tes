const express =  require('express')
const app = express();

// heroku git:remote -a test-db-yessi 
// git push heroku master
// heroku logs --tail

app.get('/', (req,res)=> {
    res.send('hellow')
})

// SERVER
app.listen(process.env.PORT || 3002)
console.log('server on port', process.env.PORT || 3002);