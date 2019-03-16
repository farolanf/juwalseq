import React, { useState, useEffect } from 'react'
import { connect } from 'formik'
import cn from 'classnames'

import { toggleClass } from '$lib/dom'

const FormikInput = ({ formik, name, component = 'input', label, help, extra, leftIcon, leftPrefix, className, inputClass = 'uk-input', width, inputRef, children, ...props
}) => {
  const [input, setInput] = useState()
 
  const error = formik.touched[name] && formik.errors[name]
  
  useEffect(() => {
    inputRef && inputRef(input)
  }, [input])

  toggleClass(input, 'uk-form-danger', !!error)
  
  return (
    <div className={className}>
      {label && <label className='uk-form-label'>{label}</label>}
      <div className='uk-form-controls'>
        <div className={cn('uk-inline', width && 'uk-width-' + width)}>
          {leftIcon && <span className='uk-form-icon' uk-icon={leftIcon}></span>}
          {leftPrefix && <span className='uk-form-icon'>{leftPrefix}</span>}
          {React.createElement(component, {
            className: inputClass,
            style: { maxHeight: 480 },
            name,
            value: formik.values[name],
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            ref: setInput,
            ...props,
          }, children)}
        </div>
        {error && <div className='uk-text-danger uk-text-small mt-1'>{error}</div>}
        {!error && (help || extra) && (
          <div className='flex justify-between mt-1'>
            <div className='uk-text-muted uk-text-small'>{help}</div>
            <div className='uk-text-muted uk-text-small text-right'>{extra}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default connect(FormikInput)