const store = {}

load('user', 'department', 'route', 'script')

export default store

function load (...names) {
  names.forEach(name => {
    const Cls = require(`./${name}`).default
    store[name] = typeof Cls === 'function' ? new Cls() : Cls
  })
}