/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-03 22:08:36
 * @LastEditTime: 2020-05-03 22:18:59
 */
let { SyncHook } = require('tapable');
// ---------------------------
// 发布订阅模式

class Lesson {
    constructor() {
        this.hook = {
            arch: new SyncHook(['name']),
        }
    }
    // 注册监听函数
    tap() {
        this.hook.arch.tap('java', function (name) {
            console.log("java", name);
        });
        this.hook.arch.tap('vue', function (name) {
            console.log("vue", name);
        });
    }
    // 执行已注册的所有hook
    start() {
        this.hook.arch.call("wq");
    }
}

let L = new Lesson();
// 注册这两个事件
L.tap();
// 启动钩子
L.start();
