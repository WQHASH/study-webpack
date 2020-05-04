/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-04-30 16:19:13
 * @LastEditTime: 2020-05-02 15:16:01
 */

const { resolve } = require("path");
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩抽离后的js => 注意使用mini-css-extract-plugin插件时,尽管production模式下如果new TerserJSPlugin(); js代码任然不进行压缩
const TerserJSPlugin = require('terser-webpack-plugin');
// 用于抽离html中的style内容到单独的css文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩抽离后的css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // production || development
    mode: 'development',
    entry: resolve('./src/index.js'),
    output: {
        filename: "assets/js/[name].[hash:8].js",
        path: resolve('./dist'),
        // 公共路径, 会在所有请求资源前加上统一的指定路径地址
        publicPath: ""
    },
    /**
     *  loader的执行顺序 默认从下到上 || 从右向左执行 (加载顺序不能乱,可以理解为从大到小加载)
     *   style-loader:  主要用于把css 通过style的形式插入到head的标签中
     *   css-loader:    主要用于识别 @import 这种语法
     */
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    // {
                    //     loader: 'eslint-loader',
                    // },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        },
                        // plugins:[]
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        // loader: 'style-loader'
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'stylus-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
            },
            {
                test: /\.less$/i,
                exclude: /node_modules/,
                use: [
                    {
                        // loader: 'style-loader'
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },

                    {
                        loader: 'less-loader'
                    },
                ]

            },
            {
                test: /\.(jpg|png|jpeg|gif|bmp)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        // 做一个限制，当我们的图片小于2kb的时候，用base64来转换; 否则用file-loader产生真实的图片
                        options: {
                            // 输出正常的图片名称
                            name: "assets/img/[name].[ext]",
                            // limit: 1  // 小于1字节的用base64  [1024byte == 1kb]
                            limit: 1 * 1024,
                            // 公共路径, 会在图片资源前加上统一的指定路径地址
                            publicPath: 'http://127.0.0.1:3000'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './build'
    },
    optimization: {
        minimizer: [
            // 压缩抽取的js
            // new TerserJSPlugin({}),
            // 压缩抽取的css
            // new OptimizeCSSAssetsPlugin({}),
        ],
    },
    plugins: [
        // 清除打包后的dist目录
        new CleanWebpackPlugin(),
        // html打包模板打包
        new HtmlWebpackPlugin({
            template: resolve('./src/static/index.html'),
            filename: "index.html",
            minify: {
                // 把html文件打包成一行
                collapseWhitespace: false,
            },
            hash: true,
        }),
        // css抽取插件
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[hash:8].css',
            // chunkFilename: '[id].css',
            // ignoreOrder: false, // 启用以删除有关顺序冲突的警告  
        }),

        // 全局变量 jquery (相当于每个模块都注入了$) => 当然也可通过模板页面cdn的方式引入
        new Webpack.ProvidePlugin({
            "$": "jquery",
            "window.$": "jquery",
        }),

        // webpack自带版本插件
        new Webpack.BannerPlugin("make 2020 wq by"),

    ],
    // 不需要打包的模块; 但是通过cdn以在模板页面全局引入，模块中也import导入使用，但使用externals不占打包体积
    externals: {
        '$': 'jquery'
    }
}
