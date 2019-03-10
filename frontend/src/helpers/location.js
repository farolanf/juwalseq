import React from 'react'

export const LocationContext = React.createContext()

const withLocation = Component => {
  class WithLocation extends React.Component {
    static contextType = LocationContext
    render () {
      return <Component location={this.context} {...this.props} />
    }
  }
  return WithLocation
}

export default withLocation