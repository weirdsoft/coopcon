/* eslint-env node */
const webpack = require('webpack')
const config = require('./webpack.base.config')

config.mode = 'production'
config.output.filename = '[name].[chunkhash].js',
config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es/))

module.exports = config
