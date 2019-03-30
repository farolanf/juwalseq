import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react-lite'

import { isWidthDown } from '@material-ui/core/withWidth'
export { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'

import tailwind from '$prj/tailwind'

function getWidth () {
  const w = document.body.clientWidth
  return Object.keys(tailwind.screens).reverse().find(key => {
    return parseInt(tailwind.screens[key]) <= w
  })
}

const data = observable({
  width: getWidth()
})

const updateWidth = action('mobile: update width', () => {
  data.width = getWidth()
})

window.addEventListener('load', updateWidth)
window.addEventListener('resize', updateWidth)

const withMobile = component => observer(props => {
  const width = data.width
  const mobile = isWidthDown('sm', width)
  return React.createElement(component, { ...props, width, mobile })
})

export default withMobile