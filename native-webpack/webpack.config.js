/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-05 22:06:50
 * @LastEditTime: 2020-05-05 22:11:20
 */
const { resolve } = require("path");
module.exports = {
    entry: resolve("./index.js"),
    output: {
        path: resolve("./dist"),
        filename: "[name].js",
    }
}
