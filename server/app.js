require('module-alias/register')
const url = require('url')
const path = require('path')
if (process.env.LOAD_ENV || process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: path.resolve(__dirname, '../.env.' + (process.env.NODE_ENV || 'development'))
  })
}
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const config = require('./config')

app.disable('x-powered-by')

const frontendUrl = url.parse(process.env.FRONTEND_HOST)
const origin = `${frontendUrl.protocol}//${frontendUrl.host}`

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? origin : '*',
  exposedHeaders: ['Content-Range']
}))

app.use(bodyParser.json({
  inflate: true,
  strict: false
}))

app.use(
  express.static('public'),
  express.static('frontend/public'),
  express.static('server/uploads', {
    index: false,
    maxAge: '1d'
  })
)

require('./modules')(app, config)

app.get('*', (req, res) => {
  const dir = process.env.NODE_ENV === 'production' ? 'public' : 'frontend/public'
  res.sendFile(dir + '/index.html', {
    root: '.'
  })
})

module.exports = app