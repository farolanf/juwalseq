import React, { } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/browse/regional'>Regional</Link></li>
      <li><Link to='/browse/regional/french'>Regional - French</Link></li>
    </ul>
  </Layout>
)

export default IndexPage
