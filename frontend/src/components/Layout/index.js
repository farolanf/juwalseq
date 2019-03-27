import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import SEO from '$comp/SEO'
import Header from './Header'

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
      <div className='uk-container px-0'>
        <SEO title={data.site.siteMetadata.title} />
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
      </div>
    )}
  />
)

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
