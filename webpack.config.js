const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    output: {
        path: path.join(__dirname, "/dist"), 
        filename: "build.js", 
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "public/index.html", 
        }),
    ],
    devServer: {
        port: 3000, 
    },
    entry: './src/index.js',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$|jsx/, 
                exclude: /node_modules/, 
                use: {
                loader: "babel-loader",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/, 
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: "url-loader",
                options: { limit: false },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};