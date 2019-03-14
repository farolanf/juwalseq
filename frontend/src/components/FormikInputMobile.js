import React from 'react'
import _ from 'lodash'
import { connect } from 'formik'
import { InputItem, Toast } from 'antd-mobile'

class FormikInputMobile extends React.Component {
  handleErrorClick = name => () => {
    const { formik } = this.props
    Toast.info(_.upperFirst(formik.errors[name]))
  }

  render () {
    const { formik, label, help, extra, name, required, ...props } = this.props
    return (
      <InputItem
        name={name}
        {...props}
        error={formik.touched[name] && !!formik.errors[name]}
        onChange={value => formik.handleChange({ target: { name, value }})}
        onBlur={value => formik.handleBlur({ target: { name, value }})}
        onErrorClick={this.handleErrorClick(name)}
      >
        {label}
      </InputItem>
    )
  }
}

export default connect(FormikInputMobile)