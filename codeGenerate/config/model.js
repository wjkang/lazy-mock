
var shortid = require('shortid')
var Mock = require('mockjs')
var Random = Mock.Random

//必须包含字段id
export default {
    name: "chatMessage",
    Name: "ChatMessage",
    properties: [
        {
            key: "id",
            title: "id"
        },
        {
            key: "type",
            title: "type"
        },
        {
            key: "contentType",
            title: "contentType"
        },
        {
            key: "status",
            title: "status"
        },
        {
            key: "toId",
            title: "toId"
        },
        {
            key: "fromId",
            title: "fromId"
        },
        {
            key: "message",
            title: "message"
        },
        {
            key: "createdBy",
            title: "createdBy"
        },
        {
            key: "createdDate",
            title: "createdDate"
        }
    ],
    buildMockData: function () {//不需要生成设为false
        return [];
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
