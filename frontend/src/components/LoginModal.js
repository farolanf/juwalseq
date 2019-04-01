import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import _ from 'lodash'

import { Formik, Form, Field } from 'formik'

import { API_HOST, PREFIX } from '$src/const'
import { login, register, storeReferer } from '$lib/auth';
import registerSchema from '$src/schemas/register'

const messages = {
  login: 'Masuk',
  register: 'Daftar',
}

const ResetForm = ({ open, mode, resetForm }) => {
  useEffect(() => {
    open && resetForm()
  }, [mode, open])
  return null
}

const LoginModal = ({ open, onClose }) => {
  const [mode, setMode] = useState('login')
  const otherMode = mode === 'login' ? 'register' : 'login'

  useEffect(() => {
    open && setMode('login')
  }, [open])

  function toggleMode () {
    setMode(otherMode)
  }

  const onDialogClick = e => e.stopPropagation()

  function onSubmit ({ email, password }, { setSubmitting, setErrors }) {
    if (mode === 'login') {
      setTimeout(() => {
      login(email, password)
        .then(() => {
          onClose()
        })
        .catch(err => {
          err.response && [401, 403].includes(err.response.status) && setErrors({
            email: 'invalid email / password',
            password: 'invalid email / password',
          })
        })
        .finally(() => setSubmitting(false))
      }, 2000)
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
        newEmail: '',
        newPassword: '',
        passwordConfirm: '',
      }}
      validationSchema={mode === 'register' ? registerSchema : undefined}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, isSubmitting, resetForm }) => (
        open && (
          <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={onDialogClick}>
              <span className='close' onClick={onClose} />
              <h3 className='text-grey'>{messages[mode]}</h3>
              <div className='divider w-16' />
              <Form onSubmit={handleSubmit} className='mb-0'>
                <ResetForm {...{ open, mode, resetForm }} />
                <div className='form-field mt-4'>
                  <div className='form-control'>
                    <span className='input-prefix pl-3'><i className='fa fa-user' /></span>
                    <Field key='email' className={cn('input pl-8', touched.email && errors.email && 'has-error')} name='email' placeholder={mode === 'login' ? 'Username atau email...' : 'Alamat email...'} />
                  </div>
                  {touched.email && errors.email && (
                    <div className='field-error'>
                      {_.upperFirst(errors.email)}
                    </div>
                  )}
                </div>
                <div className='form-field'>
                  <div className='form-control has-prefix'>
                    <span className='input-prefix pl-3'><i className='fa fa-lock' /></span>
                    <Field key='password' className='input pl-8' name='password' type='password' placeholder='Password...' />
                  </div>
                  {touched.password && errors.password && (
                    <div className='field-error'>
                      {_.upperFirst(errors.password)}
                    </div>
                  )}
                </div>
                <div className='form-field' hidden={mode !== 'register'}>
                  <div className='form-control has-prefix'>
                    <span className='input-prefix pl-3'><i className='fa fa-lock' /></span>
                    <Field className='input pl-8' name='passwordConfirm' type='password' placeholder='Ulangi password...' />
                  </div>
                  {touched.passwordConfirm && errors.passwordConfirm && (
                    <div className='field-error'>
                      {_.upperFirst(errors.passwordConfirm)}
                    </div>
                  )}
                </div>
                <div className='list-y-2 mb-4'>
                  <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                    <i className='fa fa-spinner fa-pulse' hidden={!isSubmitting} /> Masuk
                  </button>
                  <p className='text-center text-grey'>Atau masuk dengan</p>
                  <a href={API_HOST + '/auth/facebook'} className='btn btn-primary'>
                    <i className='fa fa-facebook' /> Facebook
                  </a>
                  <a href={API_HOST + '/auth/google'} className='btn btn-primary'>
                  <i className='fa fa-google' /> Google
                  </a>
                </div>
                <div className='list-x-1 justify-end'>
                  <button type='button' className='btn' onClick={toggleMode}>
                    {messages[otherMode]}
                  </button>
                  <button type='button' className='btn' onClick={onClose}>Batal</button>
                </div>
              </Form>
            </div>
          </div>
        )
      )}
    </Formik>
  )
}

export default LoginModal