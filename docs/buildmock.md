## 配置应用信息
修改`codeGenerate/config/config.js`，只需要更新`ServerRootPath`为当前项目的根目录

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


## 配置实体
修改`codeGenerate/config/model.js`，比如
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

## 生成代码

内部使用`nunjucks`写了个简单的代码生成器，读取配置信息直接生成`CURD`代码
```
npm run code
```
!> 如果程序运行过程中执行`npm run code`，程序会自动重启，可直接调用新增的接口

## 调用接口

接口默认需要授权访问，请求头需要带上token。

>token登录成功后取到

以`axios`为例（后面请求接口也是使用`axios`）
```js
import axios from 'axios';

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'productBaseUrl', // api的base_url
  timeout: 20000 // request timeout
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = 'Bearer ' + 登陆后获取到的token// 让每个请求携带token
    return config
}, error => {
    Promise.reject(error)
})
```

### Insert

```js
request({
    url: '/book/save',
    method: 'post',
    data: data
}).then(res => {
    console.log(res.data)
})
```

### Delete

### Update

### Query


