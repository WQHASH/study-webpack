/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-05 22:06:50
 * @LastEditTime: 2020-05-09 10:21:33
 */
const { resolve } = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 'production' || 'development'
    mode:"production",
    entry: resolve("./index.js"),
    output: {
        path: resolve("./dist"),
        filename: "[name].js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "./src/static/index.html"),
            filename: "index.html",
        }),
    ]
}
