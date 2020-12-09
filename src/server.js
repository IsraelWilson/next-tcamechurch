// Required to read from the environment file
require("dotenv").config()

// Required for Next.js running on an Express server
const express = require("express")
const http = require("http")
const next = require("next")

// Required for Express authorization with Auth0
const session = require("express-session")
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const uid = require('uid-safe');
const authRoutes = require("./auth-routes");

// Required to import the application API
const api = require("./api")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: "./src" })
const handle = app.getRequestHandler()

app.prepare().then(() => {

  // Create Express server
  const server = express()

  // Add session management to Express
  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000 // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true
  };
  server.use(session(sessionConfig));

  // Configuring Auth0 Strategy
  const auth0Strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
  );

  // Configuring Passport
  passport.use(auth0Strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  // Add Passport and authentication routes
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(authRoutes);

  // Add API to Express
  server.use(api)

  // Restrict access to routes here
  const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
  };

  //server.use("/admin", restrictAccess);

  // Handle all other routes with Next.js
  server.get("*", handle)

  // Start listening for http request
  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}/`);
  })
})
