<p align="center">
    <a href="https://github.com/wjkang/lazy-mock">
        <img width="250" src="https://raw.githubusercontent.com/wjkang/lazy-mock/master/screenshot/1.png">
    </a>
</p>

## 关于lazy mock
> 一个快速生成后端模拟数据的懒人工具

## 是什么

lazy mock 是一个使用`koa2`构建的，`lowdb`持久化数据到JSON文件的快速生成后端模拟数据的工具。只需要简单的配置就可以实现和json-server一样的功能，但是比json-server更加灵活，后期可配置性更强，完全可以模拟真实后端业务逻辑。  

lazy mock默认包含了`jwt`实现的登录与登出，实现了基于`RBAC`模型的通用权限控制逻辑。

## 安装

``` bash
$ npm install -g lazy-mock
```

## 使用

``` bash
$ lazy-mock init <template-name> <project-name>
```

例子:

``` bash
$ lazy-mock init d2-admin-pm my-project
```

在 my-project 目录下执行 npm install

## 目前支持模板
* [rbac](https://github.com/lazy-mock-templates/rbac) --- 包含 RBAC 权限控制模型
* [d2-admin-pm](https://github.com/lazy-mock-templates/d2-admin-pm) --- 包含 [d2-admin-pm](https://github.com/wjkang/d2-admin-pm) 的 curd 模板

>支持模板开发及自定义，详细看文档

## 特性
- 轻松对接`mock.js`，`faker.js`等假数据生成工具
- 不需要数据库，直接持久化数据到JSON文件
- 相比json-server单JSON文件，支持一个实体一个JSON文件
- 默认包含了`jwt`实现的登录与登出，基于`RBAC`模型的权限控制
- 使用 `async/await` 处理异步问题
- `MVC`代码分层结构
- 内置简单代码生成器



[文档](https://wjkang.github.io/lazy-mock)

## Stargazers over time

[![Stargazers over time](https://starcharts.herokuapp.com/wjkang/lazy-mock.svg)](https://starcharts.herokuapp.com/wjkang/lazy-mock)












