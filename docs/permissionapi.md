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



## 用户

## 角色

## 功能

## 角色用户

## 角色权限