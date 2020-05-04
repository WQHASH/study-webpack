<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-01 10:56:12
 * @LastEditTime: 2020-05-04 18:15:23
 -->
# npx 作用
    找到 node_modules/.bin/webpack 目录， 没有的话换系统环境变量的，在没有就给远程下载
    （主要用在命令行形式中，如果有 package.json 文件 npx webpack npx 可省略）

    注意：  npx webpack-dev-server --config 指定具体的编译文件 => 但是这里的文件别再是默认的 webpack.config.js，否则编译失败；
            npx webpac.config.js --config 指定具体的编译文件 => 这种只要指定合理文件都能正常执行
------------------------------------------
<br/>

# 让webpack打包支持ES6语法
    首先 yarn add babel-loader @babel-core @babel/preset-env
    需要babel-loader中的核心代码库@babel-core 下的preset-env插件进行配置
------------------------------------------
<br/>


# 让webpack打包支持ES7的语法 如 async/await
    首先需要 yarn add babel-plugin-transform-runtime babel-runtime -D
    然后配置 .babelrc文件
------------------------------------------
<br/>

    <b>
    可对比上面两个的配置 .babelrc文件 其实和 rules配置 js语法 有些相似，.babelrc跟像从中抽离出去的
    </b>


# 让webpack中使用图片注意事项
    需要两个loader file-loader url-loader 
    作用：file-loader：默认会把from的图片导入到指定的output目录中
        url-loader：主要是生成base64的作用
    导入方式： import videoPic from "./static/img/video.png";  require("./static/img/video.png");
        使用这种方式的导入 webpack不论是使用 dev 还是 build 时webpack服务器内部会生成一张图片地址;
        而直接使用 img.src = "./static/img/video.png" 方式则无法生成图片，就会报图片路径错误;
--------------------------------------------
<br/>


# webpack中使用boostrap遇到的问题
    如果希望使用boostrap,安装完依赖后直接 import 'boostrap' 使用的其实是boostrap.js文件;
    如果我们要使用boostrap.css则需要 import 'bootstrap/dist/css/bootstrap.css' 找到具体的指定目录;
    或者通过配置 resolve['alias']别名的形式， 在配置必不可少的
            loader ['/\.scss$/', ' /\.scss$/', '/\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/', '/\.(ttf|eot|svg)(\?[\s\S]+)?$/']
        <b>注意</b>： 有时候这么配置还是会包缺少loader，或者其他错误，那么这时候需要看看是不是 boostrap版本的问题，建议使用官网中的@3.37版本
--------------------------------------------
<br/>


# webpack自带优化
    obj.js === export {say(){}, sing(){}};
        import say from 'obj.js';   
            =>  使用这种导入模式 在webpack打包过程中sing方法不会被打包进去,只有被使用到方法才会被打包
                可减小打包体积; 在webpack中成为 tree-shaking模式，把没用的代码自动删除；
                在es6的中被称为 “编译时加载”

        let obj = require('obj.js');
            =>  这种整体加载模块生成一个对象然后再从这个对象上面读取方法，此时会将所有的方法都进行打包
                这种加载称为“运行时加载”


