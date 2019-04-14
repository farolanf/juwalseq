import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import _ from 'lodash'

import { Formik, Form } from 'formik'
import InputField from '$comp/InputField'

import { API_HOST, PREFIX } from '$src/const'
import { login, register, storeReferer } from '$lib/auth';
import { forgotPassword } from '$api/auth'

import registerSchema from '$src/schemas/register'
import forgotPasswordSchema from '$src/schemas/forgot-password'

const schemas = {
  register: registerSchema,
  forgot: forgotPasswordSchema,
}

const messages = {
  login: 'Masuk',
  register: 'Daftar',
  forgot: 'Lupa password',
  forgotNotice: 'Lupa password',
  invalid_email: 'Bukan alamat email',
  email_not_found: 'Email tidak terdaftar',
  check_email: 'Silahkan periksa email anda beberapa saat lagi dan ikuti petunjuk di dalamnya untuk mengganti password.',
}

const ResetForm = ({ open, mode, resetForm }) => {
  useEffect(() => {
    open && resetForm()
  }, [mode, open])
  return null
}

const LoginModal = ({ open, onClose }) => {
  const [mode, setMode] = useState('forgot')
  const otherMode = mode === 'login' ? 'register' : 'login'
  const [message, setMessage] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (open) {
      storeReferer()
      setMode('login')
    }
  }, [open])

 
  function toggleMode () {
    setMode(otherMode)
  }

  const modeForgot = () => setMode('forgot')

  const onDialogClick = e => e.stopPropagation()

  function onSubmit ({ email, password, newEmail, newPassword, registeredEmail }, { setSubmitting, setErrors, resetForm }) {
    if (mode === 'login') {
      login(email, password)
        .then(() => {
          onClose()
        })
        .catch(err => {
          err.response && [401, 403].includes(err.response.status) && setErrors({
            email: 'Email atau password salah',
            password: 'Email atau password salah',
          })
        })
        .finally(() => setSubmitting(false))
    } else if (mode === 'register') {
      register(newEmail, newPassword)
        .then(() => {
          onClose()
          navigate(PREFIX + '/welcome/unconfirmed')
        })
        .finally(() => setSubmitting(false))
    } else if (mode === 'forgot') {
      forgotPassword(registeredEmail).then(res => {
        setMessage(messages[res.data.message])
        setMode('forgotNotice')
      }).catch(err => {
        setError(messages[err.response.data.error])
      }).finally(() => {
        setSubmitting(false)
        resetForm()
      })
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
        registeredEmail: '',
      }}
      validationSchema={schemas[mode]}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting, resetForm }) => (
        open && (
          <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={onDialogClick}>
              <span className='close' onClick={onClose} />
              <h3 className='text-grey'>{messages[mode]}</h3>
              <div className='divider w-16 mb-4' />
              {/* set form key to force remount on mode change for autofill to work */}
              <Form key={mode} onSubmit={handleSubmit} className='mb-0'>
                <ResetForm {...{ open, mode, resetForm }} />
                {mode === 'login' ? (<>
                  <InputField key='email' name='email' placeholder='Username atau email...' icon='user' />
                  <InputField key='password' name='password' type='password' placeholder='Password...' icon='lock' extra={
                    <div className='flex justify-end'>
                      <a className='link text-sm' onClick={modeForgot}>Lupa password?</a>
                    </div>
                  } />
                </>) : mode === 'register' && (<>
                  <InputField key='newEmail' name='newEmail' placeholder='Alamat email...' icon='user' />
                  <InputField key='newPassword' name='newPassword' type='password' placeholder='Password...' icon='lock' />
                  <InputField name='passwordConfirm' type='password' placeholder='Ulangi password...' icon='lock' />
                </>)}
                {['login', 'register'].includes(mode) && (
                  <div className='list-y-2'>
                    <button type='submit' className='btn btn-primary capitalize' disabled={isSubmitting}>
                      <i className='fa fa-spinner fa-pulse' hidden={!isSubmitting} /> {mode}
                    </button>
                    <p className='text-center text-grey'>Atau masuk dengan</p>
                    <a href={API_HOST + '/auth/facebook'} className='btn btn-primary'>
                      <i className='fa fa-facebook' /> Facebook
                    </a>
                    <a href={API_HOST + '/auth/google'} className='btn btn-primary'>
                    <i className='fa fa-google' /> Google
                    </a>
                  </div>
                )}
                {mode === 'forgot' && (<>
                  {error && <div className='alert alert-danger'>{error}</div>}
                  <div className='alert'>
                    Masukkan email yang terdaftar untuk mengganti password.
                  </div>
                  <InputField name='registeredEmail' placeholder='Email terdaftar...' />
                  <div className='list-y-2'>
                    <button type='submit' className='btn btn-primary w-full' disabled={isSubmitting}>
                      <i className='fa fa-spinner fa-pulse' hidden={!isSubmitting} /> Reset password
                    </button>
                  </div>
                </>)}
                {mode === 'forgotNotice' && (
                  <div className='alert alert-success'>{message}</div>
                )}
                <div className='list-x-1 justify-end mt-4'>
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