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
        pathToConfigModule: path.resolve(__dirname, './src/typography'),
        omitGoogleFont: true,
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require('postcss-import'),
          require('postcss-mixins'),
          require('postcss-simple-vars'),
          require('postcss-for'),
          require('tailwindcss')('./tailwind.js'),
          require('postcss-nested')({
            bubble: ['screen'],
          }),
          require('autoprefixer'),
        ]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Juwal`,
        short_name: `Juwal`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/assets/icons/icon.png`, // This path is relative to the root of the site.
        cache_busting_mode: `name`,
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
