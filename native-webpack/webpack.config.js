/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-05 22:06:50
 * @LastEditTime: 2020-05-11 09:47:58
 */
const { resolve } = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩抽离后的js => 注意使用mini-css-extract-plugin插件时,尽管production模式下如果new TerserJSPlugin(); js代码任然不进行压缩
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    // 'production' || 'development'
    mode: "development",
    entry: resolve("./index.js"),
    output: {
        path: resolve("./dist"),
        filename: "[name].js",
    },
    optimization: {
        minimizer: [
            // 压缩抽取的js
            new TerserJSPlugin({}),
        ]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                    // plugins:[]
                }
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "./src/static/index.html"),
            filename: "index.html",
        }),
    ]
}
