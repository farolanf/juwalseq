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
  express.static('server/uploads', {
    index: false,
    maxAge: '1d'
  })
)

// for health check
app.get('/_health', (req, res) => res.sendStatus(204))

require('./modules')(app, config)

app.use((err, req, res, next) => {
  console.error(err)
  const error = typeof err === 'string' ? err : err.message || true
  res.status(500).send({ error })
})

module.exports = app