const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const base = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'index-bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = [
  {
    name: 'dev',
    mode: 'development',
    devtool: 'eval',
    devServer: {
      port: 3000,
      open: true,
      liveReload: true,
      host: '0.0.0.0',
      openPage: 'http://localhost:3000',
    },
    ...base,
  },
  {
    name: 'prod',
    mode: 'production',
    devtool: 'hidden-source-map',
    ...base,
  },
];
