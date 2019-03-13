import React from 'react'
import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  NumberField,
  TextInput,
  LongTextInput,
  NumberInput,
  ImageInput,
  DisabledInput,
} from 'react-admin'
import ImageField from './image-field'

export const ProductTypeList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
    </Datagrid>
  </List>
)

export const ProductTypeEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <LongTextInput source="description" />
    </SimpleForm>
  </Edit>
)

export const ProductTypeCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <LongTextInput source="description" />
    </SimpleForm>
  </Create>
)