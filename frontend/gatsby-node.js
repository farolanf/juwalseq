/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const webpack = require('webpack')

exports.onCreatePage = ({ page }) => {
  if (page.jsonName === 'index') {
    page.matchPath = '/*'
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  const config = {
    resolve: {
      alias: {
        $prj: path.resolve(__dirname),
        $src: path.resolve(__dirname, 'src'),
        $lib: path.resolve(__dirname, 'src/lib'),
        $api: path.resolve(__dirname, 'src/api'),
        $assets: path.resolve(__dirname, 'src/assets'),
        $comp: path.resolve(__dirname, 'src/components'),
        $store: path.resolve(__dirname, 'src/store'),
        $useStore: path.resolve(__dirname, 'src/store/helpers/use-store'),
        $const: path.resolve(__dirname, 'src/const'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
        cn: 'classnames',
      })
    ]
  }
  if (stage === 'build-html') {
    config.module = {
      rules: [
        {
          test: /react-dragula|react-file-drop/,
          use: loaders.null(),
        },
      ]
    }
  }
  actions.setWebpackConfig(config)
}