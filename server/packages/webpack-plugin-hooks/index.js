class HooksWebpackPlugin {
  constructor (hooks) {
    this.hooks = hooks
  }
  apply (compiler) {
    Object.keys(this.hooks).forEach(hook => {
      compiler.hooks[hook].tap(HooksWebpackPlugin.name, this.hooks[hook])
    })
  }
}

module.exports = HooksWebpackPlugin