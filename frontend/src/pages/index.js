import React, { } from "react"
import { Router } from '@reach/router'

import Layout from "$comp/layout"
import SEO from "$comp/seo"
import Session from '$comp/pages/session'
import Admin from '$comp/pages/admin'
// import Search from '$comp/pages/search'
// import Browse from '$con/browse'
// import Cart from '$con/cart'
// import ProductDetail from '$con/product-detail'
// import Profile from '$con/profile'
// import Checkout from '$con/checkout'
// import CheckoutComplete from '$con/checkout-complete'

const App = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Router>
      <Session path='/session' />
      {/* <Search path='/search' /> */}
    </Router>
    {/* <Router>
      <Browse path='/' />
      <Browse path='/browse/*' />
      <Cart path='/cart' />
      <ProductDetail path='/products/:product_id' />
      <Profile path='/profile' />
      <Checkout path='/checkout' />
      <CheckoutComplete path='/checkout-complete' />
    </Router> */}
  </Layout>
)

const Page = () => (
  <Router>
    <Admin path='/admin' />
    <App path='/*' />
  </Router>
)

export default Page
