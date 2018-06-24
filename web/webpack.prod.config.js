/* eslint-env node */
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require('webpack-merge')
const config = require('./webpack.base.config')

// use GTM on the HTML template
config.plugins[0].options.includeGTM = true

// replace the styles loader to extract css on their own files
config.module.rules[1].use[0] = 'mini-css-extract-plugin/dist/loader'
config.module.rules[2].use[0] = 'mini-css-extract-plugin/dist/loader'

module.exports = merge.smart(config, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new CleanWebpackPlugin([ 'dist/' ]) ,
  ],
})
