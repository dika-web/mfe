const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');


const prodConfig = {
    mode: 'production', 
    output: {
        filename:'[name].[contenthash].js',
        publicPath:'/container/latest/'
    }, 
    plugins: [
        new webpack.EnvironmentPlugin(['PRODUCTION_DOMAIN']),
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${process.env.PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)


