import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { navigate } from '@reach/router'
import { compose } from 'lodash/fp'
import { Link } from "gatsby"
import { observer } from 'mobx-react-lite'

// import CategoryDropdown from '$comp/CategoryDropdown'
// import AccountDropdown from '$comp/AccountDropdown'
// import LoginModal from '$comp/LoginModal'

import { PREFIX } from '$const'
import useStore from '$useStore'
import withLocation from '$lib/location'

const MenuDropdown = () => {
  const [ref, setRef] = useState()

  function close () {
  }

  return (
    <div data-uk-dropdown='offset: 0; pos: bottom-justify; boundary: #topbar; boundary-align: true' ref={setRef}>
      <ul className='uk-nav uk-dropdown-nav'>
        <li>
          <Link to='/pasang-iklan' onClick={close}>Pasang iklan</Link>
        </li>
      </ul>
    </div>
  )
}

const PageHeader = ({
  siteTitle,
}) => {
  const [open, setOpen] = useState(false)
  const { user } = useStore()
  const [query, setQuery] = useState('')

  const toggleNavbar = () => setOpen(!open)

  function handleSubmitQuery (e) {
    e.preventDefault()
    // clearFilters()
    // setSearchQuery(query)
    // setQuery('')
    navigate(PREFIX + '/browse?q=' + query)
  }

  return (
    <nav className='bg-orange'>
      <div className={cn('navbar navbar-dark', open && 'active')}>
        <div className='mr-6'>
          <Link to='/' className='navbar-logo'>{siteTitle}</Link>
        </div>
        <div className='md:hidden'>
          <button className='navbar-btn' onClick={toggleNavbar}>
            <i className='fa fa-bars' />
          </button>
        </div>
        <div className='navbar-collapse'>
          <a className='navbar-link'>Kategori</a>
          <a className='navbar-link'>Diskon</a>
          <div className='navbar-right'>
            <Link to='/pasang-iklan' className='navbar-link'>Pasang iklan</Link>
            <button className={cn('navbar-btn', user.loggedIn && 'hidden')}>
              <i className='fa fa-sign-in hidden md:inline' />
              <span className='md:hidden'>Masuk</span>
            </button>
            <button className={cn('navbar-btn', !user.loggedIn && 'hidden')}>
              <i className='fa fa-user hidden md:inline' />
              <span className='md:hidden'>Akun</span>
            </button>
          </div>
        </div>
      </div>
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