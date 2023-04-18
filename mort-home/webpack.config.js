const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { ModuleFederationPlugin } = require('webpack').container

const path = require('path')

const deps = require('./package.json').dependencies

module.exports = {
  entry: {
    main: './src/ram-main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9001/dist/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            require.resolve('@babel/preset-react', {
              runtime: 'automatic',
            }),
            require.resolve('@babel/preset-typescript'),
          ],
          plugins: [
            require.resolve('@babel/plugin-transform-runtime', {
              useESModules: true,
              regenerator: false,
            }),
            require.resolve('@babel/plugin-transform-react-jsx', {
              runtime: 'automatic',
            }),
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 9001,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new ModuleFederationPlugin({
      name: 'home',
      library: { type: 'system' },
      filename: 'remoteEntry.js',
      exposes: [{ main: './src/ram-main.ts' }],
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps['react'],
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
        'single-spa-react': {
          singleton: true,
          eager: true,
          requiredVersion: deps['single-spa-react'],
        },
        '@tanstack/react-query': {
          singleton: true,
          eager: true,
          requiredVersion: deps['@tanstack/react-query'],
        },
        '"@mui/material': {
          singleton: true,
          eager: true,
          requiredVersion: deps['@mui/material'],
        },
      },
    }),
  ],
}
