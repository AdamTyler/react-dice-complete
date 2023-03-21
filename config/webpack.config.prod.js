const { resolve } = require('path')

module.exports = {
  mode: 'production',
  entry: './lib/ReactDice.tsx',
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: false,
          },
        },
        exclude: /node_modules/,
      },
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'source-map-loader' },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    moduleIds: 'named',
  },
}
