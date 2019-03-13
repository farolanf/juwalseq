import React, { } from "react"
import { Router } from '@reach/router'

import Layout from "$comp/layout"
import SEO from "$comp/seo"
import Session from '$comp/pages/session'
import Admin from '$comp/pages/admin'
import PasangIklan from '$comp/pages/PasangIklan'

const Page = ({ 
  component, 
  title,
  description,
  keywords, 
  children, 
  ...props 
}) => {
  delete props.path
  return (
    <div>
      <SEO title={title} description={description} keywords={keywords} />
      {React.createElement(component, props, children)}
    </div>
  )
}

const App = () => (
  <Layout>
    <Router>
      <Session path='/session' />
      <Page path='/pasang-iklan' component={PasangIklan} title='Pasang iklan' />
    </Router>
  </Layout>
)

const IndexPage = () => (
  <Router>
    <Admin path='/admin' />
    <App path='/*' />
  </Router>
)

export default IndexPage
