const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const isProduction = process.env.NODE_ENV === 'production';
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'production',
  devtool: isProduction ? 'source-map' : 'eval',
  stats: 'errors-only',
  bail: true,
  optimization: {
    minimize: isProduction ? true : false,
  },
  output: {
    filename: isProduction ? 'assets/js/[name].[chunkhash:8].js' : 'assets/js/[name].js',
    chunkFilename: isProduction ? 'assets/js/[name].[chunkhash:8].chunk.js' : 'assets/js/[name].js'
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css'
    })
  ],
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              sassOptions: {
                outputStyle: isProduction ? 'compressed' : 'uncompressed',
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          }
        ],
      }
    ]
  }
});