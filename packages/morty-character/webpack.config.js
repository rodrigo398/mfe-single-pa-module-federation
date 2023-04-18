const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { ModuleFederationPlugin } = require('webpack').container

const path = require('path')

const deps = require('./package.json').dependencies

module.exports = {
  entry: {
    main: './src/ram-character.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9002/dist/',
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
  optimization: {
    minimize: false,
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 9002,
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
      name: 'character',
      library: { type: 'system' },
      filename: 'remoteEntry.js',
      exposes: [{ main: './src/ram-character.ts' }],
      remotes: {
        home: 'home',
      },
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
