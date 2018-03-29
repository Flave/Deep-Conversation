const path = require('path');


module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.js'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  module: {

    // apply loaders to files that meet given conditions
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        loader: 'babel-loader',
        query: {
          presets: ["es2015"],
          plugins: []
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html?$/,
        include: path.join(__dirname, '/client/src/templates'),
        loader: 'html-loader'
      }
    ],
  },
  devtool: 'source-map',

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};