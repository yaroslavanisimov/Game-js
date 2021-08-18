
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: '.src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.[chunkhash].js'
    },
    devServer: {
        port: 8888
    },
    devTool: 'source-map',
    plugins: [
        new HTMLWebpackPlugin ({
            template: './src/index.html'
        // object into html file
        }),
        new CleanWebpackPlugin()
        // bundle file refresh constantly
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.s[ca]ss$/i,
                use: ['style-loader','css-loader']
            }
        ]
    } 
}