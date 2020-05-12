/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-05 21:59:09
 * @LastEditTime: 2020-05-11 19:47:17
 */
let result = require("./base/a.js");
import { square } from "./src/util/calc.js";
// let { calc } = require("./src/util/calc.js");

console.log(result);


/**
 *  __dirname: 目的在于处理不同操作系统的反斜杠问题
 */
const { resolve } = require("path");
console.log(resolve(__dirname, "src/index.js"));
