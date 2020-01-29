const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const config = require('./next.config.js')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())

  // Do they have access
  server.get('/access/:id', function(req, res) {
    const queryString = "SELECT * from user WHERE user_id = ?";
    const id = req.params.id;

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, [id], (err, rows, fields) => {
      if (err) {
        res.send("There was an internal server error: " + err);
      }

      res.json(rows);
    })
  })

// All users with access
server.get('/access', function(req, res) {
  const queryString = "SELECT * from user WHERE voted = 0";

  const con = mysql.createConnection({
    host: config.env.dbHost,
    user: config.env.dbUser,
    password: config.env.dbPass,
    database: config.env.dbName
  })

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      res.send("There was an internal server error: " + err);
    }

    res.json(rows);
  })
})

  // Toggle voting access
  server.put('/toggleAccess', (req, res) => {
    const queryString = "UPDATE user SET voted = 1 WHERE user_id = ?";
    const id = req.body.id;

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, [id], (err, rows, fields) => {
      if (err) {
        res.send("There was an internal server error: " + err);
      }

      res.json(rows.affectedRows);
    })
  })

  // Is voting open
  server.get('/open', (req, res) => {
    const queryString = "SELECT * from open";

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
      res.json(rows)
    })
  })

  // Toggle open state
  server.put('/toggleOpen', (req, res) => {
    const queryString = "UPDATE open SET open = 0 WHERE open = 1";

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
      res.json(rows)
    })
  })

  // Get all votes
  server.get('/tally', (req, res) => {
    const queryString = "SELECT * from trustee ORDER BY votes DESC";

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
      res.json(rows)
    })
  })

  // Update votes
  server.put('/update', (req, res) => {
    const queryString = "UPDATE trustee SET votes = votes + 1 WHERE name = ?";
    const name = req.body.name;

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })


    con.query(queryString, [name], (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
      res.json(rows.affectedRows)
    })
  })

  // Delete candidate
  server.delete('/delete', (req, res) => {
    const queryString = "DELETE FROM trustee WHERE name = ?";
    const name = req.body.name;

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, [name], (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
      res.json(rows.affectedRows)
    })
  })

  // Add candidate
  server.post('/add', (req, res) => {
    const queryString = "SELECT * FROM trustee WHERE name = ?";
    const queryString2 = "INSERT INTO trustee(name) VALUE(?)";
    const name = req.body.name;
    let found = false;

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })


    con.query(queryString, [name], (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
      if(rows.length > 0) {
        found = true;
      }
    })

    if(!found) {
      con.query(queryString2, [name], (err, rows, fields) => {
        if (err) {
          console.log(err);
          res.send("There was an internal server error: " + err);
        }
        res.json(rows.affectedRows)
      })
    }
  })

  // Remove all candidates
  server.delete('/dropCandidates', (req, res) => {
    const queryString = "TRUNCATE TABLE trustee";

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
    })
  })

  // Reset all users
  server.delete('/resetUsers', (req, res) => {
    const queryString = "UPDATE user SET voted = 0";

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
    })
  })

  // Remove all candidates and reset users
  server.delete('/nuke', (req, res) => {
    const queryString = "UPDATE user SET voted = 0";
    const queryString2 = "TRUNCATE TABLE trustee";

    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
    })

    con.query(queryString2, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal server error: " + err);
      }
      res.json(rows.affectedRows)
    })
  })

  // Handle Routes Here
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(8081, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:8081')
  })

})
