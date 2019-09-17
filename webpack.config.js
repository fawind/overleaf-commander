const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  entry: path.resolve(__dirname, 'src/main.ts'),
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

const MAIN_JS_PLACEHOLDER = '{{MAIN_JS_OUT}}';
const OUT_ENTRY_FILE = 'main.js';

module.exports = {
  entry: PATHS.entry,
  output: {
    path: PATHS.dist,
    filename: OUT_ENTRY_FILE,
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
    new CopyWebpackPlugin([
      {
        from: './src/manifest.json',
        to: 'manifest.json',
        transform(content) {
          return content.toString().replace(MAIN_JS_PLACEHOLDER,
              OUT_ENTRY_FILE);
        }
      },
    ]),
  ],
};
