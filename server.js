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

  // Handle Routes Here
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // Do they have access
  server.get('/access/:id', (req, res) => {
    const queryString = "SELECT * from vote WHERE name = ?";
    const id = req.param.id;
    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, [id], (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.json(rows)
    })
  })

  // Toggle voting access
  server.put('/toggleAccess', (req, res) => {
    return handle(req, res)
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
        res.sendStatus(500);
      }
      res.json(rows)
    })
  })

  // Toggle open state
  server.put('/toggleOpen', (req, res) => {
    return handle(req, res)
  })

  // Get all votes
  server.get('/tally', (req, res) => {
    const queryString = "SELECT * from vote ORDER BY vote_num DESC";
    const con = mysql.createConnection({
      host: config.env.dbHost,
      user: config.env.dbUser,
      password: config.env.dbPass,
      database: config.env.dbName
    })

    con.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.json(rows)
    })
  })

  // Update votes
  server.put('/update', (req, res) => {
    return handle(req, res)
  })

  // Delete candidate
  server.delete('/delete/:name', (req, res) => {
    return handle(req, res)
  })

  // Add candidate
  server.post('/add/:name', (req, res) => {
    return handle(req, res)
  })

  // Remove all candidates
  server.delete('/nuke', (req, res) => {
    return handle(req, res)
  })

  server.listen(8081, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:8081')
  })

})
