/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-05 21:59:09
 * @LastEditTime: 2020-05-13 16:39:30
 */
let result = require("./base/a.js");
import { square } from "./src/util/calc.js";
// let { square } = require("./src/util/calc.js");

/**
 *  import { square, cube } from  "";  和 let { square } = require(); 的区别
 *      
 *      import导入的则分为：
 *          两种情况 'production' || 'development'  
 *             development：项目中所有代码能会被进行打包, square, cube方法体都会被打包, 但是导出使用的只有export部分
 *             production： 项目中如果只是 导入模块，但是没使用模块， square, cube模块不会被打包;
 *                          但如果只要使用了其中一个, 则该路径下的所有属性都会被打包，但是导出使用的只有export部分;
 * 
 *      require(): 方式只要使用, 拿到的对象为 module.exports导出的属性
 * 
 *      小结：
 *              网上所说的Es6模块特性（tree shaking ） 可以安全地删除文件中未使用的部分，根据测试分析貌似和预期的不同!!
 *              或者说未使用的部分,如模块中  import { square, cube } from  "" 只是单纯引用，没有后续操作了（前提是production模式）
 *      
 */

// console.log(cube)
// console.log(square)


/**
 *  __dirname: 目的在于处理不同操作系统的反斜杠问题
 */
const { resolve } = require("path");
console.log(resolve(__dirname, "src/index.js"));
