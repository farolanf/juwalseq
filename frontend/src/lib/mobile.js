import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react-lite'

import { isWidthDown } from '@material-ui/core/withWidth'
export { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'

const data = observable({
  order: 0
})

const updateOrder = action('mobile: update order', () => {
  data.order = getComputedStyle(document.body).order
})

window.addEventListener('resize', updateOrder)

const widthMap = {
  0: 'xs',
  1: 'sm',
  2: 'md',
  3: 'lg',
  4: 'xl',
}

const withMobile = component => observer(props => {
  const width = widthMap[data.order]
  const mobile = isWidthDown('sm', width)
  return React.createElement(component, { ...props, width, mobile })
})

export default withMobile