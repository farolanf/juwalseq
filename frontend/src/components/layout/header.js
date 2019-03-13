import React, { useState } from "react"
import PropTypes from "prop-types"
import { navigate } from '@reach/router'
import { compose } from 'lodash/fp'
import { Link } from "gatsby"
import { observer } from 'mobx-react-lite'

import { withStyles } from '@material-ui/core/styles'
import { Layout, Menu, Dropdown } from 'antd'
import Spacer from '$comp/spacer'
import LoginBox from '$comp/login'
import CategoryMenu from '$comp/category-menu'

const { Header } = Layout

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'

import { API_HOST, PREFIX } from '$const'
import { logout } from "$lib/auth";
import useStore from '$useStore'
import withLocation from '$lib/location'

const styles = {
  root: tw`flex`,
  imgContainer: tw`h-full float-left mr-8`,
  img: tw`h-full`,
  menu: {
    display: 'inline-block',
    lineHeight: '64px',
  }
}

const profileMenu = user => (
  <Menu>
    <Menu.Item disabled>{user.user.email}</Menu.Item>
    <Menu.Item>Profile</Menu.Item>
    <Menu.Item onClick={logout}>Logout</Menu.Item>
  </Menu>
)

const PageHeader = ({
  // clearFilters,
  // setQuery: setSearchQuery,
  // user,
  // fetchCart,
  // items,
  location,
  classes,
}) => {
  const { user } = useStore()
  const [query, setQuery] = useState('')
  const [loginOpen, setLoginOpen] = useState(false)

  const lastSegment = location.pathname
    .substring(location.pathname.lastIndexOf('/') + 1)
    .toLowerCase()

  function handleSubmitQuery (e) {
    e.preventDefault()
    // clearFilters()
    // setSearchQuery(query)
    // setQuery('')
    navigate(PREFIX + '/browse?q=' + query)
  }

  return (
    <Header className={classes.root}>
      <div className={classes.imgContainer}>
        <Link to='/'>
          <img src={API_HOST + '/tshirtshop.png'} className={classes.img} />
        </Link>
      </div>
      <Menu 
        theme='dark' 
        mode='horizontal' 
        className={classes.menu}
        selectedKeys={[lastSegment]}
      >
        <Menu.Item>
          <Dropdown overlay={<CategoryMenu />}>
            <div>Kategori</div>
          </Dropdown>
        </Menu.Item>
      </Menu>
      <Spacer />
      <Menu 
        theme='dark' 
        mode='horizontal' 
        className={classes.menu}
        selectedKeys={[lastSegment]}
      >
        <Menu.Item><Link to='/pasang-iklan'>Pasang iklan</Link></Menu.Item>
        {user.loggedIn ? [
          user.user.admin && (
            <Menu.Item key='admin'><Link to='/admin'>Admin</Link></Menu.Item>
          ),
          <Menu.Item key='profile'>
            <Dropdown overlay={profileMenu(user)} trigger={['click']}>
              <Link to='/profile'>Hai {user.user.username}!</Link>
            </Dropdown>
          </Menu.Item>
         ] : (
          <Menu.Item onClick={() => setLoginOpen(true)}>Login</Menu.Item>
        )}
      </Menu>
      <LoginBox open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Header>
  )
}

PageHeader.propTypes = {
  siteTitle: PropTypes.string,
}

PageHeader.defaultProps = {
  siteTitle: ``,
}

export default compose(
  withStyles(styles),
  withLocation,
  observer,
)(PageHeader)