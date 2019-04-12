require('module-alias/register')
const url = require('url')
const path = require('path')
if (process.env.LOAD_ENV || process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: path.resolve(__dirname, '../.env.' + (process.env.NODE_ENV || 'development'))
  })
}
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const app = express()
const config = require('./config')

app.disable('x-powered-by')

app.use(compression())

const frontendUrl = url.parse(process.env.FRONTEND_HOST)
const origin = `${frontendUrl.protocol}//${frontendUrl.host}`

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? origin : '*',
  exposedHeaders: ['Content-Range']
}))

app.use(express.json({
  strict: false
}))

app.use('/static', express.static(path.join(__dirname, 'static'), {
  index: false,
  maxAge: '1d'
}))

// for health check
app.get('/_health', (req, res) => res.sendStatus(204))

require('./modules')(app, config)

app.use((err, req, res, next) => {
  console.error(err)
  const error = typeof err === 'string' ? err : err.message || true
  res.status(500).send({ error })
})

module.exports = app