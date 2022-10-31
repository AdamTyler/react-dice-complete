const { resolve } = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/App.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'demo'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  // devServer: {
  //   hot: true,
  //   contentBase: resolve(__dirname, 'dist'),
  //   publicPath: '/',
  //   port: 8080,
  // },
  optimization: {
    moduleIds: 'named',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
