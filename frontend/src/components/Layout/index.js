import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.js'
import 'uikit/dist/js/uikit-icons.js'
import '$assets/css/tailwind.css'
import '$assets/css/global.css'
import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

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
        <Header siteTitle={data.site.siteMetadata.title} />
      </div>
    )}
  />
)

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
