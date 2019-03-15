import React, { useState } from "react"
import PropTypes from "prop-types"
import { navigate } from '@reach/router'
import { compose } from 'lodash/fp'
import { Link } from "gatsby"
import { observer } from 'mobx-react-lite'

import LoginModal from '$comp/LoginModal'

import { API_HOST, PREFIX } from '$const'
import { logout } from "$lib/auth";
import useStore from '$useStore'
import withLocation from '$lib/location'
import withMobile from '$lib/mobile'

const AccountDropdown = () => {
  const [ref, setRef] = useState()
  function close () {
    ref && UIkit.dropdown(ref).hide()
  }
  return (
    <div data-uk-dropdown='pos: bottom-right' ref={setRef}>
      <ul className='uk-nav uk-dropdown-nav'>
        <li onClick={close}><Link to='/profile'>Profil</Link></li>
        <li onClick={close}><a onClick={logout}>Logout</a></li>
      </ul>
    </div>
  )
}

const PageHeader = ({
  mobile,
  siteTitle,
}) => {
  const { user } = useStore()
  const [query, setQuery] = useState('')

  function handleSubmitQuery (e) {
    e.preventDefault()
    // clearFilters()
    // setSearchQuery(query)
    // setQuery('')
    navigate(PREFIX + '/browse?q=' + query)
  }

  return (
    <nav className='uk-navbar-container' data-uk-navbar>
      <div className="uk-navbar-left">
        <Link to='/' className="uk-navbar-item uk-logo">{siteTitle}</Link>
        <ul className="uk-navbar-nav">
          <li><a href="#">Kategori</a></li>
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li hidden={!user.loggedIn}>
            <a>
              <span data-uk-icon='user' />
              {!mobile && user.user && <span className='ml-1'>Hai {user.user.username}!</span>}
            </a>
            <AccountDropdown />
          </li>
          <li hidden={user.loggedIn}>
            <a data-uk-toggle='#login-modal'>
              <span data-uk-icon='sign-in' />
              {!mobile && <span className='ml-1'>Masuk</span>}
            </a>
            <LoginModal />
          </li>
        </ul>
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
  withMobile,
  observer,
)(PageHeader)