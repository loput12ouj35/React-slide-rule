const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const base = {
  entry: ['@babel/polyfill', './src/index.jsx', './src/sass/index.scss'],
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
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
    new MiniCssExtractPlugin({ filename: 'style.css' }),
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
