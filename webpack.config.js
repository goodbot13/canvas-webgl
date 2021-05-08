var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      }
    ]
  }
};