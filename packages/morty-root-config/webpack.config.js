const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const deps = require('./package.json').dependencies

module.exports = (webpackConfigEnv, argv) => {
  const orgName = 'morty'

  return {
    entry: './src/morty-root-config',
    cache: false,

    mode: 'development',
    devtool: 'source-map',

    optimization: {
      minimize: false,
    },

    output: {
      publicPath: 'http://localhost:9000/',
    },

    devServer: {
      historyApiFallback: true,
      port: 9000,
    },

    resolve: {
      extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          loader: require.resolve('babel-loader'),
        },
        {
          test: /\.md$/,
          loader: 'raw-loader',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.ejs',
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new ModuleFederationPlugin({
        name: 'root_config',
        library: { type: 'system' },
        filename: 'remoteEntry.js',
        remotes: {
          home: 'home',
          character: 'character',
        },
        exposes: {},
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
          '@tanstack/react-query': {
            singleton: true,
            eager: true,
            requiredVersion: deps['@tanstack/react-query'],
          },
        },
      }),
    ],
  }
}
