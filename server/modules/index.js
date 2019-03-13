module.exports = function (app, config) {
  app.modules = {}
  config.modules && config.modules.forEach(name => {
    const mod = require('./' + name)
    const initFn = typeof mod === 'function' ? mod
      : (typeof mod === 'object' ? mod.init : null)
    initFn && initFn(app, config)
  })
}