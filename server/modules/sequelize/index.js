const { handleError } = require('@lib/helpers')
const { sequelize } = require('@db')

module.exports = function (app) {
  app.use((req, res, next) => {
    // wrap request with transaction and error handling
    try {
      sequelize.transaction(() => next())
    }
    catch (err) {
      handleError(err, res)
    }
  })  
}