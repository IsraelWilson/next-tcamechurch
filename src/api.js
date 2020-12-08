require("dotenv").config()

const bodyParser = require("body-parser")
const express = require("express")
const mysql = require('mysql')

const router = express.Router()
router.use(bodyParser.json())

const con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME
})

// Do they have access
router.get('/access/:id', function(req, res) {
  const queryString = "SELECT * from user WHERE user_id = ?";
  const id = req.params.id;

  con.query(queryString, [id], (err, rows, fields) => {
    if (err) {
      res.send("There was an internal router error: " + err);
    }

    res.json(rows);
  })
})

// All users with access
router.get('/access', function(req, res) {
  const queryString = "SELECT * from user WHERE voted = 0";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      res.send("There was an internal router error: " + err);
    }

    res.json(rows);
  })
})

// Toggle voting access
router.put('/toggleAccess', (req, res) => {
  const queryString = "UPDATE user SET voted = 1 WHERE user_id = ?";
  const id = req.body.id;

  con.query(queryString, [id], (err, rows, fields) => {
    if (err) {
      res.send("There was an internal router error: " + err);
    }

    res.json(rows.affectedRows);
  })
})

// Is voting open
router.get('/open', (req, res) => {
  const queryString = "SELECT * from open";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
    res.json(rows)
  })
})

// Toggle open state
router.put('/toggleOpen', (req, res) => {
  const queryString = "UPDATE open SET open = 0 WHERE open = 1";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
    res.json(rows)
  })
})

// Get all votes
router.get('/tally', (req, res) => {
  const queryString = "SELECT * from trustee ORDER BY votes DESC";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
    res.json(rows)
  })
})

// Update votes
router.put('/update', (req, res) => {
  const queryString = "UPDATE trustee SET votes = votes + 1 WHERE name = ?";
  const name = req.body.name;


  con.query(queryString, [name], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
    res.json(rows.affectedRows)
  })
})

// Delete candidate
router.delete('/delete', (req, res) => {
  const queryString = "DELETE FROM trustee WHERE name = ?";
  const name = req.body.name;

  con.query(queryString, [name], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
    res.json(rows.affectedRows)
  })
})

// Add candidate
router.post('/add', (req, res) => {
  const queryString = "SELECT * FROM trustee WHERE name = ?";
  const queryString2 = "INSERT INTO trustee(name) VALUE(?)";
  const name = req.body.name;
  let found = false;


  con.query(queryString, [name], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
    if(rows.length > 0) {
      found = true;
    }
  })

  if(!found) {
    con.query(queryString2, [name], (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send("There was an internal router error: " + err);
      }
      res.json(rows.affectedRows)
    })
  }
})

// Remove all candidates
router.delete('/dropCandidates', (req, res) => {
  const queryString = "TRUNCATE TABLE trustee";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
  })
})

// Reset all users
router.delete('/resetUsers', (req, res) => {
  const queryString = "UPDATE user SET voted = 0";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
  })
})

// Remove all candidates and reset users
router.delete('/nuke', (req, res) => {
  const queryString = "UPDATE user SET voted = 0";
  const queryString2 = "TRUNCATE TABLE trustee";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
  })

  con.query(queryString2, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
    res.json(rows.affectedRows)
  })
})

module.exports = router;
