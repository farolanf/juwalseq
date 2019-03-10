import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import injectSheet from 'react-jss'
import { navigate } from '@reach/router'
import { compose } from 'lodash/fp'
import { Link } from "gatsby"
import { observer } from 'mobx-react-lite'

import { Layout, Menu } from 'antd'
import Spacer from '$comp/spacer'

const { Header } = Layout

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'

import { API_HOST, PREFIX } from '$const'
import { logout } from "$lib/auth";
import useStore from '$useStore'
import withLocation from '$helpers/location'

const styles = {
  root: tw`flex`,
  imgContainer: tw`h-full float-left mr-8`,
  img: tw`h-full`,
  menu: {
    display: 'inline-block',
    lineHeight: '64px',
  }
}

const PageHeader = ({
  // clearFilters,
  // setQuery: setSearchQuery,
  // user,
  // loggedIn,
  // fetchCart,
  // items,
  location,
  classes,
}) => {
  const department = useStore().department

  useEffect(() => {
    department.fetchDepartments()
    // fetchCart()
  }, [])

  const [query, setQuery] = useState('')

  function handleSubmitQuery (e) {
    e.preventDefault()
    // clearFilters()
    // setSearchQuery(query)
    // setQuery('')
    navigate(PREFIX + '/browse?q=' + query)
  }

  const [loginOpen, setLoginOpen] = useState(false)

  const lastSegment = (location.pathname || '').replace('/browse/', '').toLowerCase()

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
        {department.departments.map(department => (
          <Menu.Item key={department.name.toLowerCase()}>
            <Link to={'/browse/' + department.name.toLowerCase()}>
              {department.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <Spacer />
      <Menu theme='dark' mode='horizontal' className={classes.menu}>
        <Menu.Item>Profile</Menu.Item>
      </Menu>
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
  injectSheet(styles),
  withLocation,
  observer,
)(PageHeader)