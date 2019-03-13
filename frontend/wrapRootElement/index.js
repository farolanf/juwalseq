import { compose } from 'lodash/fp'
import devTools from './devtools'
import script from './script'
import location from './location'
import mui from './mui'

export default element => {
  if (element.props['*'].startsWith('admin')) {
    return element
  }
  return compose(
    devTools,
    script,
    mui,
    location,
  )(element)
}