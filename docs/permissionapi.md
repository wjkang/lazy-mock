## 授权

### 登录

#### Request

```js
request({
    url: '/auth/login',
    method: 'post',
    data: qs.stringify({
      username: 'admin',
      password: '123'
    })
  })
```
>使用了`qs`的`stringify`，与直接传入js对象的区别是:使用前者，axios会将请求头`content-type`设为`application/x-www-form-urlencoded`，避免浏览器发起`options`请求；后者使用默认的`application/json`。后端`koa`接收的时候，都是通过`ctx.request.body`接收。

#### Response

```js
{
  "statusCode": 200,
  "msg": "",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNTMyMzE2NzIzLCJleHAiOjE1MzI5MjE1MjN9.fCWajolT_ttl_2UGHSw16_lRUNFwxlU6Tl30pt33kaY"
  }
}
```

#### Error
```js
{
  "statusCode": 500,
  "msg": "账号或密码错误!",
  "data": null
}
```

### 登出

#### Request
```js
request({
  url: '/auth/logout',
  method: 'post'
})
```
#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": null
}
```

## 用户

### 获取用户信息

#### Request
```js
request({
  url: '/user/info',
  method: 'get'
})
```

#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": {
    "userName": "admin",
    "userRole": [
      "role_test",
      "role_website_admin"
    ],
    "userPermission": [
      "post_edit",
      "post_view",
      "post_del",
      "menu_view",
      "role_view",
      "role_permission_view",
      "role_user_view",
      "user_role_view",
      "user_view",
      "department_view",
      "position_view"
    ],
    "isAdmin": 1,
    "avatarUrl": "https://api.adorable.io/avatars/85/abott@adorable.png"
  }
}
```
> 包含用户角色权限信息

### 新增或更新用户
#### Request
```js
request({
  url: '/user/save',
  method: 'post',
  data: {
    id: "1",
    name: "admin",
    email: "123@qq.com",
    phone: "18290024784",
    trueName: "张三"
  }
})
```
!>不设置id则为新增，否则为更新

#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": null
}
```

### 删除用户
#### Request
```js
request({
  url: '/user/del',
  method: 'delete',
  params: {
    id: "1"
  }
})
```
```js
request({
  url: '/user/batchdel',
  method: 'delete',
  params: {
    ids:"['1','2']"
})
```
#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": null
}
```
#### Error
```js
{
  "statusCode": 500,
  "msg": "不能删除管理员账号",
  "data": null
}
```
### 用户列表
#### Request
```js
request({
  url: '/user/pagedlist',
  method: 'get',
  params: {
    pageIndex: 1,
    pageSize: 10,
    sortBy: 'name',
    descending: true,
    filter: {
      name: 'admin',
      email: '',
    }
  }
})
```
#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": {
    "totalCount": 1,
    "rows": [
      {
        "id": "1",
        "name": "admin",
        "password": "123",
        "email": "123@qq.com",
        "phone": "18290024784",
        "trueName": "张三"
      }
    ]
  }
}
```


## 角色

## 功能

## 角色用户

## 角色权限