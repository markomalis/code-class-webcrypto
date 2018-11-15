require('dotenv-safe').config();

const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

const production = process.env.production

const serverConfig = {
  target: 'node',
  mode: production ? 'production' : 'development',
  watch: !production,
  watchOptions: {
    ignored: ['!./src/server/']
  },
  entry: {
    client: './src/server/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['WS_PORT', 'WS_HOST']),
  ]
}

const clientConfig = {
  target: 'web',
  mode: production ? 'production' : 'development',
  devServer: {
    contentBase: './dist'
  },
  entry: {
    client: './src/client/index.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['WS_PORT', 'WS_HOST']),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Code Class - WebCrypto API',
      template: './src/client/index.html'
    }),
    new VueLoaderPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json']
  },
}

module.exports = [ serverConfig, clientConfig ]