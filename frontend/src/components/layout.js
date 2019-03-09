import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { Layout as AntLayout } from 'antd'

const { Header, Content, Footer, Sider } = AntLayout

// import Header from "$comp/header"
// import Footer from "$comp/footer"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
    render={data => (
      <AntLayout>
        <Header>
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        </Header>
        <AntLayout>
          <Sider></Sider>
          <Content>{children}</Content>
        </AntLayout>
        <Footer></Footer>
      </AntLayout>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
