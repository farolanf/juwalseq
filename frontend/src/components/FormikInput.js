import React, { useState } from 'react'
import { connect } from 'formik'
import { toggleClass } from '$lib/dom'

const FormikInput = ({ formik, label, help, name, leftIcon, className, ...props }) => {
  const [input, setInput] = useState()
  const error = formik.touched[name] && formik.errors[name]
  toggleClass(input, 'uk-form-danger', !!error)
  return (
    <div className={className}>
      <div className='uk-inline'>
        {leftIcon && <span className='uk-form-icon' uk-icon={leftIcon}></span>}
        <input className='uk-input' name={name} value={formik.values[name]} onChange={formik.handleChange} onBlur={formik.handleBlur} {...props} ref={setInput} />
      </div>
      {error && <div className='uk-text-danger uk-text-small mt-1'>{error}</div>}
      {!error && help && <div className='uk-text-muted uk-text-small mt-1'>{help}</div>}
    </div>
  )
}

export default connect(FormikInput)