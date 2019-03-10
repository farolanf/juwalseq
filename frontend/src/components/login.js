import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import { compose } from 'lodash/fp'
import { Formik } from 'formik'
import _ from 'lodash'

import { Modal, Button, Form, Icon } from 'antd'
import { Grid } from '@material-ui/core'
import FormikInput from '$comp/formik-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

import { API_HOST, PREFIX } from '$src/const'
import { login, register, storeReferer } from '$lib/auth';
import loginSchema from '$src/schemas/login'
import registerSchema from '$src/schemas/register'

const styles = {
  inputIcon: tw`text-grey`,
  marginBottom: tw`mb-2`,
}

const LoginBox = ({ open, onClose, classes }) => {
  const [mode, setMode] = useState('login')
  const otherMode = mode === 'login' ? 'register' : 'login'

  function toggleMode() {
    setMode(otherMode)
  }

  useEffect(() => {
    if (open) {
      storeReferer(location.pathname + location.search)
      setMode('login')
    }
  }, [open])


  function onSubmit({ email, password }, { setSubmitting, setErrors }) {
    if (mode === 'login') {
      login(email, password)
        .then(() => {
          onClose()
        })
        .catch(err => {
          [401, 403].includes(err.response.status) && setErrors({
            email: 'invalid email / password',
            password: 'invalid email / password',
          })
        })
        .finally(() => setSubmitting(false))
    } else if (mode === 'register') {
      register(email, password)
        .then(() => {
          onClose()
          navigate(PREFIX + '/welcome/unconfirmed')
        })
        .finally(() => setSubmitting(false))
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={mode === 'login' ? loginSchema : registerSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Modal
          title={_.upperFirst(mode)}
          visible={open}
          onCancel={onClose}
          width={320}
          footer={[
            <Button key='cancel' onClick={onClose}>Cancel</Button>,
          ]}
        >
          <Form onSubmit={handleSubmit}>
            <Grid container direction='column'>
              <FormikInput 
                name='email'
                placeholder='Email address / username'
                prefix={<Icon type='user' className={classes.inputIcon} />}
              />
              <FormikInput 
                name='password'
                type='password'
                placeholder='Password'
                prefix={<Icon type='lock' className={classes.inputIcon} />}
                extra={mode === 'login' && (
                  <div style={tw`text-right`}>
                    <Link to='/forgot-password' className={classes.link} onClick={onClose}>Forgot password?</Link>
                  </div>
                )}
              />
              {mode === 'register' && (
                <FormikInput 
                  name='passwordConfirm'
                  type='password'
                  placeholder='Confirm password'
                  prefix={<Icon type='lock' className={classes.inputIcon} />}
                />
              )}
              <Button htmlType='submit' type='primary' disabled={isSubmitting}>
                {_.upperFirst(mode)}
              </Button>
              <div style={tw`flex justify-end mt-1`}>
                {<a onClick={toggleMode}>{_.upperFirst(otherMode)}</a>}
              </div>
              Or login with
              <Button
                href={API_HOST + '/auth/facebook'}
                type='primary'
                block
                className={classes.marginBottom}
              >
                <FontAwesomeIcon icon={faFacebook} className={classes.buttonIcon} />
                Facebook
              </Button>
              <Button
                href={API_HOST + '/auth/google'}
                type='primary'
                block
              >
                <FontAwesomeIcon icon={faGoogle} className={classes.buttonIcon} />
                Google
              </Button>
            </Grid>
          </Form>
        </Modal>
      )}
    </Formik>
  )
}

LoginBox.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
)(LoginBox)