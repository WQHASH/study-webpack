/*
 * @Description:
 * @Author: wangqi
 * @Date: 2020-05-09 09:58:41
 * @LastEditTime: 2020-05-09 10:37:28
 */
const webpack = require("webpack");
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");

let config = require("./webpack.config.js");

let app = express();
let compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));

app.listen(3000, function(){
    console.log('Example app listening on port 3000!\n');
})

