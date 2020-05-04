/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-04-30 16:19:13
 * @LastEditTime: 2020-04-30 16:22:28
 */

let { resolve } = require("path");

module.exports = {
    mode: 'development',
    entry: resolve('./src/index.js'),
    output: {
        filename: "bundle.js",
        path: resolve('./dist')
    }
}
