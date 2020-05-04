/*
 * @Description: 入口文件
 * @Author: wangqi
 * @Date: 2020-05-02 10:16:02
 * @LastEditTime: 2020-05-02 18:25:42
 */
import "@babel/polyfill";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
console.log(window.$,"swws");



console.log("入口文件");
class Fun {
    count = 1;
    constructor() {
        this.count = 112;
    }
}

console.log(new Fun());

console.log("---------------------");
//如果采用node配置代理; 请求方式：window.fetch("/user")
// window.fetch("/api/user").then(response => response.json()).then((data) => {
//     console.log(data, "data");
// }).catch((err) => {
//     console.log(err, "err");
// });