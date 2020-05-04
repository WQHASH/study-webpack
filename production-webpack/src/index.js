/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-02 23:04:54
 * @LastEditTime: 2020-05-03 21:23:46
 */
import './index.less'
// import moment from 'moment';
// import 'moment/locale/zh-cn'
// 设置语言
// moment.locale('zh-cn');

console.log("入口文件");
console.log("----------");
// let time = moment("20111031", "YYYYMMDD").fromNow();
// console.log(time, "moment");

let box = document.querySelector(".box");
let btn = document.createElement("button");
btn.innerHTML = "按sss1";
box.appendChild(btn);

box.addEventListener("click", function () {
    import("./source.js").then((data) => {
        console.log(data, "data");
    }).catch((err) => {
        console.log(err, "err");
    })
});

