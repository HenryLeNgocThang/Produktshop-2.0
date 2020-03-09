const Path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.json');
const isProduction = process.env.NODE_ENV === 'production';
const isPreproduction = process.env.NODE_ENV === 'preproduction';

module.exports = {
  entry: {
    app: Path.join(__dirname, 'src/entries/app.js'),
    index: Path.join(__dirname, 'src/entries/index.js'),
    purchase: Path.join(__dirname, 'src/entries/purchase.js'),
  },
  output: {
    path: Path.join(__dirname, 'dist'),
    filename: 'assets/js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
        from: Path.resolve(__dirname, 'src/assets/img'),
        to: 'assets/img'
      },
      {
        from: Path.resolve(__dirname, 'src/assets/fonts'),
        to: 'assets/fonts'
      },
      {
        from: Path.resolve(__dirname, 'src/assets/vendor'),
        to: 'assets/vendor'
      }
    ]),
    new HtmlWebpackPlugin({
      config: config,
      chunks: ['app', 'index'],
      template: Path.resolve(__dirname, 'src/pages/index.hbs'),
      minify: {
        collapseWhitespace: isPreproduction ? false : true,
        removeComments: isPreproduction ? false : true,
      },
      assetPath: isProduction || isPreproduction ? config.assetPath : ""
    }),
    new HtmlWebpackPlugin({
      config: config,
      chunks: ['app', 'purchase'],
      template: Path.resolve(__dirname, 'src/pages/purchase.hbs'),
      filename: 'purchase.html',
      minify: {
        collapseWhitespace: isPreproduction ? false : true,
        removeComments: isPreproduction ? false : true,
      },
      assetPath: isProduction || isPreproduction ? config.assetPath : ""
    }),
    new HtmlWebpackPlugin({
      config: config,
      chunks: ['app'],
      template: Path.resolve(__dirname, 'src/pages/impressum.hbs'),
      filename: 'impressum.html',
      minify: {
        collapseWhitespace: isPreproduction ? false : true,
        removeComments: isPreproduction ? false : true,
      },
      assetPath: isProduction || isPreproduction ? config.assetPath : ""
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.hbs$/,
        use: {
          loader: 'handlebars-loader',
          options: {
            partialDirs: [
              Path.join(__dirname, 'src', 'components')
            ]
          }
        }
      }
    ]
  }
};