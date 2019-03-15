import React, { } from "react"
import { Router } from '@reach/router'

import SEO from "$comp/SEO"
import Session from '$comp/pages/Session'
import Admin from '$comp/pages/Admin'
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
  <Router>
    <Session path='/session' />
    <Page path='/pasang-iklan' component={PasangIklan} title='Pasang iklan' />
  </Router>
)

const IndexPage = () => (
  <Router>
    <Admin path='/admin' />
    <App path='/*' />
  </Router>
)

export default IndexPage
