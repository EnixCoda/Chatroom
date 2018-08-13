const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /.*\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['react']
        },
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
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
