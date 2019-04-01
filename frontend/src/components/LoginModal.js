import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import _ from 'lodash'

import { Formik, Form, Field, connect } from 'formik'

import { API_HOST, PREFIX } from '$src/const'
import { login, register, storeReferer } from '$lib/auth';
import registerSchema from '$src/schemas/register'

const messages = {
  login: 'Masuk',
  register: 'Daftar',
}

const InputField = connect(({ name, icon, className, formik: { touched, errors }, ...props }) => (
  <div className={cn('form-field', className)}>
    <div className='form-control'>
      <span className='input-prefix pl-3'><i className={'fa fa-' + icon} /></span>
      <Field key={name} className={cn('input pl-8', touched[name] && errors[name] && 'has-error')} name={name} {...props} />
    </div>
    {touched[name] && errors[name] && (
      <div className='field-error'>
        {_.upperFirst(errors[name])}
      </div>
    )}
  </div>
))

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

  function onSubmit ({ email, password, newEmail, newPassword }, { setSubmitting, setErrors }) {
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
      register(newEmail, newPassword)
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
      {({ handleSubmit, isSubmitting, resetForm }) => (
        open && (
          <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={onDialogClick}>
              <span className='close' onClick={onClose} />
              <h3 className='text-grey'>{messages[mode]}</h3>
              <div className='divider w-16' />
              {/* set form key to force remount on mode change for autofill to work */}
              <Form key={mode} onSubmit={handleSubmit} className='mb-0'>
                <ResetForm {...{ open, mode, resetForm }} />
                {mode === 'login' ? (<>
                  <InputField key='email' name='email' placeholder='Username atau email...' icon='user' className='mt-4' />
                  <InputField key='password' name='password' type='password' placeholder='Password...' icon='lock' />
                </>) : (<>
                  <InputField key='newEmail' name='newEmail' placeholder='Alamat email...' icon='user' className='mt-4' />
                  <InputField key='newPassword' name='newPassword' type='password' placeholder='Password...' icon='lock' />
                  <InputField name='passwordConfirm' type='password' placeholder='Ulangi password...' icon='lock' />
                </>)}
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