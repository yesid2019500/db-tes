const express =  require('express')
const app = express();



// SERVER
app.listen(process.env.PORT || 3001)
console.log('server on port', process.env.PORT || 3001);