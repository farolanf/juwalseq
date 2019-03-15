import { compose } from 'lodash/fp'
// import devTools from './devtools'
// import script from './script'
import location from './location'
// import mui from './mui'
// import layout from './layout'

export default element => {
  if (element.props['*'].startsWith('admin')) {
    return element
  }
  return compose(
    // devTools,
    // script,
    // mui,
    location,
    // disable layout while in dev, as it needed full reload on change
    // layout,
  )(element)
}