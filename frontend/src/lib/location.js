import React from 'react'
import { navigate } from '@reach/router'
import qs from 'qs'

export const queryString = {
  allowUpdate: true,
  parseQuery () {
    return qs.parse(location.search, { ignoreQueryPrefix: true })
  },
  withoutUpdate (fn) {
    this.allowUpdate = false
    fn(this.parseQuery())
    this.allowUpdate = true
  },
  update (fn) {
    if (!this.allowUpdate) return
    const query = this.parseQuery()
    fn(query)
    const queryStr = qs.stringify(query)
    navigate(location.pathname + (queryStr ? '?' + queryStr : ''))
  },
}

export const LocationContext = React.createContext()

const withLocation = Component => {
  class WithLocation extends React.Component {
    render () {
      return <Component location={this.context} {...this.props} />
    }
  }
  WithLocation.contextType = LocationContext
  return WithLocation
}

export default withLocation