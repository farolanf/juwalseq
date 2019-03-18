import React from 'react'
import Base from './Base'

const component = name => React.forwardRef(
  (props, ref) => <Base ukComponent={name} ref={ref} {...props} />
)

const components = [
  'drop',
  'modal',
  'heightViewport',
]

export default components.reduce(
  (obj, name) => ({ ...obj, [name]: component(name) }),
  {})