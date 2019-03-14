/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

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
        $assets: path.resolve(__dirname, 'src/assets'),
        $comp: path.resolve(__dirname, 'src/components'),
        $store: path.resolve(__dirname, 'src/store'),
        $useStore: path.resolve(__dirname, 'src/store/helpers/use-store'),
        $const: path.resolve(__dirname, 'src/const'),
      },
    },
    module: {
      rules: [
        {
          test: /uikit\/.*\.js$/,
          use: 'imports-loader?exports=>undefined,define=>undefined,this=>window',
        }
      ]
    }
  })
}