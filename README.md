<p align="center">
    <a href="https://github.com/wjkang/lazy-mock">
        <img width="400" src="https://raw.githubusercontent.com/wjkang/lazy-mock/master/screenshot/1.jpg">
    </a>
</p>

## vue-quasar-admin
&emsp;&emsp;[lazy-mock](https://github.com/wjkang/lazy-mock) 是基于[koa2](https://github.com/koajs/koa)构建的，使用[lowdb](https://github.com/typicode/lowdb)持久化数据到JSON文件。只需要简单的配置就可以实现和[json-server](https://github.com/typicode/json-server)差不多的功能，但是比json-server更加灵活，后期可配置性更强，完全可以模拟真实后端业务逻辑。

&emsp;&emsp;lazy-mock默认包含了jwt实现的登录与登出，实现了基于RBAC模型的完整权限控制逻辑。具体可查看[vue-quasar-admin](https://github.com/wjkang/vue-quasar-admin)。

## Clone
```bush
git clone https://github.com/wjkang/lazy-mock.git
```

## Install
```bush
npm install
```
## Run
```bush
npm run start
```

使用Postman模拟登录功能

![image](https://raw.githubusercontent.com/wjkang/lazy/master/screenshot/2.jpg)


