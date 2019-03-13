import React from 'react'
import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  ReferenceField,
  TextInput,
  LongTextInput,
  SelectInput,
  DisabledInput,
  ReferenceInput
} from 'react-admin'
import OrderSelect from './OrderSelect'

export const CategoryList = props => (
  <List {...props} sort={{ field: 'DepartmentId', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="DepartmentId" reference="Departments">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="description" />
      <OrderSelect source='order' />
    </Datagrid>
  </List>
)

export const CategoryEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput source="DepartmentId" reference="Departments">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <LongTextInput source="description" />
    </SimpleForm>
  </Edit>
)

export const CategoryCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="DepartmentId" reference="Departments">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <LongTextInput source="description" />
    </SimpleForm>
  </Create>
)