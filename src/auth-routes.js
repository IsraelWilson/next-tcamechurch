require("dotenv").config()

const express = require("express");
const passport = require("passport");
const con = require('./db');

const router = express.Router();

router.get("/login", passport.authenticate("auth0", {
  scope: "openid email profile"
}), (req, res) => res.redirect("/"));

router.get("/callback", (req, res, next) => {
  passport.authenticate("auth0",  (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, (err) => {
      if (err) return next(err);

      // Add the user to local database
      // Shoud probably move this to api.js as its own route. If the user is logged in, we can run this query just fine
      const queryString = "INSERT IGNORE INTO user (auth_id, is_admin, created_at, updated_at) VALUES (?, 0, CURDATE(), CURDATE())";
      con.query(queryString, [user.user_id], (err, rows, fields) => {
        if (err) {
          console.log("There was an error while attempting to add user to database in auth-routes: " + err)
          //return res.send({ error: "There was an error adding user to the database: " + err })
        }
      })

      res.redirect("/");
    });
  })(req, res, next);
});

if(process.env.NODE_ENV === 'production') {
  router.get("/logout", (req, res) => {
    req.logout();

    const {AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL} = process.env;
    res.redirect(`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`);
  });
}
else {
  router.get("/logout", (req, res) => {
    req.logout();

    const {DEV_AUTH0_DOMAIN, DEV_AUTH0_CLIENT_ID, DEV_BASE_URL} = process.env;
    res.redirect(`https://${DEV_AUTH0_DOMAIN}/logout?client_id=${DEV_AUTH0_CLIENT_ID}&returnTo=${DEV_BASE_URL}`);
  });
}

module.exports = router;
