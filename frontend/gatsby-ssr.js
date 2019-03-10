import './init'
import _wrapRootElement from './wrapRootElement'

export const wrapPageElement = ({ element }) => {
  // no ssr for admin
  if (element.props['*'].startsWith('admin')) {
    return null
  }
  return _wrapRootElement(element)
}