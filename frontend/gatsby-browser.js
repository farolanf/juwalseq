import './init'
// import GAnalytics from 'ganalytics'
import _wrapRootElement from './wrapRootElement'
import { verify } from '$src/lib/auth'

// const ga = GAnalytics('UA-49818631-2')

verify()

export const wrapPageElement = ({ element }) => _wrapRootElement(element)

export const onRouteUpdate = () => {
  // ga.send('pageview', { dl: location.href, dt: document.title })
}