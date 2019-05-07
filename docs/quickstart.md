## 安装

``` bash
$ npm install -g lazy-mock
```

## 使用

``` bash
$ lazy-mock init rbac lazy-mock-rbac
```

## 安装依赖
进入 lazy-mock-rbac 文件夹，通过 `npm install` 安装依赖
```bash
npm install
```

## 启动程序
通过 `gulp-nodemon` ，程序运行过程，修改受监控的文件时，程序会自动重启。
```bash
npm run start
```

## 登录
使用 postman 模拟登陆，拿到 token
![image](https://raw.githubusercontent.com/wjkang/lazy-mock/master/screenshot/2.jpg)

>内置账号：admin，密码：123

>用户，权限管理等信息保存在 `src/db/db.json` 文件中，后面增加实体会生成独立的json文件
