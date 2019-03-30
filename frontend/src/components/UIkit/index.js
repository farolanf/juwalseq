import React from 'react'
import Base from './Base'

const createProxyComponent = (name, baseOptions = { Component: 'div' }) => React.forwardRef(
  ({ freezeHTML, icon, options, ...props }, ref) => {
    if (typeof freezeHTML === 'undefined') {
      freezeHTML = name === 'icon'
    }
    baseOptions = { ...baseOptions, freezeHTML }
    options = { ...options, icon }
    return <Base ukComponent={name} baseOptions={baseOptions} options={options} ref={ref} {...props} />
  }
)

const components = [
  'drop',
  'heightViewport',
  'modal',
  ['toggle', {
    Component: 'a'
  }],
  ['icon', {
    Component: 'span'
  }],
]

export default components.reduce(
  (obj, name) => {
    const baseOptions = Array.isArray(name) ? name[1] : undefined
    name = Array.isArray(name) ? name[0] : name
    return { 
      ...obj, 
      [name]: createProxyComponent(name, baseOptions)
    }
  },
  {}
)