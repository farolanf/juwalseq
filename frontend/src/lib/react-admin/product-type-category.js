import React from 'react'
import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  ReferenceField,
  DisabledInput,
  SelectInput,
  ReferenceInput,
  EditButton,
} from 'react-admin'
import CategorySelectInput from './category-select-input'

export const ProductTypeCategoryList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="ProductTypeId" reference="ProductTypes" label='Product Type'>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="CategoryId" reference="Categories">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
)

export const ProductTypeCategoryEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput source="ProductTypeId" reference="ProductTypes">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="CategoryId" reference="Categories" label='Category'>
        <CategorySelectInput />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const ProductTypeCategoryCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="ProductTypeId" reference="ProductTypes">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="CategoryId" reference="Categories" label='Category'>
        <CategorySelectInput />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)