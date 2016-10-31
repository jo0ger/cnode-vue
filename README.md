# cnode-vue

> 基于vue和vue-router构建的cnodejs web网站SPA

## 所用知识
* [vue2.0](http://vuefe.cn/)
* [vue-router2.0](http://vuefe.cn/vue-router/)
* [vuex2.0](https://github.com/vuejs/vuex)
* [element-ui](http://element.eleme.io/)
* [es6](http://es6.ruanyifeng.com/)
* [webpack](http://webpack.github.io/)
* [gulp](http://www.gulpjs.com.cn/)

## 构建步骤

``` bash
# 安装依赖
npm install

# 开发模式（localhost:8080/index_dev.html，hot reload）
npm run dev

# 生产模式（JS压缩，webpack）
npm run build

# 生产模式（JS，css压缩，webpack+gulp，常用）
npm run dist

```
## 当前版本

v1.1.0

## 后续计划

* 优化细节
* 优化webpack+gulp构建过程
* 学习利用vuex做状态管理，利用vue-resource获取数据
* 开发移动端vue SPA

## Log

* todo          数据获取采用vue-resource，尝试服务端渲染，动态更新组件

* 2016-10-29    新增vuex进行用户登录状态管理，组件切换添加过渡效果，v1.1

* 2016-10-21    新增webpack+gulp打包构建，v1.0

* 2016-10-17    实现评论及新建话题功能

* 2016-10-15    结合element-ui进行组件开发

* 2016-10-12    项目文件结构确定

## 说明

node_modules目录纯粹为公司网不好，懒得install，可无视之，自行install
