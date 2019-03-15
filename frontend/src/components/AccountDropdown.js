import React, { useState } from 'react'
import { Link } from 'gatsby'
import { logout } from "$lib/auth";

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

export default AccountDropdown