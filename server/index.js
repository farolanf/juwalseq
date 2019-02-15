const app = require('./app')
const config = require('./config')

app.listen(config.app.port, () => {
  // eslint-disable-next-line
  console.log('Server is listening on port', config.app.port)
})