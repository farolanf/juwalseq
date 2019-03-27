import React from 'react'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'

export { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'

const createComponent = component => props => {
  const mobile = isWidthDown('sm', props.width)
  return React.createElement(component, { ...props, mobile })
}

const withMobile = component => process.browser 
  ? withWidth()(createComponent(component))
  : createComponent(component)

export default withMobile