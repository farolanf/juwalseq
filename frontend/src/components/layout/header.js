import React, { useState } from "react"
import PropTypes from "prop-types"
import { navigate } from '@reach/router'
import { compose } from 'lodash/fp'
import { Link } from "gatsby"
import { observer } from 'mobx-react-lite'

import { withStyles } from '@material-ui/core/styles'
import { Layout, Menu, Dropdown, Icon } from 'antd'
import { NavBar, Menu as MMenu } from 'antd-mobile'
import Spacer from '$comp/spacer'
import LoginBox from '$comp/login'
import CategoryMenu from '$comp/category-menu'
import Login from '$comp/login'

const { Header } = Layout

import { API_HOST, PREFIX } from '$const'
import { logout } from "$lib/auth";
import useStore from '$useStore'
import withLocation from '$lib/location'
import withMobile from '$lib/mobile'

const styles = {
  root: tw`flex`,
  imgContainer: tw`h-full float-left mr-8`,
  img: tw`h-full`,
  menu: {
    display: 'inline-block',
    lineHeight: '64px',
  },
  icon: tw`text-lg ml-2`,
}

class Mobile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profileVisible: false,
      loginVisible: false,
    }
    this.profileMenu = [
      { value: 'profile', label: 'Profile' },
      { value: 'logout', label: 'Logout' },
    ]
  }

  handleClickProfile = () => this.setState({ profileVisible: true })

  handleClickProfileItem = ([item]) => {
    this.setState({ profileVisible: false })
    if (item === 'profile') navigate('/profile')
    else if (item === 'logout') logout()
  }

  handleClickLogin = () => this.setState({ loginVisible: true })

  handleClickLoginClose = () => this.setState({ loginVisible: false })

  render () {
    const { siteTitle, user, classes } = this.props
    const { profileVisible, loginVisible } = this.state
    return (
      <div>
        <NavBar
          rightContent={[
            user.loggedIn ? (
              <Icon key='profile' type='user' className={classes.icon} onClick={this.handleClickProfile} />
            ) : (
              <Icon key='login' type='login' className={classes.icon} onClick={this.handleClickLogin} />
            ),
          ]}
        >
          <Link to='/' style={tw`text-white`}>{siteTitle}</Link>
        </NavBar>
        {profileVisible && (
          <MMenu
            data={this.profileMenu}
            level={1}
            onChange={this.handleClickProfileItem}
          />
        )}
        <Login open={loginVisible} onClose={this.handleClickLoginClose} />
      </div>
    )
  }
}

class Desktop extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginOpen: false,
    }
  }

  profileMenu () {
    const { user } = this.props
    return (
      <Menu>
        <Menu.Item disabled>{user.user.email}</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item onClick={logout}>Logout</Menu.Item>
      </Menu>
    )
  }

  handleClickLogin = () => this.setState({ loginOpen: true })

  handleClickLoginClose = () => this.setState({ loginOpen: false })

  render () {
    const { 
      user, 
      location,
      classes,
    } = this.props

    const { loginOpen } = this.state

    const lastSegment = location.pathname
      .substring(location.pathname.lastIndexOf('/') + 1)
      .toLowerCase()

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
              <Dropdown overlay={this.profileMenu()} trigger={['click']}>
                <Link to='/profile'>Hai {user.user.username}!</Link>
              </Dropdown>
            </Menu.Item>
          ] : (
            <Menu.Item onClick={this.handleClickLogin}>Login</Menu.Item>
          )}
        </Menu>
        <LoginBox open={loginOpen} onClose={this.handleClickLoginClose} />
      </Header>
    )
  }
}

const PageHeader = props => {
  const { user } = useStore()
  const [query, setQuery] = useState('')

  function handleSubmitQuery (e) {
    e.preventDefault()
    // clearFilters()
    // setSearchQuery(query)
    // setQuery('')
    navigate(PREFIX + '/browse?q=' + query)
  }

  props = { ...props, user, query, setQuery, handleSubmitQuery }

  if (props.mobile) {
    return <Mobile {...props} /> 
  } else {
    return <Desktop {...props} />
  }
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
  withMobile,
  observer,
)(PageHeader)