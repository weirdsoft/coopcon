/* eslint-env node */
const webpack = require('webpack')
const path = require('path')
const config = require('./webpack.base.config')

config.devtool = 'inline-source-map'
config.devServer = {
  hotOnly: true,
  contentBase: path.resolve(__dirname, 'src'),
  historyApiFallback: true,
  host: '0.0.0.0',
  disableHostCheck: true,
  port: '80',
  publicPath: '/',
}
config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config
