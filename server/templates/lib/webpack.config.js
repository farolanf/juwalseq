const path = require('path')

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
}