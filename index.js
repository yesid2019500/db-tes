const express =  require('express')
const app = express();

// heroku git:remote -a test-db-yessi 
// git push heroku master
// heroku logs --tail

console.log('arranca')
// SERVER
app.listen(process.env.PORT || 3001)
console.log('server on port', process.env.PORT || 3001);