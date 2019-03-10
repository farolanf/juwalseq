import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Layout } from 'antd'
const { Content } = Layout

import Header from './header'

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
          <Content>{children}</Content>
        </Layout>
      </Layout>
    )}
  />
)

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
