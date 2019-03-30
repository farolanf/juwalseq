import { compose } from 'lodash/fp'
// import devTools from './devtools'
// import script from './script'
import location from './location'
import mui from './mui'

// disable layout in development to avoid full reload on change
let layout
if (process.env.NODE_ENV === 'production') {
  layout = require('./layout').default
}

const wrappers = [
  // devTools,
  // script,
  mui,
  location,
  layout,
].filter(x => x)

export default compose(wrappers)