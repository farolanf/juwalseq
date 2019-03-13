import React from 'react'
import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  ReferenceField,
  SelectInput,
  ReferenceInput,
  EditButton,
} from 'react-admin'
import CategorySelectInput from './category-select-input'

export const ProductTypeCategoryList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
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
      <ReferenceInput source="ProductTypeId" reference="ProductTypes">
        <SelectInput optionText="name" disabled />
      </ReferenceInput>
      <ReferenceInput source="CategoryId" reference="Categories">
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
      <ReferenceInput source="CategoryId" reference="Categories">
        <CategorySelectInput />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)