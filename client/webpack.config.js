const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.*\.js$/,
        loader: 'react-hot-loader/webpack',
      },
      {
        test: /.*\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      hash: true,
      template: './src/index.html'
    }),
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    host: '0.0.0.0',
    disableHostCheck: true
  }
}