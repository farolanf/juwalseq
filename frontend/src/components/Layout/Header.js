import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { navigate } from '@reach/router'
import { compose } from 'lodash/fp'
import { Link } from "gatsby"
import { observer } from 'mobx-react-lite'

import CategoryDropdown from '$comp/CategoryDropdown'
import AccountDropdown from '$comp/AccountDropdown'
import LoginModal from '$comp/LoginModal'

import { PREFIX } from '$const'
import useStore from '$useStore'
import withLocation from '$lib/location'
import withMobile from '$lib/mobile'

const MenuDropdown = () => {
  const [ref, setRef] = useState()

  useEffect(() => {
    ref && UIkit.dropdown(ref, {
      delayHide: 150,
    })
  }, [ref])

  function close () {
    UIkit.dropdown(ref).hide()  
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
    <nav id='topbar' className='uk-navbar-container uk-navbar-transparent' data-uk-navbar>
      <div className="uk-navbar-left">
        <Link to='/' className="uk-navbar-item uk-logo logo text-3xl">{siteTitle}</Link>
        <ul className="uk-navbar-nav">
          <li>
            <a id='category-button'>Kategori</a>
            <CategoryDropdown />
          </li>
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li hidden={!mobile}>
            <a data-uk-icon='menu'></a>
            <MenuDropdown />
          </li>
          <li hidden={mobile}>
            <Link to='/pasang-iklan'>Pasang iklan</Link>
          </li>
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