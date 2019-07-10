const path = require('path')
const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 8082
const app = express()
const db = require('./db')

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json({limit: '50mb', extended: true}))
  app.use(express.urlencoded({limit: '50mb', extended: true}))

  // auth and api routes
  app.use('/api', require('./api'))
  app.use('/auth', require('./auth'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )
}

const syncDb = () => db.sync()

async function bootApp() {
  await startListening()
  await createApp()
  await syncDb()
}

bootApp()
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
