/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-02 10:16:34
 * @LastEditTime: 2020-05-03 21:44:18
 */

const { resolve } = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 压缩抽离后的js => 注意使用mini-css-extract-plugin插件时,尽管production模式下如果new TerserJSPlugin(); js代码任然不进行压缩
const TerserJSPlugin = require('terser-webpack-plugin');
// 用于抽离html中的style内容到单独的css文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩抽离后的css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//拷贝插件
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // development || production
    mode: 'development',
    // source-map:      增加单独的 .map 映射文件, 出错会标识当前报错的列和行; 大而全
    // eval-source-map: 不会生成单独的 .map 映射文件，但是可显示报错的行和列;
    // cheap-module-source-map  增加单独的 .map 映射文件， 出错会标识当前报错的位置
    // cheap-module-eval-source-map  不会生成单独的 .map 映射文件，但是可显示当前报错的位置;
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'index': resolve('./src/index.js'),
    },
    output: {
        filename: 'assets/js/[name].[hash:8].js',
        path: resolve('./dist/'),
        publicPath: ''
    },
    module: {
        rules: [
            {
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
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            }

        ]
    },
    optimization: {
        minimizer: [
            // 压缩抽取的js
            new TerserJSPlugin({}),
            // 压缩抽取的css
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    devServer: {
        // === 前端处理 ===
        // port: 8089,
        // proxy: {
        //     "/api": {
        //         target: "http://localhost:3000",
        //         pathRewrite: {
        //             "^/api": "",
        //         },
        //     }
        // },

        // === 后端处理 ===
    },

    resolve: {
        // 指定解析的第三方包
        modules: [resolve('node_modules')],
        // 省略引用文件的后缀名，可按配置规则以此查找
        extensions: [".js", ".css", ".json", ".vue"],
        // 指定引用包的别名
        alias: {
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('./src/static/index.html'),
            filename: 'index.html',
            inject: true,
        }),
        // css抽取插件
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[hash:8].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // 启用以删除有关顺序冲突的警告  
        }),
        
        // 拷贝插件
        // new CopyPlugin([{
        //     from: './doc', to: './doc'
        // }]),

        // webpack自带版本插件, 只要是打包的文件其头部都会加上该标识
        new Webpack.BannerPlugin("make 2020 wq by"),

        new Webpack.ProvidePlugin({
            "$": "jquery",
            "window.$": "jquery",
            "jQuery": "jquery"
        }),

    ],
}
