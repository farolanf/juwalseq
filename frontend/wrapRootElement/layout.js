import React from 'react'
import Layout from '$comp/Layout'

const wrapRootElement = element => (
  <Layout>
    {element}
  </Layout>
)

export default wrapRootElement