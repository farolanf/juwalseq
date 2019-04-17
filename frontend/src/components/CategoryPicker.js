import React, { useEffect } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'
import useStore from '$useStore'

const CategoryPicker = ({ Component, ...props }) => {
  const { category } = useStore()

  const getCategoryName = id => _.get(category.categories, [id, 'name'], id)

  const sortCategory = (a, b) => _.get(category.categories, [a.id, 'order'], a.id) - _.get(category.categories, [b.id, 'order'], b.id)

  useEffect(() => {
    category.fetchDepartments()
    return reaction(
      () => _.map(category.departments, x => x.id),
      ids => category.fetchCategories(ids)
    )
  }, [])

  return (
    <Component {...props}>
      <option value=''>-- Pilih kategori --</option>
      {category.sortedDepartments.map(department => {
        const departmentName = _.get(category.departments, [department.id, 'name'], department.id)
        return (<React.Fragment key={`department-${department.id}`}>
          <optgroup label={departmentName}>
            {department.categories && department.categories.sort(sortCategory).map(category => (
              <option key={`category-${category.id}`} value={category.id}>{getCategoryName(category.id)}</option>
            ))}
          </optgroup>
        </React.Fragment>)
      })}
    </Component>
  )
}

export default observer(CategoryPicker)