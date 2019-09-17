const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  contentScript: path.resolve(__dirname, 'src/content.ts'),
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

const CONTENT_SCRIPT_PLACEHOLDER = '{{CONTENT_SCRIPT_OUT}}';
const CONTENT_SCRIPT_NAME = 'content.js';

module.exports = {
  entry: PATHS.contentScript,
  output: {
    path: PATHS.dist,
    filename: CONTENT_SCRIPT_NAME,
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
      {
        from: './src/manifest.json',
        to: 'manifest.json',
        transform(content) {
          return content.toString().replace(CONTENT_SCRIPT_PLACEHOLDER,
              CONTENT_SCRIPT_NAME);
        }
      },
    ]),
  ],
};
