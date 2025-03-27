const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const domain = process.env.PRODUCTION_DOMAIN || 'https://dvqd9jqo4ull0.cloudfront.net'


const prodConfig = {
    mode: 'production',
    output: {
      filename: '[name].[contenthash].js',
      publicPath: '/container/latest/',
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'container',
        remotes : {
          marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
          auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        },
        shared: packageJson.dependencies,
      }),
    ],
  };



module.exports = merge(commonConfig, prodConfig);



