const Pool = require('pg').Pool


const pool = new Pool({
    user: "postgres",
    password: "oturig02",
    port: 5432,
    host: "localhost",
    database: "perntodo"
})

module.exports = pool