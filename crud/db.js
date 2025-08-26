const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost", 
    user: "root",
    password: "ranjit1234", 
    database: "crud",      
    connectionLimit: 10
});



module.exports = pool