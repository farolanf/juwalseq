import React, { useState } from "react"
import { Router } from '@reach/router'

import Guard from '$comp/Guard'
import Layout from '$comp/Layout'
import SEO from "$comp/SEO"

import NotFound from '$comp/pages/NotFound'
import Admin from '$comp/pages/Admin'
import Session from '$comp/pages/Session'
import FrontPage from '$comp/pages/FrontPage'
import PasangIklan from '$comp/pages/PasangIklan'
import Search from '$comp/pages/Search'
import ResetPassword from '$comp/pages/ResetPassword'
import FormDemo from '$comp/pages/demo/FormDemo'


const Page = ({ 
  component, 
  title,
  description,
  keywords, 
  role,
  message,
  children, 
  ...props 
}) => {
  delete props.path
  return (
    <Guard role={role} message={message}>
      <SEO title={title} description={description} keywords={keywords} />
      {React.createElement(component, props, children)}
    </Guard>
  )
}

const AppRoutes = () => (
  <Router>
    <Page path='/' component={FrontPage} title='Depan' />
    <Page path='/pasang-iklan' component={PasangIklan} title='Pasang iklan' role='member' />
    <Page path='/reset-password' component={ResetPassword} title='Reset password' />
    <Page path='/search' component={Search} title='Cari' />
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

const AdminWrapper = () => {
  const [init, setInit] = useState()

  if (!init) {
    const els = document.head.querySelectorAll('style,link')
    els && els.forEach(el => el.parentNode && el.parentNode.removeChild(el))
    setInit(true)
  }

  return (
    <div>
      <SEO title='Admin' />
      <Admin />
    </div>
  )
}

export const Routes = () => (
  <Router>
    <AdminWrapper path='/admin' />
    <App path='/*' />
  </Router>
)

export default Routes
