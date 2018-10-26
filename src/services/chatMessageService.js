import model from '../models/chatMessageModel'
import userService from './userService'
import _ from 'lodash'
const context = 'chatMessage'
module.exports = {
    getChatMessage: async (id) => {
        let db = await model.init(context)
        let chatMessage = db.find({ id: id }).value()
        return chatMessage
    },
    getChatMessagePagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let chatMessageList = db.value()
        let resultList = chatMessageList

        if (filter.id) {
            resultList = _.filter(resultList, (o) => {
                return o.id.indexOf(filter.id) > -1
            });
        }

        if (filter.type) {
            resultList = _.filter(resultList, (o) => {
                return o.type == filter.type;
            });
        }

        if (filter.contentType) {
            resultList = _.filter(resultList, (o) => {
                return o.contentType.indexOf(filter.contentType) > -1
            });
        }

        if (filter.status) {
            resultList = _.filter(resultList, (o) => {
                return o.status.indexOf(filter.status) > -1
            });
        }

        if (filter.toId) {
            //私聊
            if (filter.type == 1) {
                resultList = _.filter(resultList, (o) => {
                    return o.toId.indexOf(filter.toId) > -1 || o.fromId.indexOf(filter.toId) > -1
                });
            } else {
                resultList = _.filter(resultList, (o) => {
                    return o.toId.indexOf(filter.toId) > -1
                });
            }
        }

        if (filter.fromId) {
            //私聊
            if (filter.type == 1) {
                resultList = _.filter(resultList, (o) => {
                    return o.fromId.indexOf(filter.fromId) > -1 || o.toId.indexOf(filter.fromId) > -1
                });
            } else {
                resultList = _.filter(resultList, (o) => {
                    return o.fromId.indexOf(filter.fromId) > -1
                });
            }
        }

        if (filter.message) {
            resultList = _.filter(resultList, (o) => {
                return o.message.indexOf(filter.message) > -1
            });
        }

        if (filter.createdBy) {
            resultList = _.filter(resultList, (o) => {
                return o.createdBy.indexOf(filter.createdBy) > -1
            });
        }

        if (filter.createdDate) {
            resultList = _.filter(resultList, (o) => {
                return o.createdDate.indexOf(filter.createdDate) > -1
            });
        }
        if (filter.maxCreatedDate) {
            resultList = _.filter(resultList, (o) => {
                return o.createdDate < filter.maxCreatedDate
            });
        }

        let totalCount = resultList.length
        if (sortBy) {
            resultList = _.sortBy(resultList, [sortBy])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        if (!pageIndex || pageIndex <= 0) {
            pageIndex = 1
        }
        if (pageSize) {
            let start = (pageIndex - 1) * pageSize
            let end = pageIndex * pageSize
            resultList = _.slice(resultList, start, end)
        }
        let userList = await userService.getUserList()
        for (var item of resultList) {
            let user = userList.filter(s => {
                return s.id == item.fromId
            })
            if (user.length > 0) {
                item.fromName = user[0].name
            } else {
                item.fromName = item.fromId
            }
        }
        return {
            totalCount: totalCount,
            rows: resultList
        }

    },
    delChatMessage: async (id) => {
        let db = await model.init(context)
        await db.remove({ id: id }).write()
    },
    saveChatMessage: async (chatMessage) => {
        let db = await model.init(context)
        if (chatMessage.id) {
            await db.find({ id: chatMessage.id })
                .assign(chatMessage)
                .write()
        } else {
            await db.insert(chatMessage).write()
        }
        return {
            success: true,
            msg: ""
        }
    }
}