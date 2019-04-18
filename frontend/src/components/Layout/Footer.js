import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import { PREFIX } from '$src/const'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              author
            }
          }
        }
      `}
    >
      {data => (
        <footer className='bg-blue text-white'>
          <div className='container p-8'>
            <div className='flex flex-col md:flex-row'>
              <div className='md:w-1/3'>
              </div>
              <div className='md:w-1/3'>
              </div>
              <div className='text-center md:text-left md:w-1/3 md:order-first'>
                Juwal &copy; {year} {data.site.siteMetadata.author}
              </div>
            </div>
          </div>
        </footer>
      )}
    </StaticQuery>
  )
}

export default Footer