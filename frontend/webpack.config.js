const path = require('path');
const environment = process.env.NODE_ENV || 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'js/app': ['./src/App.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      AppConfig: path.join(__dirname, `/src/config/_${environment}.js`)
    }
  },
};
