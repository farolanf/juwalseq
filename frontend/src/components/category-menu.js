import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'

import { observer } from 'mobx-react-lite'
import { Menu } from 'antd'

import useStore from '$useStore'

const CategoryMenu = () => {
  const { department } = useStore()
  
  useEffect(() => {
    department.fetchDepartments()
  }, [])
  
  function handleDepartmentClick (department) {
    navigate(`/browse/${department.name}`)
  }

  function handleCategoryClick ({ key }) {
    navigate(key)
  }

  return (
    <Menu onClick={handleCategoryClick}>
      {department.departments && department.departments.map(department => (
        <Menu.SubMenu 
          key={department.id} 
          title={department.name} 
          onTitleClick={() => handleDepartmentClick(department)}
        >
          {department.Categories.map(category => (
            <Menu.Item 
              key={`/browse/${department.name}/${category.name}`}
            >
              {category.name}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  )
}

export default observer(CategoryMenu)