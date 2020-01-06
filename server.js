const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const config = require('./next.config.js')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())

  server.post('/send', function(req, res) {
    console.log('Calling post from server')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'oauth2',
        user: config.env.email,
        clientId: config.env.client,
        clientSecret: config.env.secret,
        refreshToken: config.env.token
      }
    })

    const mailOptions = {
      from: req.body.email,
      to: config.env.email,
      subject: req.body.name,
      text: req.body.message,
      replyTo: req.body.email
    }

    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('Nodemailer post error: ', err);
      }
      else {
        console.log('Nodemailer response: ', res)
      }
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(8080, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:8080')
  })

})
