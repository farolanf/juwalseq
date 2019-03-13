import React from 'react'
import { Field } from 'redux-form'
import { Query } from 'react-admin'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

const MuiSelect = ({ label, input, children }) => (
  <FormControl margin='normal'>
    <InputLabel>{label}</InputLabel>
    <NativeSelect {...input}>
      {children}
    </NativeSelect>
  </FormControl>
)

class CategorySelectInput extends React.Component {
  render () {
    const { source, label } = this.props
    return (
      <Field name={source} label={label} component={MuiSelect}>
        <Query type='GET_LIST' resource='Departments' payload={{
          pagination: { perPage: 100 },
          sort: { field: 'name', order: 'ASC' },
        }}>
          {({ data }) => data && data.map(department => (
            <optgroup label={department.name} key={department.id}>
              <Query type='GET_LIST' resource='Categories' payload={{
                query: {
                  Department__id: department.id
                },
                pagination: { perPage: 100 },
                sort: { field: 'order', order: 'ASC' },
              }}>
                {({ data }) => data && data.map(category => (
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))}
              </Query>
            </optgroup>
          ))}
        </Query>
      </Field>
    ) 
  }
}

export default CategorySelectInput