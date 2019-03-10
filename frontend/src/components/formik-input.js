import React from 'react'
import { connect } from 'formik'
import { Form, Input } from 'antd'

const FormikInput = ({ formik, label, help, extra, name, required, ...props }) => (
  <Form.Item 
    label={label}
    help={formik.touched[name] && formik.errors[name] ? formik.errors[name] : help}
    validateStatus={formik.touched[name] && formik.errors[name] ? 'error' : ''}
    extra={extra}
    required={required}
  >
    <Input
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      required={required}
      {...props} 
    />
  </Form.Item>
)

export default connect(FormikInput)