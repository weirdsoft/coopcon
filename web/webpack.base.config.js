/* eslint-env node */
const webpack = require('webpack')
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
			'bulma/bulma.sass',
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
        test: /\.s?[ca]ss$/,
				include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.s?[ca]ss$/,
        exclude: /node_modules/,
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
