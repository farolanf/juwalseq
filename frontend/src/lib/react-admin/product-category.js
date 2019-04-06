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
import ImageField from './image-field'

export const ProductCategoryList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <ReferenceField source="ProductId" reference="Products" label='Product name'>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="ProductId" reference="Products" label='Thumbnail' sortable={false}>
        <ImageField source="thumbnail"  />
      </ReferenceField>
      <ReferenceField source="CategoryId" reference="Categories">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
)

export const ProductCategoryEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput source="ProductId" reference="Products">
        <SelectInput optionText="name" disabled />
      </ReferenceInput>
      <ReferenceInput source="CategoryId" reference="Categories">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const ProductCategoryCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="ProductId" reference="Products">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="CategoryId" reference="Categories">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)