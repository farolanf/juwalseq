import React, { useState, useEffect } from 'react'
import tailwind from '$prj/tailwind'
import theme from '$src/theme'

const screens = Object.keys(tailwind.screens)
const screensReverse = screens.reverse()

const isWidthDown = (breakpoint, width) => {
  if (!screens.includes(width)) return true
  return screens.indexOf(width) <= screens.indexOf(breakpoint)
}

function getWidth () {
  if (typeof document === 'undefined') return theme.initialWidth || 'md'
  const w = document.body.clientWidth
  return screensReverse.find(key => parseInt(tailwind.screens[key]) <= w)
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