import React from 'react'
import { LocationContext } from '$lib/location'

// must be the first HOC
const wrapRootElement = element => (
  <LocationContext.Provider value={element.props.location}>
    {element}
  </LocationContext.Provider>
)

export default wrapRootElement