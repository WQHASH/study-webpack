/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-02 16:08:02
 * @LastEditTime: 2020-05-02 16:47:32
 */
const express = require('express');
const app = express();
const webpack = require('webpack');

// 中间件
const middle = require('webpack-dev-middleware');
let config = require("./webpack.config.js");
let compiler = webpack(config);

app.use(middle(compiler));

app.get('/user', (req, res) => {
    res.json({ "name": "hello word!" });
});
app.listen(3000);

