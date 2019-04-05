import { compose } from 'lodash/fp'
import style from './style'

const wrapRootElement = element => compose(
  style,
)(element)

export default wrapRootElement