import React from 'react'
import DevTools from 'mobx-react-devtools'

const wrapRootElement = element => (
  <div>
    {element}
    <DevTools />
  </div>
)

export default wrapRootElement