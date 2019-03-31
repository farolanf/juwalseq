import { compose } from 'lodash/fp'
// import devTools from './devtools'
// import script from './script'
import theme from './theme'
import location from './location'

// disable layout in development to avoid full reload on change
let layout
if (process.env.NODE_ENV === 'production') {
  layout = require('./layout').default
}

const wrappers = [
  // devTools,
  // script,
  theme,
  layout,
  location,
].filter(x => x)

export default compose(wrappers)