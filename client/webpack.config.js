const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Add HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E. Text Editor'
      }),
      // Add WebpackPwaManifest
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'J.A.T.E. Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Simple text editor',
        background_color: '#F1F3F5',
        theme_color: '#243758',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            scr: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      // Add InjectManifest
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw,js',
      }),
    ],

    module: {
      rules: [
        //Adding CSS Loader Module
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        // Adding Babel Module
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
