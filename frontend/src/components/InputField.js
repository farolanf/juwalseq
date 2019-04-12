import React from 'react'
import { Field, connect } from 'formik'

const componentClass = {
  input: 'input',
  textarea: 'input',
  select: 'select',
}

const InputField = ({ name, id, label, icon, leftPrefix, className, inputClass, help, extra, full, inputRef, component = 'input', formik: { touched, errors }, children, ...props }) => (
    <div className={cn('form-field', className)}>
      {label && <label className='field-label' htmlFor={id}>{label}</label>}
      <div className={cn('field-control', full && 'field-control-full')}>
        <div className='form-control'>
          {leftPrefix && <span className='input-prefix pl-3'>{leftPrefix}</span>}
          {icon && <span className='input-prefix pl-3'><i className={'fa fa-' + icon} /></span>}
          <Field key={name} className={cn('max-h-xs', componentClass[component], icon && 'pl-8', touched[name] && errors[name] && 'has-error', inputClass)} name={name} id={id} component={component} {...props} innerRef={inputRef}>
            {children}
          </Field>
        </div>
        {touched[name] && errors[name] && (
          <div className='field-error'>
            {_.upperFirst(errors[name])}
          </div>
        )}
        {help ? (
          !(touched[name] && errors[name]) && (
          <div className='flex justify-between'>
            <div className='field-help'>{help}</div>
            {extra}
          </div>
          )
        ) : extra}
      </div>
    </div>
  )

export default connect(InputField)