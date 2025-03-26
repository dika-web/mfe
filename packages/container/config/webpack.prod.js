const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const domain = process.env.PRODUCTION_DOMAIN;

console.log('🚀 PRODUCTION_DOMAIN:', process.env.PRODUCTION_DOMAIN);
console.log('🚀 PRODUCTION_DOMAIN:', domain);




const prodConfig = {
    mode: 'production', 
    output: {
        filename:'[name].[contenthash].js',
        publicPath:'/container/latest/'
    }, 
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)


