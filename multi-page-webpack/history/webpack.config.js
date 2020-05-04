/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-02 10:16:34
 * @LastEditTime: 2020-05-02 11:19:40
 */

const { resolve } = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'index': resolve('./src/page/index/index.js'),
        'other': resolve('./src/page/other/index.js'),
    },
    output: {
        filename: 'assets/js/[name].[hash:8].js',
        path: resolve('./dist/'),
        publicPath: '',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('./src/static/index.html'),
            filename: 'index.html',
            inject: true,
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: resolve('./src/static/index.html'),
            filename: 'other.html',
            inject: true,
            chunks: ['index', 'other'],
        }),
    ],
}
