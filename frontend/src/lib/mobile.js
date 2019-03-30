import React, { useState, useEffect } from 'react'

import { isWidthDown } from '@material-ui/core/withWidth'
export { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'

import tailwind from '$prj/tailwind'

const screens = Object.keys(tailwind.screens).reverse()

function getWidth () {
  const w = document.body.clientWidth
  return screens.find(key => parseInt(tailwind.screens[key]) <= w)
}

const withMobile = Component => props => {
  const [width, setWidth] = useState(getWidth())
  const [updateWidth] = useState(() => () => setWidth(getWidth()))
  const mobile = isWidthDown('sm', width)

  useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return <Component width={width} mobile={mobile} {...props} />
}

export default withMobile