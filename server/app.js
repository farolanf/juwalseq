require('module-alias/register')
const url = require('url')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env.' + (process.env.NODE_ENV || 'development'))
})
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = require('express')()
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
  serveStatic(path.resolve(__dirname, 'uploads'), {
    index: false,
    maxAge: '1d'
  })
)

require('./modules')(app, config)

module.exports = app