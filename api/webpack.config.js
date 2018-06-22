const { resolve }  = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require( 'nodemon-webpack-plugin' ) // Ding

module.exports = {
  entry: resolve(__dirname, 'src', 'server'),
  target: 'node',
  externals: [ nodeExternals() ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: [ '.js' ],
  },
  plugins: [
    new NodemonPlugin(),
  ],
}
