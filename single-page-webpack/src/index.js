/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-04-30 16:18:42
 * @LastEditTime: 2020-05-01 22:58:30
 */

import "@babel/polyfill";
import $ from 'jquery';
import videoPic from "./static/img/video.png";
let img = new Image();
img.src = videoPic;
$(".box").html(img);

// require("./index.less");
// import("./index.less");

import "./index.less";
console.log("入口文件");

let TestFn = async () => {
    await setTimeout(() => { console.log(789) });
    return Promise.resolve("isok");
}
TestFn().then((data) => {
    console.log(data, "data");
});

class Fn {
    static _count = 12;
    _count = 120;
    constructor() {
    }
}

let f = new Fn();
console.log(Fn._count, "_静态属性");
console.log(f._count, "实例");


console.log("-----------------");
let str = "aa";
console.log(str.includes("bb"), "includes");

console.log("-----------------");
console.log(window.$, "$");

