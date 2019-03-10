import { compose } from 'lodash/fp'
import script from './script'
import devTools from './devtools'
import location from './location'

export default element => {
  if (element.props.noWrap) {
    return element
  }
  return compose(
    devTools,
    script,
    location,
  )(element)
}