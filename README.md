# mlanman-vue

> A Vue.js project，此项目作为烂熳移动端项目，前端重构模拟项目, 暂无预览地址😁💦

## Build Setup
**注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版  
``` bash
# 建议使用淘宝镜像命令cnpm代替npm!防止依赖出错可以用：npm i --registry=https://registry.npm.taobao.org
# install dependencies
cnpm i

# serve with hot reload at localhost:8080
# 这里除了启动项目还要启动mock模拟环境
# 先全局安装`json-server`
npm install json-server -g
# 启动项目
npm run mockdev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 技术栈
vue2 + vuex + vux + vue-router + webpack + ES6/7 + fetch + sass + flex + svg + mock(json-server)
