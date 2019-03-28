import './init'
// import GAnalytics from 'ganalytics'
import _wrapRootElement from './wrapRootElement'
import _wrapPageElement from './wrapPageElement'
import { verify } from '$src/lib/auth'

// const ga = GAnalytics('UA-49818631-2')

verify()

export const wrapRootElement = ({ element }) => {
  return _wrapRootElement(element)
}

// we use wrapPageElement instead of wrapRootElement so we can test if
// the page is an Admin page to avoid wrapping it
export const wrapPageElement = ({ element }) => {
  // don't wrap admin
  if (element.props['*'].startsWith('admin')) {
    return element
  }
  return _wrapPageElement(element)
}

export const onRouteUpdate = () => {
  // ga.send('pageview', { dl: location.href, dt: document.title })
}