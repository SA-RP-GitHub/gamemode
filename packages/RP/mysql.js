const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1', // host of server
    user: 'root', // MySQL user
    password: '', // MySQL password
    database: "sarp-ragemp"
});

module.exports = con;