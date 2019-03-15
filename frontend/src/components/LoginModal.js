import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { navigate } from '@reach/router'
import _ from 'lodash'

import FormikInput from '$comp/FormikInput'

import { API_HOST, PREFIX } from '$src/const'
import { login, register, storeReferer } from '$lib/auth';
import loginSchema from '$src/schemas/login'
import registerSchema from '$src/schemas/register'
import withMobile from '$lib/mobile'
import { toggleClass } from '$lib/dom'
import { bindVisible } from '$lib/uikit'

const ResetForm = ({ visible, mode, resetForm }) => {
  useEffect(() => {
    visible && resetForm()
  }, [mode, visible])
  return null
}

const LoginModal = ({ mobile }) => {
  const [ref, setRef] = useState()
  const [closeRef, setCloseRef] = useState()
  const [mode, setMode] = useState('login')
  
  const otherMode = mode === 'login' ? 'register' : 'login'

  const [visible] = bindVisible(ref, useState())

  useEffect(() => {
    ref && UIkit.util.on(ref, 'show', () => {
      storeReferer(location.pathname + location.search)
      setMode('login')
    })
  }, [ref])

  toggleClass(ref, { 'uk-modal-full': mobile })
  toggleClass(closeRef, {
    'uk-modal-close-full': mobile,
    'uk-close-large': mobile,
    'uk-modal-close-default': !mobile,
  })

  function toggleMode () {
    setMode(otherMode)
  }

  function close () {
    UIkit.modal(ref).hide()
  }

  function onSubmit ({ email, password }, { setSubmitting, setErrors }) {
    if (mode === 'login') {
      login(email, password)
        .then(() => {
          close()
        })
        .catch(err => {
          err.response && [401, 403].includes(err.response.status) && setErrors({
            email: 'invalid email / password',
            password: 'invalid email / password',
          })
        })
        .finally(() => setSubmitting(false))
    } else if (mode === 'register') {
      register(email, password)
        .then(() => {
          close()
          navigate(PREFIX + '/welcome/unconfirmed')
        })
        .finally(() => setSubmitting(false))
    }
  }

  return (
    <div id="login-modal" data-uk-modal ref={setRef}>
      <div className='uk-modal-dialog uk-modal-body uk-width-large'>
        <h2 className='uk-modal-title'>{_.upperFirst(mode)}</h2>
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
          {({ handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <ResetForm {...{ visible, mode, resetForm }} />
              <div className='uk-flex uk-flex-column'>
                {mode === 'login' ? (
                  <>
                    <div className='uk-margin-small'>
                      <FormikInput key='email' name='email' placeholder='Email / username' leftIcon='user' autoComplete='email' />
                    </div>
                    <div className='uk-margin-small'>
                      <FormikInput key='password' name='password' type='password' placeholder='Password' leftIcon='lock' autoComplete='password' />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='uk-margin-small'>
                      <FormikInput key='newEmail' name='email' placeholder='Email / username' leftIcon='user' />
                    </div>
                    <div className='uk-margin-small'>
                      <FormikInput key='newPassword' name='password' type='password' placeholder='Password' leftIcon='lock' />
                    </div>
                    <div className='uk-margin-small'>
                      <FormikInput name='passwordConfirm' type='password' 
                    placeholder='Confirm password' leftIcon='lock' />
                    </div>
                  </>
                )}
                <div className='mt-6 -mb-4 uk-text-muted'>Or login with</div>
                <div className='flex flex-col md:flex-row uk-margin' data-uk-margin>
                  <a className='uk-button uk-button-primary' 
                  href={API_HOST + '/auth/facebook'}>
                    <span data-uk-icon='facebook' />
                    Facebook
                  </a>
                  <a className='uk-button uk-button-primary md:ml-2' 
                  href={API_HOST + '/auth/google'}>
                    <span data-uk-icon='google' />
                    Google
                  </a>
                </div>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center uk-margin' data-uk-margin>
                  <button className='uk-button uk-button-primary md:flex-last' type='submit' disabled={isSubmitting}>
                    {mode}
                  </button>
                  <button className='uk-button uk-button-default' type='button' onClick={toggleMode}>
                    {otherMode}
                  </button>
                  <button className='uk-button uk-button-default uk-modal-close md:flex-first'>
                    Cancel
                  </button>
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