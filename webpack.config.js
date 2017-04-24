const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
  root: path.join(__dirname),
  app: path.join(__dirname, 'src'),
  main: path.join(__dirname, 'src/index.js'),
  output: path.join(__dirname, 'build')
};

module.exports = {
  context: PATHS.app,
  entry: PATHS.main,
  output: {
    path: PATHS.output,
    filename: 'main.js'
  },

  cache: true,
  devtool: false,
  stats: {
    colors: true,
    reasons: true
  },

  devServer: {
    historyApiFallback: true
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint',
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style','css', 'autoprefixer']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        loader: 'file',
        query: {
          name: 'assets/img/img-[hash:6].[ext]'
				}
      },
      {
        test: /\.ico$/,
        exclude: /node_modules/,
        loader:'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test:   /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          limit: 10000,
          minetype: 'application/font-woff',
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test:   /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: PATHS.root,
      verbose: true
    })
  ]
};