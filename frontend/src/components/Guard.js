import React from 'react'
import useStore from '$useStore'
import SEO from '$comp/SEO'

const Guarded = ({ message }) => {
  return (
    <div className='alert alert-danger pt-8 pb-6 px-8'>
      <SEO title='Akses terbatas' />
      <h1>Halaman tidak dapat diakses</h1>
      <p>{message}</p>
    </div>
  )
}

const Guard = ({ role, message = 'Silahkan login untuk mengakses halaman ini.', children }) => {
  const { user } = useStore()
  if (!role || (user.user && (user.user.admin || user.user.groups.includes(role)))) {
    return children
  }
  return <Guarded message={message} />
}

export default Guard