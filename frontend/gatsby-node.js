/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const ReactJssHmrPlugin = require('react-jss-hmr/webpack')

exports.onCreatePage = ({ page }) => {
  if (page.jsonName === 'index') {
    page.matchPath = '/*'
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        $prj: path.resolve(__dirname),
        $src: path.resolve(__dirname, 'src'),
        $lib: path.resolve(__dirname, 'src/lib'),
        $comp: path.resolve(__dirname, 'src/components'),
        $store: path.resolve(__dirname, 'src/store'),
      },
      plugins: [
        new ReactJssHmrPlugin(),
      ]
    }
  })
}