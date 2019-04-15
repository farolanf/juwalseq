import React from 'react'
import { connect } from 'formik'
import Checkbox from '$comp/Checkbox'

const CheckboxInput = connect(({ name, inputRef, formik, ...props }) => (
  <input {...props} name={name} checked={formik.values[name]} onChange={formik.handleChange} onBlur={formik.handleBlur} ref={inputRef} />
))

const FormikCheckbox = props => (
  <Checkbox component={CheckboxInput} {...props} />
)

export default FormikCheckbox