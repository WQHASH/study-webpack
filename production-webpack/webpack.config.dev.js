/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-02 23:05:02
 * @LastEditTime: 2020-05-16 20:56:48
 */

const { resolve } = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 用于抽离html中的style内容到单独的css文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 使用多线程打包
const HappyPack = require('happypack');

module.exports = {
    mode: 'development',
    entry: resolve("./src/index.js"),
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: resolve("./dist"),
        filename: "assets/js/[name].[hash:8].js",
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'happypack/loader',
                    },
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
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: /node_modules/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                exclude: /node_modules/,
                use: 'file-loader',
            }
        ]
    },
    devServer: {
        hot: true,
        port: 3000,
        progress: true,
        contentBase: './build',
        // proxy: {
        //     "/api": {
        //         target: "http://localhost:3000",
        //         pathRewrite: {
        //             "^/api": "",
        //         },
        //     }
        // },

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
        new htmlWebpackPlugin({
            template: resolve('./src/static/index.html'),
            filename: "index.html",
            minify: {
                // 是否把html打包成一行 
                collapseWhitespace: false,
            },
            hash: true,
        }),
        // css抽取插件
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[hash:8].css',
        }),

        // 多线程打包; [适用于项目较大的情况下]
        new HappyPack({
            threads: 4,
            loaders: ['babel-loader']
        }),

        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('development')
        // }),

        // 忽略从moment 中引入 ./locale则会把该文件忽略掉 (*属于优化项)
        // new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale/, /(en|zh-cn)\.js/),
        // webpack自带版本插件
        // new webpack.BannerPlugin("make 2020 wq by"),
        // 热更新 [貌似不用webpack自己也能热更新]
        new webpack.HotModuleReplacementPlugin(),

    ],
}

// "scripts": {
//     "dev": "webpack-dev-server --config ./webpack.config.dev.js --mode development",
//     "build": "webpack --config ./webpack.config.prod.js --mode production"
//   },
// "dev": "cross-env NODE_ENV=development webpack-dev-server --config ./webpack.config.dev.js",
// "build": "cross-env NODE_ENV=production webpack --config ./webpack.config.prod.js"
console.log("process.env.NODE_ENV 的值是(webpack.config.dev.js)："+ process.env.NODE_ENV)
