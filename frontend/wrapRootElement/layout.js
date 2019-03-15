import 'uikit/dist/css/uikit.min.css'
import '$assets/css/tailwind.css'
import '$assets/css/global.css'
import React from 'react'
import Layout from '$comp/Layout'

const wrapRootElement = element => (
  <Layout>
    {element}
  </Layout>
)

export default wrapRootElement