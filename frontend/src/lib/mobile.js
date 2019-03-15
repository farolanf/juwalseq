import React from 'react'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'

export { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'

const withMobile = component => 
  withWidth()(props => {
    const mobile = isWidthDown('sm', props.width)
    return React.createElement(component, { ...props, mobile })
  })

export default withMobile