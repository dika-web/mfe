const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const getRemotes = async () => {
    if (!process.env.PRODUCTION_DOMAIN) return {};
    return {
      marketing: `marketing@${process.env.PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`,
    };
  };
  
const remotes = await getRemotes();


const prodConfig = {
    mode: 'production', 
    output: {
        filename:'[name].[contenthash].js',
        publicPath: '/container/latest/',
    }, 
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            ...remotes,
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)


