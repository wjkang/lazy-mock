import model from '../models/baseModel'
import _ from 'lodash'
const context = 'role'
module.exports = {
    getRolePagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let roleList = db.value()
        let resultList = roleList
        
            if (filter.id) {
                resultList = _.filter(resultList, (o) => {
                    return o.id.indexOf(filter.id) > -1
                });
            }
        
            if (filter.name) {
                resultList = _.filter(resultList, (o) => {
                    return o.name.indexOf(filter.name) > -1
                });
            }
        
        let totalCount = resultList.length
        if (sortBy) {
            resultList = _.sortBy(resultList, [sortBy])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        let start = (pageIndex - 1) * pageSize
        let end = pageIndex * pageSize
        resultList = _.slice(resultList, start, end)

        return {
            totalCount: totalCount,
            rows: resultList
        }

    },
    delRole: async (id) => {
        let db = await model.init(context)
        await db.remove({ id: id }).write()
    },
    saveRole: async (role) => {
        let db = await model.init(context)
        if (role.id) {

            await db.find({ id: role.id })
                .assign(role)
                .write()
        } else {
            await db.insert(role).write()
        }
        return {
            success: true,
            msg: ""
        }
    }
}