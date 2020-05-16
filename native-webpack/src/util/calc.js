/*
 * @Description: 
 * @Author: wangqixxx
 * @Date: 2020-05-11 09:37:09
 * @LastEditTime: 2020-05-14 11:01:36
 */

function square(x) {
    return x * x;
}

function cube(x) {
    return x * x * x;
}
let num = 110;
let data = {
    sname: "wq",
    des: "xxx",
}
// default导出不存在引用关系
setTimeout(() => {
    data.sname = "wangqitya";
    num = 555;
}, 3000);

// export { num as default };
// moren
export default num;
// export {num}

// export { square, cube }
// module.exports = {square}

