import React from 'react'
import { Field, connect } from 'formik'

const InputField = ({ name, label, icon, leftPrefix, className, inputClass, help, extra, full, inputRef, formik: { touched, errors }, ...props }) => (
    <div className={cn('form-field', className)}>
      {label && <label className='field-label'>{label}</label>}
      <div className={cn('field-control', full && 'field-control-full')}>
        <div className='form-control'>
          {leftPrefix && <span className='input-prefix pl-3'>{leftPrefix}</span>}
          {icon && <span className='input-prefix pl-3'><i className={'fa fa-' + icon} /></span>}
          <Field key={name} className={cn('input max-h-xs', icon && 'pl-8', touched[name] && errors[name] && 'has-error', inputClass)} name={name} {...props} innerRef={inputRef} />
        </div>
        {touched[name] && errors[name] && (
          <div className='field-error'>
            {_.upperFirst(errors[name])}
          </div>
        )}
        {help ? (
          <div className='flex justify-between'>
            <div className='field-help'>{help}</div>
            {extra}
          </div>
        ) : extra}
      </div>
    </div>
  )

export default connect(InputField)