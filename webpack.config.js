// Standard Webpack Configuration
// 01-17-2016

// webpack module
const webpack = require('webpack');
// path module used to resolve absolute paths
const path = require('path');
// cleans the bundled directory between builds
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
  root: path.join(__dirname),
  app: path.join(__dirname, 'src'),
  main: path.join(__dirname, 'src/index.js'),
  output: path.join(__dirname, 'build')
};

module.exports = {
  // webpack will only compile the main javascript file
  // entry points to the path of the main js file, here called 'index'
  context: PATHS.app,
  entry: PATHS.main,
  output: {
    // where the compiled & packed file will be saved
    path: PATHS.output,
    // what the compiled & packed file will be named
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
    // linter run before packing
    // test uses regular expressions to match files
    preLoaders: [
      {
        // lints all javascript
        test: /\.js$/,
        // excludes node modules from the linting process
        exclude: /node_modules/,
        loader: 'jshint',
      }
    ],
    // loaders compile and pack different files
    // test uses regular expressions to match files
    loaders: [
      // compile all javascript files using the babel-loader module
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        // preset determine which babel libraries to use
        query: {
          presets: ['es2015', 'react']
        }
      },
      // add HTML assets to the build folder
			// used to ensure index.html is carried through the build
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      // compile sass files using the sass-loader module
      // stored in the compiled javascript file
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      },
      // compile css files using the css-loader module
      // stored in the compiled javascript file
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style','css', 'autoprefixer']
      },
      // compile local images
      // hash file names to prevent cacheing
      // copy into 'img' sub-directory
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        loader: 'file',
        query: {
          name: 'assets/img/img-[hash:6].[ext]'
				}
      },
      // add favicon to build
      {
        test: /\.ico$/,
        exclude: /node_modules/,
        loader:'file',
        query: {
          name: '[name].[ext]'
        }
      },
      // compile local font files
      // hash file names to prevent cacheing
      // copy into 'font' sub-directory
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