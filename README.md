# vue-tree-demo

## **1. 这是什么？**

这是一个用Vue2.0+编写的网页树形组件，模拟从后台接收JSON数据，然后在页面端通过动态树形的形式展现出来。具有添加节点、修改节点、删除节点的功能。

## **2. 如何使用？**

**(1)  查看demo**

打开 `/dist/index.html` 。

**(2)  源码介绍**

* `/src/components`：存放树形组件；
* `/src/components/messagebox`：自己写的弹出框UI；
* `/src/data`：存放从后台接收的JSON数据，组件就从这里取数据的；
* `/src/utils`：存放事件总线和vuex文件（后者暂时没用）；
* `/src/app.vue`：组件和弹框组装处，同时监听所有发布的事件；
* `/src/index.js`：组件实例入口；
* `/dist`：文件打包存放处；
* `/dist/js/bundle.js`：整个组件所有脚本的打包文件。

## **3.还有什么？**

此组件中的四个图标是从ElementUI引入的，**后续会使用ElementUI的风格重写三个弹框**。

