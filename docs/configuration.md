## 修改应用监听端口
修改`src/config.js`文件

## 生成mock数据
配置`codeGenerate/config/model.js`

```js
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

```
生成代码的时候会执行`buildMockData`，将生成的mock数据填充到对应db.json文件。

默认使用[mockjs](https://github.com/nuysoft/Mock)，更多规则可查看其[文档](https://github.com/nuysoft/Mock)。也可以自行安装[faker.js](https://github.com/Marak/faker.js)使用

## 修改接口名称

* 修改模板

修改`codeGenerate/serverTemplates/route.njk`代码模板，后续生成代码就会以新的模板来生成。

* 直接修改

找到对应的路由文件(`src/routes`下，路由文件名称会以实体名称生成)，直接修改即可。

## 授权配置

默认需要授权访问，请求的时候请求头需要带上token

* 完全去掉授权限制

`src/app.js`找到下行代码
```js
.use(jwt({ secret: publicKey }).unless({ path: [/^\/public|\/auth\/login|\/assets/] }))
```
直接去掉即可。
>完全去掉授权限制 权限控制功能也会失效

* 部分接口去掉授权显示

还是上面那行代码，根据规则修改
```js
{ path: [/^\/public|\/auth\/login|\/assets/] }
```

## 修改数据返回格式

修改`src/lib/responseTemplate.js`

```js
export let businessError = (ctx,msg) => {
    ctx.body = {
        statusCode: 500,
        msg: msg,
        data: null
    }
}

export let success = (ctx,data) => {
    ctx.body = {
        statusCode: 200,
        msg: '',
        data: data
    }
}
```

## 配置接口访问权限
使用已经实现的RBAC权限控制，可以实现接口的访问权限控制。

假如某个接口只允许特定的角色或具备特定权限的人访问，需要修改对应接口的路由配置，比如
```js
.get('/function/pagedlist', PermissionCheck({ permission: ["function_view"], role: ["test"] }), controllers.function.getFunctionPagedList)
```
使用中间件`PermissionCheck`做权限校验，如果当前用户没有登录，或者不具备function_view权限并且不属于test角色，访问此接口的时候会返回相应的错误信息。

>permission为功能编码，role为角色编码，如果用户属于admin则不做校验


## 添加业务逻辑

如果简单的增删改查不能满足你的要求。你可以自行修改代码，添加你需要的功能。

首先需要了解一下整个应用的结构及调用过程。

* **`src\routes`**

生成代码时会在该文件夹下生成相应的路由文件，比如`bookRoute.js`。

路由配置里，每个接口被访问的时候，会调用对应controller的方法
```js
.post('/auth/login', controllers.auth.login)
```
比如登陆的时候，调用`auth`控制器的`login`方法

* **`src\controllers`**

生成代码时会在该文件夹下生成相应的控制器文件，比如`book.js`。

控制器里会引入相应的实体的服务，也可引入多个实体的服务
```js
import menuService from '../services/memuService'
import roleService from '../services/roleService'
```
调用服务里的方法来完成某些功能需求,比如
```js
export let getMenuFunctions = async (ctx) => {
    let menuId = ctx.query.menuId
    let roleId = ctx.query.roleId
    let [menuFunctions, roleFunctions] =
        await Promise.all([menuService.getMenuFunctions(menuId), roleService.getRoleFunctions(roleId)])
    return responseTemplate.success(ctx, {
        menuFunctions: menuFunctions,
        roleFunctions: roleFunctions
    })
}
```

* **`src\services`**

生成代码时会在该文件夹下生成相应的服务文件，比如`bookService.js`。
控制器里会引入相应的model，也可引入多个实体的服务


