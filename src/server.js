require("dotenv").config()

const express = require("express")
const http = require("http")
const next = require("next")

const api = require("./api")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: "./src" })
const handle = app.getRequestHandler()

app.prepare().then(() => {

  const server = express()
  server.use(api)

  // Handle all other routes with Next.js
  server.get("*", handle)

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}/`);
  })
})
