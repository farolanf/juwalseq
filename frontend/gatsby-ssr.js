import './init'
import _wrapRootElement from './wrapRootElement'

export const wrapPageElement = ({ element }) => {
  if (element.props.noSSR) {
    return null
  }
  return _wrapRootElement(element)
}