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
router.get('/poll/active', ensureAuthenticated, (req, res) => {
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
  const queryString = "SELECT * FROM candidate WHERE poll_id = ?";

  const poll = req.query.poll_id

  con.query(queryString, [poll], (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: `There was an error getting candidates for poll_id ${poll}:  + err` })
    }
    res.json(rows)
  })
})

// Helper function for update
function getUpdatePromise(candidate) {
  const candidateQueryString = "UPDATE candidate SET num_votes = num_votes + 1 WHERE candidate_id = ?";
  const candidateId = candidate.candidate_id

  return new Promise((resolve, reject) => {
    con.query(candidateQueryString, [candidateId], (err, rows, fields) => {
      if (err) {
        res.status(500)
        console.log("There was an error updating candidates: " + err)
        return res.send({ error: "There was an error updating candidates: " + err })
      }
    })
  })
}

// Helper function for update
function getHistoryPromise(pollId, authId) {
  const historyQueryString = "INSERT INTO history (poll_id, auth_id, created_at, updated_at) VALUES (?, ?, CURDATE(), CURDATE())";

  return new Promise((resolve, reject) => {
    con.query(historyQueryString, [pollId, authId], (err, rows, fields) => {
      if (err) {
        res.status(500)
        console.log("There was an error adding history: " + err)
        return res.send({ error: "There was an error adding history: " + err })
      }
    })
  })
}

// Update votes
router.put('/update', ensureAuthenticated, (req, res) => {

  const data = req.body;

  const selection = data.selection;
  const pollId = selection[0].poll_id
  const authId = data.auth_id
  const promiseArr = []

  // In order to do a bulk update, we build an array of promises
  // and execute them using Promise.all
  // Need to add logic to handle error cases
  // Should also be able to return the mysql query result using
  // the resolve method in a promise
  for(let i = 0; i < selection.length; i++) {
    promiseArr.push(getUpdatePromise(selection[i]))
  }

  promiseArr.push(getHistoryPromise(pollId, authId))
  Promise.all(promiseArr)
  res.json({success: true})
})

// Get all polls
router.get('/polls', ensureAuthenticated, (req, res) => {
  const insertQueryString = "SELECT * FROM poll";

  con.query(insertQueryString, (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error retreiving polls: " + err })
    }
    res.json(rows)
  })
})

// Create new poll
router.post('/poll', ensureAuthenticated, (req, res) => {
  const insertQueryString = "INSERT INTO poll (is_active, created_at, updated_at) VALUES (0, CURDATE(), CURDATE())";
  const updateQueryString = "UPDATE poll SET poll_name = CONCAT('Poll ', LAST_INSERT_ID()) WHERE poll_id = LAST_INSERT_ID()";
  const selectQueryString = "SELECT * FROM poll WHERE poll_id = LAST_INSERT_ID()";

  con.query(insertQueryString, (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error creating new poll: " + err })
    }
    con.query(updateQueryString, (err, rows, fields) => {
      if (err) {
        res.status(500)
        return res.send({ error: "There was an error updating poll: " + err })
      }
      con.query(selectQueryString, (err, rows, fields) => {
        if (err) {
          res.status(500)
          return res.send({ error: "There was an error retreiving poll: " + err })
        }
        res.json(rows)
      })
    })
  })
})

// Delete poll
router.delete('/poll', ensureAuthenticated, (req, res) => {
  const queryString = "DELETE FROM poll WHERE poll_id = ?";
  const pollId = req.body.poll_id;

  con.query(queryString, [pollId], (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error deleting poll: " + err })
    }
    res.json(rows)
  })
})

// Change the active poll
router.put('/poll/toggle-active', ensureAuthenticated, (req, res) => {
  const selectQueryString = "SELECT is_active from poll WHERE poll_id = ?";
  const activateQueryString = "UPDATE poll SET is_active = 1 WHERE poll_id = ?";
  const deactivateQueryString = "UPDATE poll SET is_active = 0 WHERE poll_id = ?";
  const deactivateOthersQueryString = "UPDATE poll SET is_active = 0 WHERE poll_id != ?";

  const pollId = req.body.poll_id

  // Get poll active status
  con.query(selectQueryString, [pollId], (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error finding poll: " + err })
    }

    // Make sure poll was found
    if(rows.length > 0) {
      let isActive = rows[0].is_active

      // Activate poll and deactivate any other active poll
      if(!isActive) {
        con.query(activateQueryString, [pollId], (err, result, fields) => {
          if (err) {
            res.status(500)
            return res.send({ error: "There was an error activating deactivated poll: " + err })
          }
          // Deactivate all the other polls
          con.query(deactivateOthersQueryString, [pollId], (err, result, fields) => {
            if (err) {
              res.status(500)
              return res.send({ error: "There was an error deactivating the other polls: " + err })
            }
            return res.json(result)
          })
        })
      }
      // Deactivate the active poll
      else {
        con.query(deactivateQueryString, [pollId], (err, result, fields) => {
          if (err) {
            res.status(500)
            return res.send({ error: "There was an error deactivating poll: " + err })
          }
          return res.json(result)
        })
      }
    }
    // Should probably add logic to handle when poll is not found
  })
})

// Delete candidate
router.delete('/candidate', ensureAuthenticated, (req, res) => {
  const queryString = "DELETE FROM candidate WHERE candidate_id = ?";
  const candidateId = req.body.candidate_id;

  con.query(queryString, [candidateId], (err, rows, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error deleting candidate: " + err })
    }
    res.json(rows)
  })
})

// Add candidate
router.post('/candidate', ensureAuthenticated, (req, res) => {
  const insertQueryString = "INSERT INTO candidate (candidate_name, num_votes, poll_id, created_at, updated_at) VALUeS (?, 0, ?, CURDATE(), CURDATE())";
  const selectQueryString = "SELECT * FROM candidate WHERE candidate_id = LAST_INSERT_ID()";
  const name = req.body.candidate_name;
  const poll = req.body.poll_id;


  con.query(insertQueryString, [name, poll], (err, result, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error adding candidate: " + err })
    }
    con.query(selectQueryString, [name, poll], (err, result, fields) => {
      if (err) {
        res.status(500)
        return res.send({ error: "There was an error getting candidate: " + err })
      }
      res.json(result)
    })
  })
})

// Remove all candidates
router.delete('/candidates', ensureAuthenticated, (req, res) => {
  const queryString = "TRUNCATE TABLE candidate";

  con.query(queryString, (err, result, fields) => {
    if (err) {
      res.status(500)
      return res.send({ error: "There was an error deleting candidates: " + err })
    }
    res.json(result)
  })
})

// Check if user is allowed to vote
router.get('/history/:id', ensureAuthenticated, (req, res) => {
  const queryString = "SELECT * FROM history WHERE auth_id = ?";

  const authId = req.params.id

  con.query(queryString, [authId], (err, result, fields) => {
    if (err) {
      res.status(500)
      console.log("There was an error retreiving history: " + err)
      return res.send({ error: "There was an error retreiving history: " + err })
    }

    res.json(result)
  })
})

module.exports = router;
