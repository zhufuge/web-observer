const { resolve } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: __dirname + '/app/index.jsx',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'extension/lib'),
    publicPath: '/',
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'moment': 'moment',
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: 'css-loader',
      })
    }]
  },

  devServer: {
    contentBase: resolve(__dirname, 'extension'),
    publicPath: '/',
    port: 3000,
    compress: true,
  },

  plugins: [
    new ExtractTextPlugin('index.css'),
  ]
}
