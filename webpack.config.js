const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, 'src/App.tsx'),
  src: path.resolve(__dirname, 'src'),
  res: path.resolve(__dirname, 'res'),
  dist: path.resolve(__dirname, 'dist'),
  manifest: path.resolve(__dirname, 'src/manifest.json'),
  contentscript: path.resolve(__dirname, 'src/contentscript.js'),
};

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.dist,
    filename: 'app.js',
  },
  resolve: {
    alias: {'@src': PATHS.src},
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html'),
      inject: true,
    }),
    new CopyWebpackPlugin([
      {context: PATHS.res, from: '*'},
      {from: PATHS.manifest},
      {from: PATHS.contentscript}
    ]),
  ],
  devServer: {
    disableHostCheck: true,
  },
};
