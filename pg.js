const { Pool } = require('pg');

const pool = new Pool({
    connectionString:process.env.DATABASE_POST,
    ssl:{
        rejectUnauthorized:false
    }
})

module.exports = {pool}