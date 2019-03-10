import React from 'react'
import { observer, inject } from 'mobx-react'

const Test = ({ store }) => (
  <div>Hello {store.user.user}</div>
)

export default inject('store')(observer(Test))