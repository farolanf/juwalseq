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
  FormDataConsumer,
  REDUX_FORM_NAME,
} from 'react-admin'
import { change } from 'redux-form'
import { DumpProps } from '$lib/debug'

// eslint-disable-next-line
const NestedReferenceField = ({ translateChoice, ...props }) => (
  <ReferenceField {...props} />
)

// TODO: fix Attribute column click editing wrong record
export const ProductAttributeList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source='id' />
      <ReferenceField source="ProductId" reference="Products">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="AttributeValueId" reference="AttributeValues" label='Attribute' linkType={false}>
        <NestedReferenceField source="AttributeId" reference="Attributes">
          <TextField source='name' />
        </NestedReferenceField>
      </ReferenceField>
      <ReferenceField source="AttributeValueId" reference="AttributeValues">
        <TextField source="value" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
)

export const ProductAttributeEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput source="ProductId" reference="Products">
        <SelectInput optionText="name" disabled />
      </ReferenceInput>
      <ReferenceInput source="AttributeId" reference="Attributes" label='Attribute'>
          <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput source="AttributeValueId" reference="AttributeValues" label='Attribute'>
        <FormDataConsumer>
          {({ formData, input, choices, dispatch }) => {
            // initialize id
            if (formData) {
              if (!formData.id) {
                const record = choices.find(c => c.attribute_value_id === input.value)
                dispatch(change(REDUX_FORM_NAME, 'id', record.id))
              } else {
                choices = choices.filter(c => c.id === formData.id)
              }
            }
            return <SelectInput source={input.name} choices={choices} optionText='value' />
          }}
        </FormDataConsumer>
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const ProductAttributeCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="ProductId" reference="Products">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="AttributeValueId" reference="AttributeValues">
        <SelectInput optionText="value" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)