const store = {}

load(
  'user', 
  'category',
  'product',
  'region',
  'attribute',
  'route', 
  'script',
)

export default store

function load (...names) {
  names.forEach(name => {
    const Cls = require(`./${name}`).default
    store[name] = typeof Cls === 'function' ? new Cls() : Cls
  })
}