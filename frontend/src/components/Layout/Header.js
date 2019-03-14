import React, { useState } from "react"
import PropTypes from "prop-types"
import { navigate } from '@reach/router'
import { compose } from 'lodash/fp'
import { Link } from "gatsby"
import { observer } from 'mobx-react-lite'

import { API_HOST, PREFIX } from '$const'
import { logout } from "$lib/auth";
import useStore from '$useStore'
import withLocation from '$lib/location'
import withMobile from '$lib/mobile'

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
          {user.loggedIn ? (
            <li>
              <a href="#">
                <span data-uk-icon='user' />
                {!mobile && <span className='ml-1'>Hai {user.user.username}!</span>}
              </a>
            </li>
          ) : (
            <li>
              <a href="#">
                <span data-uk-icon='sign-in' />
                {!mobile && <span className='ml-1'>Masuk</span>}
              </a>
            </li>
          )}
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