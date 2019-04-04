import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { navigate } from '@reach/router'
import { compose } from 'lodash/fp'
import { Link } from "gatsby"
import { observer } from 'mobx-react-lite'

// import CategoryDropdown from '$comp/CategoryDropdown'
// import AccountDropdown from '$comp/AccountDropdown'
import LoginModal from '$comp/LoginModal'
import Popup from '$comp/Popup'

import { PREFIX } from '$const'
import useStore from '$useStore'
import withLocation from '$lib/location'
import { logout } from '$lib/auth'

const PageHeader = ({
  siteTitle,
}) => {
  const [open, setOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const { user } = useStore()
  const [query, setQuery] = useState('')

  const toggleNavbar = () => setOpen(!open)

  const showAccount = () => setAccountOpen(true)

  const hideAccount = () => setAccountOpen(false)

  const showLoginModal = () => setLoginModalOpen(true)

  const hideLoginModal = () => setLoginModalOpen(false)

  const doLogout = () => {
    setAccountOpen(false)
    logout()
  }

  function handleSubmitQuery (e) {
    e.preventDefault()
    // clearFilters()
    // setSearchQuery(query)
    // setQuery('')
    navigate(PREFIX + '/browse?q=' + query)
  }

  return (
    <nav className='navbar-container'>
      <div className={cn('navbar navbar-dark relative', open && 'active')}>
        <div className='mr-6'>
          <Link to='/' className='navbar-logo'>{siteTitle}</Link>
        </div>
        <div className='md:hidden'>
          <button className='navbar-menu' onClick={toggleNavbar}>
            <i className='fa fa-bars' />
          </button>
        </div>
        <div className='navbar-collapse'>
          <a className='navbar-link'>Kategori</a>
          <a className='navbar-link'>Diskon</a>
          <Link to='/demo/form' className='navbar-link'>Form Demo</Link>
          <div className='navbar-right'>
            <a className='navbar-link'>Pasang iklan</a>
            <a className={cn('navbar-link', user.loggedIn && 'hidden')} onClick={showLoginModal}>
              <i className='fa fa-sign-in hidden md:inline' />
              <span className='md:hidden'>Masuk</span>
            </a>
            <a className={cn('navbar-link', !user.loggedIn && 'hidden')} onClick={showAccount}>
              <i className='fa fa-user hidden md:inline' />
              <span className='md:hidden'>Akun</span>
            </a>
          </div>
        </div>
      </div>
      <Popup open={accountOpen} onClose={hideAccount}>
        <a>Profil</a>
        <a onClick={doLogout}>Keluar</a>
      </Popup>
      <LoginModal open={loginModalOpen} onClose={hideLoginModal} />
    </nav>
  )
}

PageHeader.propTypes = {
  siteTitle: PropTypes.string,
}

PageHeader.defaultProps = {
  siteTitle: ``,
}

export default compose(
  withLocation,
  observer,
)(PageHeader)