/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-03 22:19:24
 * @LastEditTime: 2020-05-03 22:25:04
 */

class SyncHook {
    constructor(args) {
        this.tasks = [];
    }
    tap(name, callBack) {
        this.tasks.push(callBack);
    }
    call(...args) {
        this.tasks.forEach((task) => {
            task(...args);
        });
    }
}

let hook = new SyncHook(['name']);
hook.tap('java', function (name) {
    console.log("java", name);
});
hook.call("wq");


