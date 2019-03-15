import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { navigate } from '@reach/router'

import { API_HOST, PREFIX } from '$src/const'
import { login, register, storeReferer } from '$lib/auth';
import loginSchema from '$src/schemas/login'
import registerSchema from '$src/schemas/register'
import withMobile from '$lib/mobile'
import { toggleClass } from '$lib/dom'

const LoginModal = ({ mobile }) => {
  const [ref, setRef] = useState()
  const [closeRef, setCloseRef] = useState()
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

  toggleClass(ref, { 'uk-modal-full': mobile })
  toggleClass(closeRef, {
    'uk-modal-close-full': mobile,
    'uk-close-large': mobile,
    'uk-modal-close-default': !mobile,
  })

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
    <div id="login-modal" data-uk-modal ref={setRef}>
      <div className='uk-modal-dialog uk-modal-body'>
        <h2 className='uk-modal-title'>Login</h2>
        <button className='uk-modal-close-default' type='button' data-uk-close 
        ref={setCloseRef} />
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
            <form onSubmit={handleSubmit} className='uk-form-stacked'>
              <div className='uk-margin'>
                <div className='uk-inline'>
                  <span className='uk-form-icon' uk-icon='user'></span>
                  <input type='text' className='uk-input' placeholder='Email / usernamex' />
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default withMobile(LoginModal)