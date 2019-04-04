import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import qs from 'qs'

import InputField from '$comp/InputField'
import schema from '$src/schemas/reset-password'
import { resetPassword } from '$api/auth'

const messages = {
  invalid_data: 'Kesalahan pada data',
  invalid_token: 'Formulir ini sudah kadaluarsa. Silahkan lakukan permintaan reset password lagi.'
}

const ResetPassword = ({ location }) => {
  const [message, setMessage] = useState()
  const [error, setError] = useState()

  const onSubmit = ({ password }, { setSubmitting }) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    setError()
    resetPassword(query.token, password)
      .then(res => setMessage(messages[res.data.message]))
      .catch(err => setError(messages[err.response.data.error]))
      .finally(() => setSubmitting(false))
  }
  
  return (
    <div className='md:max-w-xs'>
      <h2>Reset password</h2>
      {message ? (
        <div className='alert alert-success'>{message}</div>
      ) : (<>
        {error && <div className='alert alert-danger'>{error}</div>}
        <div className='alert alert-info'>
          Masukkan password baru.
        </div>
        <Formik 
          initialValues={{
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name='password' type='password' placeholder='Password...' icon='lock' />
              <InputField name='passwordConfirm' type='password' placeholder='Ulangi password...' icon='lock' />
              <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                {isSubmitting && <i className='fa fa-spinner fa-pulse' />} Simpan
              </button>
            </Form>
          )}
        </Formik>
      </>)}
    </div>
  )
}

export default ResetPassword