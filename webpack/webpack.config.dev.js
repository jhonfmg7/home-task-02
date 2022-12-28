const {merge} = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
    devServer: {
        port: 3000, 
        historyApiFallback: true,
    },
    devtool: 'inline-source-map',
});