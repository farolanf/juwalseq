import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { observer } from 'mobx-react-lite'
import { compose } from 'lodash/fp'

import useStore from '$useStore'
import withMobile from '$lib/mobile'

const CategoryDropdown = ({ mobile }) => {
  const { department } = useStore()
  const [ref, setRef] = useState()
  
  useEffect(() => {
    department.fetchDepartments()
  }, [])

  ref && UIkit.dropdown(ref, {
    pos: mobile ? 'bottom-justify' : 'bottom-left',
    boundary: mobile ? '#topbar' : '#category-button',
    boundaryAlign: true,
    delayHide: 50,
  })

  function close () {
    UIkit.dropdown(ref).hide()
  }

  function handleDepartmentClick (department) {
    navigate(`/search?department[]=${department.name}`)
    close()
  }

  function handleCategoryClick (category) {
    navigate(`/search?category[]=${category.name}`)
    close()
  }

  return (
    <div className='uk-dropdown' data-uk-dropdown='offset: 0' ref={setRef}>
      <ul className='uk-nav uk-dropdown-nav uk-nav-default uk-nav-parent-icon' data-uk-nav>
        {department.departments.map(department => (
          <li key={department.id} className='uk-parent'>
            <a>{department.name}</a>
            <ul className='uk-nav-sub'>
              <li>
                <a onClick={() => handleDepartmentClick(department)}>
                  Semua
                </a>
              </li>
              {department.Categories.map(category => (
                <li key={category.id}>
                  <a onClick={() => handleCategoryClick(category)}>{category.name}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default compose(
  withMobile,
  observer,
)(CategoryDropdown)