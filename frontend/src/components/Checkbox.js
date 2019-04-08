import React from 'react'

const Checkbox = ({ label, value, id, className, style, onChange }) => (
  <div className={cn('checkbox', className)} style={style}>
    <label htmlFor={id} className='cursor-pointer block'>
      <input type='checkbox' id={id} onChange={onChange} checked={value} /> {label}
    </label>
  </div>
)

export default Checkbox