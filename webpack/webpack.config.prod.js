const {merge} = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
    devServer: {
        port: 3001, 
        historyApiFallback: true,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "all",
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
});