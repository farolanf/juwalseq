const path = require('path')
const { exec } = require('child_process')
const HooksWebpackPlugin = require('webpack-plugin-hooks')

module.exports = {
  mode: 'development',
  target: 'node',
  node: false,
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('tailwindcss')(path.resolve(__dirname, 'tailwind.js')),
                require('cssnano'),
              ]
            }
          }
        ]
      }
    ]
  },
  externals: [
    require('webpack-node-externals')(),
  ],
  plugins: [
    new HooksWebpackPlugin({
      done (stats) {
        if (!stats.errors || !stats.errors.length) {
          exec('node ' + path.resolve(__dirname, './src/build.js'))
        }
      }
    })
  ]
}