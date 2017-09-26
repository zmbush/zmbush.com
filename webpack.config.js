const path = require('path');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

module.exports = {
  entry: {
    "fake-shell": './apps/fake-shell.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '_source/_assets/webpack'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ["node_modules", "apps"],
    plugins: [
      new DirectoryNamedWebpackPlugin(true),
    ]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: ['transform-class-properties'],
        }
      }
    }],
  }
};
