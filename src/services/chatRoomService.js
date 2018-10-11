import model from '../models/chatRoomModel'
import _ from 'lodash'
const context = 'chatRoom'
module.exports = {
    getChatRoom: async (id) => {
        let db = await model.init(context)
        let chatRoom = db.find({ id: id }).value()
        return chatRoom
    },
    getChatRoomPagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let chatRoomList = db.value()
        let resultList = chatRoomList

        if (filter && filter.id) {
            resultList = _.filter(resultList, (o) => {
                return o.id.indexOf(filter.id) > -1
            });
        }

        if (filter && filter.name) {
            resultList = _.filter(resultList, (o) => {
                return o.name.indexOf(filter.name) > -1
            });
        }

        if (filter && filter.createdBy) {
            resultList = _.filter(resultList, (o) => {
                return o.createdBy.indexOf(filter.createdBy) > -1
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

        return {
            totalCount: totalCount,
            rows: resultList
        }

    },
    delChatRoom: async (id) => {
        let db = await model.init(context)
        await db.remove({ id: id }).write()
    },
    saveChatRoom: async (chatRoom) => {
        let db = await model.init(context)
        let exist = db.find({ name: chatRoom.name }).value()
        if (exist && exist.id != chatRoom.id) {
            return {
                success: false,
                msg: "名称已经存在"
            }
        }
        if (chatRoom.id) {
            await db.find({ id: chatRoom.id })
                .assign(chatRoom)
                .write()
        } else {
            await db.insert(chatRoom).write()
        }
        return {
            success: true,
            data: db.find({ name: chatRoom.name }).value()
        }
    }
}