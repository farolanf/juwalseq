import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { navigate } from '@reach/router'
import { compose } from 'lodash/fp'
import injectSheet from 'react-jss'

import { Layout, Menu } from 'antd'

const { Header } = Layout

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'

import { Link } from "gatsby"
import { API_HOST, PREFIX } from '$src/const'

import { logout } from "$lib/auth";

const styles = {
  imgContainer: tw`h-full float-left`,
  img: tw`h-full`,
  menu: {
    lineHeight: '64px',
  }
}

const PageHeader = ({
  // departments,
  // fetchDepartments,
  // clearFilters,
  // setQuery: setSearchQuery,
  // user,
  // loggedIn,
  // fetchCart,
  // items,
  classes,
}) => {
  useEffect(() => {
    // fetchDepartments()
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

  return (
    <Header>
      <div className={classes.imgContainer}>
        <img src={API_HOST + '/tshirtshop.png'} className={classes.img} />
      </div>
      <Menu theme='dark' mode='horizontal' className={classes.menu}>
        <Menu.Item>Department 1</Menu.Item>
        <Menu.Item>Department 2</Menu.Item>
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

export default injectSheet(styles)(PageHeader)