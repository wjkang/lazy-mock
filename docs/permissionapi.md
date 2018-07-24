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
### 新增或更新角色
#### Request
```js
request({
  url: '/role/save',
  method: 'post',
  data: {
    id: "1",
    name: "网站管理员",
    code: "role_website_admin",
    description: "xxoo"
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

### 删除角色
#### Request
```js
request({
  url: '/role/del',
  method: 'delete',
  params: {
    id: "1"
  }
})
```
```js
request({
  url: '/role/batchdel',
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

### 角色列表
#### Request
```js
request({
  url: '/role/pagedlist',
  method: 'get',
  params: {
    pageIndex: 1,
    pageSize: 10,
    sortBy: 'name',
    descending: true,
    filter: {
      name: '',
      code: '',
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
    "totalCount": 2,
    "rows": [
      {
        "name": "测试",
        "code": "role_test",
        "description": "具备全部数据查看权限，没有相关系统设置的操作权限",
        "id": "40af8f42-3b18-410c-9fc2-aba8158e92d7"
      },
      {
        "name": "网站模块管理员",
        "code": "role_website_admin",
        "description": "网站模块管理员",
        "id": "9fc587ff-3543-4f58-93ab-15f64d3d19e5"
      }
    ]
  }
}
```

## 功能
### 新增或更新功能
#### Request
```js
request({
  url: '/function/save',
  method: 'post',
  data: {
    id: "2817154d-2df0-4875-ac26-5c3dd27061ad",
    name: "2-文章编辑",
    code: "post_edit",
    description: "文章编辑",
    moduleId: 3,
    module: "文章管理"
  }
})
```
!>不设置id则为新增，否则为更新
>`moduleId`为菜单id，`module`为菜单名称，方便查询

#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": null
}
```

### 删除功能
#### Request
```js
request({
  url: '/function/del',
  method: 'delete',
  params: {
    id: "1"
  }
})
```
```js
request({
  url: '/function/batchdel',
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

### 功能列表
#### Request
```js
request({
  url: '/function/pagedlist',
  method: 'get',
  params: {
    pageIndex: 1,
    pageSize: 10,
    sortBy: 'name',
    descending: true,
    filter: {
      name: '',
      code: '',
      module: '文章管理'
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
    "totalCount": 3,
    "rows": [
      {
        "name": "1-文章列表",
        "moduleId": 3,
        "module": "文章管理",
        "code": "post_view",
        "description": "文章列表",
        "id": "17684882-c610-4007-b357-e783631c059f"
      },
      {
        "name": "2-文章编辑",
        "code": "post_edit",
        "description": "文章编辑",
        "moduleId": 3,
        "module": "文章管理",
        "id": "2817154d-2df0-4875-ac26-5c3dd27061ad"
      },
      {
        "name": "3-文章删除",
        "code": "post_del",
        "description": "文章删除",
        "moduleId": 3,
        "module": "文章管理",
        "id": "8ab3b7b6-921a-4f8f-9bad-2fd106c870e1"
      }
    ]
  }
}
```

## 角色用户
### 关联角色用户
#### Request
```js
request({
  url: '/user/editroleuser',
  method: 'post',
  data: {
    roleId: '',
    userId: '',
    action: 1
  }
})
```
!>`action`为1则添加关联，2则删除关联
#### Reponse
```js
{
  "statusCode": 200,
  "msg": "",
  "data": null
}
```

## 角色权限

### 保存角色权限
#### Request
```js
request({
  url: '/role/savepermission',
  method: 'post',
  data: {
    roleId: '2817154d-2df0-4875-ac26-5c3dd27061ad',
    permissions: ['40af8f42-3b18-410c-9fc2-aba8158e92d7']
  }
})
```
>`permissions`为功能id列表，表明当前角色有权限访问这些功能或资源

#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": null
}
```

## 菜单
### 添加或更新菜单
#### Request
```js
request({
  url: '/menu/savemenu',
  method: 'post',
  data: {
     id: 3,
     parentId: 2
     icon: "settings",
     title: "文章管理",
     name: "article",
     leftMemu: true,
     functionCode: "article_view",
     sort: 2,
     isLock: false
  }
})
```
!>不设置id则为新增，否则为更新。parentId为0则为顶级菜单

#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": null
}
```

### 菜单列表
#### Request
```js
request({
  url: '/menu',
  method: 'get'
})
```
#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": [
    {
      "id": 4,
      "parentId": 0,
      "path": "",
      "icon": "appstore",
      "title": "系统",
      "name": "系统",
      "leftMemu": true,
      "functionCode": "",
      "sort": 1,
      "children": [
        {
          "id": 5,
          "parentId": 4,
          "path": "/system",
          "icon": "setting",
          "title": "系统设置",
          "name": "系统设置",
          "leftMemu": true,
          "functionCode": "",
          "children": [
            {
              "id": 6,
              "parentId": 5,
              "path": "menu",
              "icon": "chrome",
              "title": "菜单管理",
              "name": "menu",
              "leftMemu": true,
              "functionCode": "menu_view",
              "children": [
                
              ]
            }
          ]
        },
        {
          "id": 7,
          "parentId": 4,
          "path": "/permission",
          "icon": "key",
          "title": "权限管理",
          "name": "权限管理",
          "leftMemu": true,
          "functionCode": "",
          "children": [
            {
              "id": 8,
              "parentId": 7,
              "path": "function",
              "icon": "solution",
              "title": "功能管理",
              "name": "function",
              "leftMemu": true,
              "functionCode": "function_view",
              "children": [
                
              ]
            },
            {
              "id": 20,
              "parentId": 7,
              "path": "role",
              "icon": "idcard",
              "title": "角色管理",
              "name": "role",
              "leftMemu": true,
              "functionCode": "role_view",
              "children": [
                
              ]
            },
            {
              "id": 9,
              "parentId": 7,
              "path": "rolepermission",
              "icon": "calculator",
              "title": "角色权限管理",
              "name": "rolepermission",
              "leftMemu": true,
              "functionCode": "role_permission_view",
              "children": [
                
              ]
            },
            {
              "id": 10,
              "parentId": 7,
              "path": "roleuser",
              "icon": "android",
              "title": "角色用户管理",
              "name": "roleuser",
              "leftMemu": true,
              "functionCode": "role_user_view",
              "children": [
                
              ]
            },
            {
              "id": 11,
              "parentId": 7,
              "path": "userrole",
              "icon": "dropbox",
              "title": "用户角色管理",
              "name": "userrole",
              "leftMemu": true,
              "functionCode": "user_role_view",
              "children": [
                
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### 获取授权菜单
#### Request
```js
request({
  url: '/menu/getaccessmenu',
  method: 'get'
})
```
#### Response
>如[菜单列表](#菜单列表)接口返回格式

### 菜单功能权限
#### Request
```js
request({
  url: '/menu/menufunctions',
  method: 'get',
  params: {
    menuId:0,
    roleId:'1'
  }
})
```
#### Response
```js
{
  "statusCode": 200,
  "msg": "",
  "data": {
    "menuFunctions": [
      {
        "id": 6,
        "parentId": 5,
        "path": "menu",
        "icon": "chrome",
        "title": "菜单管理",
        "name": "menu",
        "leftMemu": true,
        "functionCode": "menu_view",
        "functions": [
          {
            "name": "1-菜单列表",
            "code": "menu_view",
            "description": "查看菜单列表",
            "moduleId": 6,
            "module": "菜单管理",
            "id": "6f3ef7c1-53fb-47b6-8800-0adff147c295"
          },
          {
            "name": "2-菜单编辑",
            "code": "menu_edit",
            "description": "菜单编辑",
            "moduleId": 6,
            "module": "菜单管理",
            "id": "f8297890-5a35-4704-b901-6b25074beb43"
          }
        ]
      },
      ...
    ],
    "roleFunctions": [
      {
        "roleId": "40af8f42-3b18-410c-9fc2-aba8158e92d7",
        "functionId": "2de3ee27-a382-4bbb-8c8f-fa6f73c99d1d",
        "moduleId": 20,
        "id": "6b0365da-54d2-49e6-bb28-e129d1bbce1a"
      },
      ...
    ]
  }
}
```
>`menuFunctions`为菜单列表，`menuFunctions.functions`菜单下相应的功能或资源

>`roleFunctions`为对应角色具备的权限列表

>此接口用在角色权限编辑