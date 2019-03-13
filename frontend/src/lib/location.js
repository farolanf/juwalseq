import React from 'react'

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