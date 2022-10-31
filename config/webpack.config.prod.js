const { resolve } = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './src/ReactDice.js',
  output: {
    filename: 'react-dice-complete.js',
    path: resolve(__dirname, '../dist'),
    library: 'ReactDice',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'named',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'react-dice-complete.css',
    }),
  ],
}
