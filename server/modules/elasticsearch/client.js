const elasticsearch = require('elasticsearch')

const options = {
  apiVersion: '6.6',
  host: process.env.ELASTICSEARCH_HOST || 'localhost:9200',
  maxSockets: process.env.ELASTICSEARCH_MAX_SOCKETS
}

if (process.env.ELASTICSEARCH_USER && process.env.ELASTICSEARCH_PASS) {
  options.httpAuth = `${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PASS}`
}

const client = elasticsearch.Client(options)

client.ping({
  requestTimeout: 5000
})

module.exports = client