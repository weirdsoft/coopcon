/* eslint-env node */
const webpack = require('webpack')
const { resolve } = require('path')
const config = require('./webpack.base.config')

config.mode = 'development'
config.devtool = 'eval-source-map'
config.devServer = {
  hotOnly: true,
  contentBase: resolve(__dirname, 'src'),
  historyApiFallback: true,
  host: '0.0.0.0',
  disableHostCheck: true,
  port: '80',
  publicPath: '/',
}
config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config
