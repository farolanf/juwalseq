const path = require('path')

const env = process.env.NODE_ENV || 'development'
require('dotenv').config({
  path: path.resolve(__dirname, './.env.' + env)
})

module.exports = {
  siteMetadata: {
    title: `Juwal`,
    description: `Iklan gratis`,
    author: `Farolan Faisal`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: path.resolve(__dirname, './src/typography')
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require('postcss-import'),
          require('postcss-mixins'),
          require('postcss-for'),
          require('postcss-simple-vars'),
          require('tailwindcss')('./tailwind.js'),
          require('postcss-nested')({
            bubble: ['screen'],
          }),
          require('autoprefixer'),
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        //icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
}

if (process.env.GATSBY_PATH_PREFIX) {
  module.exports.pathPrefix = process.env.GATSBY_PATH_PREFIX
}
