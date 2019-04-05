import React, { } from "react"
import { Router } from '@reach/router'

import Layout from '$comp/Layout'
import SEO from "$comp/SEO"

import NotFound from '$comp/pages/NotFound'
import Admin from '$comp/pages/Admin'
import Session from '$comp/pages/Session'
import FrontPage from '$comp/pages/FrontPage'
import PasangIklan from '$comp/pages/PasangIklan'
import ResetPassword from '$comp/pages/ResetPassword'
import FormDemo from '$comp/pages/demo/FormDemo'

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

const AppRoutes = () => (
  <Router>
    <Page path='/' component={FrontPage} title='Depan' />
    <Page path='/pasang-iklan' component={PasangIklan} title='Pasang iklan' />
    <Page path='/reset-password' component={ResetPassword} title='Reset password' />
    <FormDemo path='/demo/form' />
    <Session path='/session' />
    <NotFound path='/*' />
  </Router>
)

// put Layout in page component on development for hot reload to work on Layout changes
const App = () => process.env.NODE_ENV === 'production' 
  ? <AppRoutes />
  : (
    <Layout>
      <AppRoutes />
    </Layout>
  )

export const Routes = () => (
  <Router>
    <Admin path='/admin' />
    <App path='/*' />
  </Router>
)

export default Routes
