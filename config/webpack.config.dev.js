const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/app.tsx',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'demo'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'source-map-loader' },
      // {
      //   test: /\.(js|jsx)$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-react'],
      //       plugins: ['react-refresh/babel'],
      //     },
      //   },
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
  },
  optimization: {
    moduleIds: 'named',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
}
