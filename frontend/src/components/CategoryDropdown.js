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
  })
  
  function handleDepartmentClick (department) {
    navigate(`/?department[]=${department.name}`)
  }

  function handleCategoryClick ({ key }) {
    navigate(key)
  }

  return (
    <div data-uk-dropdown='offset: 0' ref={setRef}>
      <ul className='uk-nav uk-dropdown-nav uk-nav-default uk-nav-parent-icon' data-uk-nav>
        {department.departments.map(department => (
          <li key={department.id} className='uk-parent'>
            <a>{department.name}</a>
            <ul className='uk-nav-sub'>
              {department.Categories.map(category => (
                <li key={category.id}>
                  <a>{category.name}</a>
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