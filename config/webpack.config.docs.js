const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../docs'),
    publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
  optimization: {
    moduleIds: 'named',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
    }),
  ],
}
