/* eslint-env node */
const webpack = require('webpack')
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      resolve(__dirname, 'src', 'index.jsx'),
    ],
  },

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /.s?[ca]ss$/,
        include: /-global/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /.s?[ca]ss$/,
        exclude: /-global/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[local]--[hash:base64]',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },

  resolve: {
    modules: [
      resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: [ '.js', '.jsx' ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks(module) {
       return module.context && module.context.indexOf('node_modules') !== -1
      },
    }),
    new CopyWebpackPlugin([
      { from: resolve(__dirname, 'src', 'index.html') },
    ]),
  ],
}
