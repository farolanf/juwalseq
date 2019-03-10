import React from 'react'
import { LocationContext } from '$src/helpers/location'

const wrapRootElement = element => (
  <LocationContext.Provider value={element.props.location}>
    {element}
  </LocationContext.Provider>
)

export default wrapRootElement