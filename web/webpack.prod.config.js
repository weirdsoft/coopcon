/* eslint-env node */
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const config = require('./webpack.base.config')

config.plugins[1].options.includeGTM = true

module.exports = merge.smart(config, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
  },
  plugins: [ new CleanWebpackPlugin([ 'dist/' ]) ],
})
