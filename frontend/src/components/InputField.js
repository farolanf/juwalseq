import React from 'react'
import { Field, connect } from 'formik'

const InputField = ({ name, icon, className, extra, formik: { touched, errors }, ...props }) => (
  <div className={cn('form-field', className)}>
    <div className='form-control'>
      {icon && <span className='input-prefix pl-3'><i className={'fa fa-' + icon} /></span>}
      <Field key={name} className={cn('input', icon && 'pl-8', touched[name] && errors[name] && 'has-error')} name={name} {...props} />
    </div>
    {touched[name] && errors[name] && (
      <div className='field-error'>
        {_.upperFirst(errors[name])}
      </div>
    )}
    {extra}
  </div>
)

export default connect(InputField)