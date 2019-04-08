import React from 'react'

const Collapse = ({ show, children, ...props }) => {
  return (
    <div hidden={!show}>
      {typeof children === 'function' ? children(props) : children}
    </div>
  )
}

export default Collapse