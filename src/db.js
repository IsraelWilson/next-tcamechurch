require("dotenv").config()

const mysql = require('mysql')

const con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME
})

con.connect(function(err) {
    if (err) throw err;
})

module.exports = con;
