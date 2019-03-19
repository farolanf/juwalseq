import React from 'react'
import Base from './Base'

const component = (name, options = { Component: 'div' }) => React.forwardRef(
  (props, ref) => <Base ukComponent={name} baseOptions={options} ref={ref} {...props} />
)

const components = [
  'drop',
  'heightViewport',
  'modal',
  ['toggle', {
    Component: 'a'
  }],
]

export default components.reduce(
  (obj, name) => {
    const options = Array.isArray(name) ? name[1] : undefined
    name = Array.isArray(name) ? name[0] : name
    return { 
      ...obj, 
      [name]: component(name, options)
    }
  },
  {}
)