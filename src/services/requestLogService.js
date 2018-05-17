import model from '../models/requestLogModel'
import functionService from './functionService'
import userService from './userService'
import _ from 'lodash'
const context = 'requestLog'

let requestLogService = {
    addLog: async (log) => {
        let db = await model.init(context)
        await db.insert(log).write()
    },
    getRequestLogPagedList: async (pageIndex, pageSize, sortBy, descending) => {
        let db = await model.init(context)
        let list = db.value()
        let resultList = list
        let totalCount = resultList.length
        if (sortBy) {
            resultList = _.sortBy(resultList, [sortBy])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        else {
            resultList = _.sortBy(resultList, ["createdDate"])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        let start = (pageIndex - 1) * pageSize
        let end = pageIndex * pageSize
        resultList = _.slice(resultList, start, end)
        let userList = await userService.getUserList()
        for (let item of resultList) {
            let user = userList.filter(s => {
                return s.id == item.createdBy
            })
            if (user.length > 0) {
                item.createdByName = user[0].name
            } else {
                item.createdByName = item.createdBy
            }
        }
        return {
            totalCount: totalCount,
            rows: resultList
        }

    }
}
module.exports = requestLogService