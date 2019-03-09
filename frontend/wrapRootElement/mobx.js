import React from 'react'
import { Provider } from 'mobx-react'
import store from '$store'

const wrapRootElement = element => (
  <Provider store={store}>
    {element}
  </Provider>
)

export default wrapRootElement