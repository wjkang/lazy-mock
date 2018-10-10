import model from '../models/chatRoomUserModel'
import _ from 'lodash'
const context = 'chatRoomUser'
module.exports = {
    getChatRoomUser: async (id) => {
        let db = await model.init(context)
        let chatRoomUser = db.find({ id: id }).value()
        return chatRoomUser
    },
    getChatRoomUserPagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let chatRoomUserList = db.value()
        let resultList = chatRoomUserList
        
            if (filter.id) {
                resultList = _.filter(resultList, (o) => {
                    return o.id.indexOf(filter.id) > -1
                });
            }
        
            if (filter.userId) {
                resultList = _.filter(resultList, (o) => {
                    return o.userId.indexOf(filter.userId) > -1
                });
            }
        
            if (filter.roomId) {
                resultList = _.filter(resultList, (o) => {
                    return o.roomId.indexOf(filter.roomId) > -1
                });
            }
        
        let totalCount = resultList.length
        if (sortBy) {
            resultList = _.sortBy(resultList, [sortBy])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        if(!pageIndex||pageIndex<=0){
            pageIndex=1
        }
        if(pageSize){
            let start = (pageIndex - 1) * pageSize
            let end = pageIndex * pageSize
            resultList = _.slice(resultList, start, end)
        }

        return {
            totalCount: totalCount,
            rows: resultList
        }

    },
    delChatRoomUser: async (id) => {
        let db = await model.init(context)
        await db.remove({ id: id }).write()
    },
    saveChatRoomUser: async (chatRoomUser) => {
        let db = await model.init(context)
        if (chatRoomUser.id) {
            await db.find({ id: chatRoomUser.id })
                .assign(chatRoomUser)
                .write()
        } else {
            await db.insert(chatRoomUser).write()
        }
        return {
            success: true,
            msg: ""
        }
    }
}