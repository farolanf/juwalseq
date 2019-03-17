import React, { } from "react"
import { Router } from '@reach/router'

import Layout from '$comp/Layout'
import SEO from "$comp/SEO"
import NotFound from './404'
import Admin from '$comp/pages/Admin'
import Session from '$comp/pages/Session'
import FrontPage from '$comp/pages/FrontPage'
import Search from '$comp/pages/Search'
import PasangIklan from '$comp/pages/PasangIklan'
import Test from '$comp/pages/Test'

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
      <Page path='/search' component={Search} title='Cari' />
      <Page path='/pasang-iklan' component={PasangIklan} title='Pasang iklan' />
      <Page path='/' component={FrontPage} title='Depan' />
      <Test path='/test' />
      <NotFound path='/*' />
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
