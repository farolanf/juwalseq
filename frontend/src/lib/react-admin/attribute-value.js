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
  SelectInput,
  DisabledInput,
  ReferenceInput,
  EditButton,
} from 'react-admin'

export const AttributeValueList = props => (
  <List {...props} sort={{ field: 'AttributeId', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="AttributeId" reference="Attributes">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="value" />
      <EditButton />
    </Datagrid>
  </List>
)

export const AttributeValueEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput source="AttributeId" reference="Attributes">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="value" />
    </SimpleForm>
  </Edit>
)

export const AttributeValueCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="AttributeId" reference="Attributes">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="value" />
    </SimpleForm>
  </Create>
)