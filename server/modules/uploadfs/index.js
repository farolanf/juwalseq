const uploadfs = require('uploadfs')()

module.exports = (app, config) => {
  uploadfs.init(config.uploadfs)
  app.modules.uploadfs = uploadfs
}