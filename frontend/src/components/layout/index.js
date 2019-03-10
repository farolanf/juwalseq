import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { Layout } from 'antd'

import Header from './header'

const { Content, Footer, Sider } = Layout

const PageLayout = ({ children }) => (
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
      <Layout>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Layout>
          <Sider></Sider>
          <Content>{children}</Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    )}
  />
)

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
