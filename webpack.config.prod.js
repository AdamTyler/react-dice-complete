const { resolve } = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './src/ReactDice.js',
  output: {
    filename: 'react-dice-complete.js',
    path: resolve(__dirname, './dist'),
    library: 'ReactDice',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'isomorphic-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
};
