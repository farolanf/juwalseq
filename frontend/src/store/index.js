const store = {}

load('user', 'script')

export default store

function load (...names) {
  names.forEach(name => {
    store[name] = require(`./${name}`).default
  })
}