import React, { useState, useEffect } from 'react'

const Checkbox = ({ label, value, checked, indeterminate, id, className, style, onChange, component = 'input', ...props }) => {
  const [ref, setRef] = useState()

  useEffect(() => {
    ref && (ref.indeterminate = indeterminate)
  }, [ref, indeterminate])

  const _props = {}
  if (component === 'input') {
    _props.ref = setRef
  } else {
    _props.inputRef = setRef
  }

  checked = typeof value !== 'undefined' ? value : typeof checked !== 'undefined' ? checked : undefined

  return (
    <div className={cn('checkbox', className)} style={style}>
      <label htmlFor={id} className='cursor-pointer block'>
        {React.createElement(component, {
          type: 'checkbox',
          id,
          onChange,
          checked,
          ...props,
          ..._props,
        })} {label}
      </label>
    </div>
  )
}

export default Checkbox