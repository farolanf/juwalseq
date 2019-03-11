import React from 'react'
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin'
import dataProvider from '$src/lib/react-admin/data-provider'
import authProvider from '$src/lib/react-admin/auth-provider'
import {
  DepartmentList,
  DepartmentEdit,
  DepartmentCreate
} from '$src/lib/react-admin/department'
import {
  CategoryList,
  CategoryEdit,
  CategoryCreate
} from '$src/lib/react-admin/category'
import {
  ProductCategoryList,
  ProductCategoryEdit,
  ProductCategoryCreate
} from '$src/lib/react-admin/product-category'
import {
  ProductList,
  ProductEdit,
  ProductCreate
} from '$src/lib/react-admin/product'
import {
  ProductAttributeList,
  ProductAttributeEdit,
  ProductAttributeCreate
} from '$src/lib/react-admin/product-attribute'
import {
  AttributeList,
  AttributeEdit,
  AttributeCreate
} from '$src/lib/react-admin/attribute'
import {
  AttributeValueList,
  AttributeValueEdit,
  AttributeValueCreate
} from '$src/lib/react-admin/attribute-value'

const Page = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name='Departments'
      list={DepartmentList}
      edit={DepartmentEdit}
      create={DepartmentCreate}
    />
    <Resource
      name='Categories'
      list={CategoryList}
      edit={CategoryEdit}
      create={CategoryCreate}
    />
    <Resource
      name='ProductCategories'
      list={ProductCategoryList}
      edit={ProductCategoryEdit}
      create={ProductCategoryCreate}
      options={{ label: 'Product Categories' }}
    />
    <Resource
      name='Products'
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
    <Resource
      name='ProductAttributes'
      list={ProductAttributeList}
      edit={ProductAttributeEdit}
      create={ProductAttributeCreate}
      options={{ label: 'Product Attributes' }}
    />
    <Resource
      name='Attributes'
      list={AttributeList}
      edit={AttributeEdit}
      create={AttributeCreate}
    />
    <Resource
      name='AttributeValues'
      list={AttributeValueList}
      edit={AttributeValueEdit}
      create={AttributeValueCreate}
      options={{ label: 'Attribute Values' }}
    />
  </Admin>
)

export default Page
