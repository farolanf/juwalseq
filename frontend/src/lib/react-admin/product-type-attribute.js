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

export const ProductTypeAttributeList = props => (
  <List {...props} sort={{ field: 'ProductTypeId', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source='id' />
      <ReferenceField source="ProductTypeId" reference="ProductTypes" label='Product Type'>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="AttributeId" reference="Attributes">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
)

export const ProductTypeAttributeEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput source="ProductTypeId" reference="ProductTypes">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="AttributeId" reference="Attributes">
        <SelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const ProductTypeAttributeCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="ProductTypeId" reference="ProductTypes">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="AttributeId" reference="Attributes">
        <SelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)