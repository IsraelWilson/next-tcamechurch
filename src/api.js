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

con.connect(function(err) {
    if (err) throw err;
})

// Pass this method to endpoints that require an authenticated user
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send(401);
}

// Toggle voting access
router.put('/toggleAccess', ensureAuthenticated, (req, res) => {
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
router.get('/open', ensureAuthenticated, (req, res) => {
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
router.put('/toggleOpen', ensureAuthenticated, (req, res) => {
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
router.get('/tally', ensureAuthenticated, (req, res) => {
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
router.put('/update', ensureAuthenticated, (req, res) => {
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
router.delete('/delete', ensureAuthenticated, (req, res) => {
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
router.post('/add', ensureAuthenticated, (req, res) => {
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
router.delete('/dropCandidates', ensureAuthenticated, (req, res) => {
  const queryString = "TRUNCATE TABLE trustee";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
  })
})

// Reset all users
router.delete('/resetUsers', ensureAuthenticated, (req, res) => {
  const queryString = "UPDATE user SET voted = 0";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("There was an internal router error: " + err);
    }
  })
})

// Remove all candidates and reset users
router.delete('/nuke', ensureAuthenticated, (req, res) => {
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
