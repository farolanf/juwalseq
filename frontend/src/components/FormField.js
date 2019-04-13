import React from 'react'

const FormField = ({ label, full, className, containerClass, children }) => (
  <div className={cn('form-field', className)}>
    <label className='field-label hidden md:block'>{label}</label>
    <div className={cn('field-control', full && 'field-control-full')}>
      <div className={cn('form-control', containerClass)}>{children}</div>
    </div>
  </div>
)

export default FormField