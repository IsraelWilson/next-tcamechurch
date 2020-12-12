require("dotenv").config()

const bodyParser = require("body-parser")
const express = require("express")
const mysql = require('mysql')
const con = require('./db')

const router = express.Router()
router.use(bodyParser.json())

// Pass this method to endpoints that require an authenticated user
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send(401);
}

// Get list of available admins
/* This is here so that I can render the admin tab and candidate buttons
at the same time, preventing additional renders. Possibly avoidable if
there is a way to create admins with Auth0
*/
router.get('/admins-candidates', ensureAuthenticated, (req, res) => {
  const adminQueryString = "SELECT * from user WHERE is_admin IS TRUE";
  const candidateQueryString = "SELECT candidate.candidate_id, candidate.candidate_name, candidate.poll_id FROM candidate INNER JOIN poll ON candidate.poll_id = poll.poll_id WHERE poll.is_active IS TRUE";

  let adminRows = []
  let candidateRows = []

  con.query(adminQueryString, (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error retreiving admin users from the database: " + err })
    }
    adminRows = rows

    con.query(candidateQueryString, (err, rows, fields) => {
      if (err) {
        res.status(500)
        return res.send({ error: "There was an error retreiving candidates from the database: " + err })
      }
      candidateRows = rows

      res.json({
        admins: adminRows,
        candidates: candidateRows
      })      
    })
  })
})

// Get the active poll
router.get('/poll', ensureAuthenticated, (req, res) => {
  const queryString = "SELECT * from poll WHERE is_active IS TRUE";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error querying the database: " + err })
    }
    res.json(rows)
  })
})

// Get all the available candidates to vote for
router.get('/candidates', ensureAuthenticated, (req, res) => {
  const queryString = "SELECT candidate.candidate_id, candidate.candidate_name, candidate.poll_id FROM candidate INNER JOIN poll ON candidate.poll_id = poll.poll_id WHERE poll.is_active IS TRUE";

  con.query(queryString, (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error querying the database: " + err })
    }
    res.json(rows)
  })
})

// Update votes
router.put('/update', ensureAuthenticated, (req, res) => {
  const candidateQueryString = "UPDATE candidate SET num_votes = num_votes + 1 WHERE candidate_id = ?";
  const historyQueryString = "INSERT INTO history (poll_id, auth_id, created_at, updated_at) VALUES (?, ?, CURDATE(), CURDATE())";

  const data = req.body;

  const selection = data.selection;
  const pollId = selection[0].poll_id
  const authId = data.auth_id
  const candidateIds = []

  let candidateResult = 0
  let historyResult = 0

  for(let i = 0; i < data.selection.length; i++) {
    candidateIds.push(selection[i].candidate_id)
  }

  con.query(candidateQueryString, [candidateIds], (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error updating candidates: " + err })
    }
    candidateResult = rows.affectedRows
  })

  con.query(historyQueryString, [pollId, authId], (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error adding history: " + err })
    }
    historyResult = rows.affectedRows
  })

  res.json({
    candidateRowsAffected: candidateResult,
    historyRowsAffected: historyResult
   })
})

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
