<p align="center">
    <a href="https://github.com/wjkang/lazy-mock">
        <img width="250" src="https://raw.githubusercontent.com/wjkang/lazy-mock/master/screenshot/1.jpg">
    </a>
</p>

## lazy-mock
&emsp;&emsp;[lazy-mock](https://github.com/wjkang/lazy-mock) 是基于[koa2](https://github.com/koajs/koa)构建的，使用[lowdb](https://github.com/typicode/lowdb)持久化数据到JSON文件。只需要简单的配置就可以实现和[json-server](https://github.com/typicode/json-server)差不多的功能，但是比json-server更加灵活，后期可配置性更强，完全可以模拟真实后端业务逻辑。

&emsp;&emsp;lazy-mock默认包含了jwt实现的登录与登出，实现了基于RBAC模型的通用权限控制逻辑。具体可查看[vue-quasar-admin](https://github.com/wjkang/vue-quasar-admin)。

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

![image](https://raw.githubusercontent.com/wjkang/lazy-mock/master/screenshot/2.jpg)

## Use

下面通过模拟图书的增删改查 介绍lazy-mock的简单使用

### 修改codeGenerate/config/config.js：

```js
export default {
    ApiServer:'http://localhost:3000',
    ServerRootPath:'G:/GitHubProject/lazy-mock',
    //server
    RouteRelativePath:'/src/routes/',
    ControllerRelativePath:'/src/controllers/',
    ServiceRelativePath:'/src/services/',
    ModelRelativePath:'/src/models/',
    DBRelativePath:'/src/db/'
}
```
只需要修改``ServerRootPath``为当前项目的根目录。



### 接着修改codeGenerate/config/model.js：
```js

var shortid = require('shortid')
var Mock = require('mockjs')
var Random = Mock.Random

//必须包含字段id
export default {
    name: "book",
    Name: "Book",
    properties: [
        {
            key: "id",
            title: "id"
        },
        {
            key: "name",
            title: "书名"
        },
        {
            key: "author",
            title: "作者"
        },
        {
            key: "press",
            title: "出版社"
        }
    ],
    buildMockData: function () {//不需要生成设为false
        let data = []
        for (let i = 0; i < 100; i++) {
            data.push({
                id: shortid.generate(),
                name: Random.cword(5, 7),
                author: Random.cname(),
                press: Random.cword(5, 7)
            })
        }
        return data
    }
}

```
更多生成模拟数据的规则可看[https://github.com/nuysoft/Mock](https://github.com/nuysoft/Mock)

### 生成代码

 确保之前``npm run start``的窗口还开着，打开新的命令行窗口，执行``npm run code``

 ![image](https://raw.githubusercontent.com/wjkang/lazy-mock/master/screenshot/3.jpg)

 复制src/routes/bookApiMap.txt某一行数据到Postman访问

 ```txt
get http://localhost:3000/book/get?id=
 ```
 ```txt
get http://localhost:3000/book/paged?pageIndex=&pageSize=&sortBy=&descending=&id=&name=&author=&press=
 ```
 ```txt
delete http://localhost:3000/book/del?id=
 ```
 ```txt
delete http://localhost:3000/book/batchdel?ids=[]
 ```
 ```txt
 //不设置id则新增，否则为更新
post http://localhost:3000/book/save
{

   "id":"",

   "name":"",

   "author":"",

   "press":"",
  
}
 ```
![image](https://raw.githubusercontent.com/wjkang/lazy-mock/master/screenshot/4.jpg)

 请求头记得加上Authorization:Bearer token

 token之前模拟登录获取的

 ![image](https://raw.githubusercontent.com/wjkang/lazy-mock/master/screenshot/5.jpg)

 ## More

 ### 修改自动生成的代码格式

直接修改codeGenerate/serverTemplates 下文件

### 去掉接口需要授权访问的限制

去掉scr/app.js 里的``.use(jwt({ secret: publicKey }).unless({ path: [/^\/public|\/auth\/login|\/assets/] }))``

### 修改接口返回格式

修改src/lib/responseTemplate.js

### 修改路由

修改src/routes 下文件

### 添加更多业务逻辑

主要修改src/services下文件，具体可参考[memuService.js](https://github.com/wjkang/lazy-mock/blob/master/src/services/memuService.js)

### 使用权限控制逻辑


前端参考[vue-quasar-admin](https://github.com/wjkang/vue-quasar-admin)。实现了页面(菜单)，接口，元素级的权限控制。

后端在路由处加上权限控制的中间件，比如
```js
.get('/function/pagedlist', PermissionCheck({ permission: ["function_view"], role: ["test"] }), controllers.function.getFunctionPagedList)
```

permission表明当前登录用户必须具备数组里的任意一个权限码，才能访问当前接口。

role表明当前登录用户必须具备数组里的任意一个角色码，才能访问当前接口

permission与role为或关系











