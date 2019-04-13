import React from 'react'
import { Field, connect } from 'formik'

const FormikCheckbox = ({ label, id, className, style, ...props }) => (
  <div className={cn('checkbox', className)} style={style}>
    <label htmlFor={id} className='cursor-pointer block'>
      <Field type='checkbox' id={id} {...props} /> {label}
    </label>
  </div>
)

export default connect(FormikCheckbox)