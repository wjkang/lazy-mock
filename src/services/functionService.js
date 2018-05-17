import model from '../models/baseModel'
import _ from 'lodash'
const context = 'function'

module.exports = {
    getFunctionPagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let functionList = db.value()
        let resultList = functionList
        if (filter.module) {
            resultList = _.filter(resultList, (o) => {
                return o.module.indexOf(filter.module) > -1
            });
        }
        if (filter.name) {
            resultList = _.filter(resultList, (o) => {
                return o.name.indexOf(filter.name) > -1
            });
        }
        if (filter.code) {
            resultList = _.filter(resultList, (o) => {
                return o.code.indexOf(filter.code) > -1
            });
        }
        let totalCount = resultList.length
        if (sortBy) {
            resultList = _.sortBy(resultList, [sortBy])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        else{
            resultList = _.sortBy(resultList, ["module","name"])
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
    getFunctionList: async () => {
        let db = await model.init(context)
        return db.value()
    },
    getFunctionListByIds: async (ids) => {
        let db = await model.init(context)
        let list = db.value()
        let functions = list.filter(s => {
            return ids.indexOf(s.id) > -1
        })
        return functions
    },
    delFuntion: async (id) => {
        let db = await model.init(context)
        await db.remove({ id: id }).write()
    },
    saveFunction: async (func) => {
        let db = await model.init(context)
        let exist = db.find({ code: func.code }).value()
        if (exist && exist.id != func.id) {
            return {
                success: false,
                msg: "功能编码已经存在"
            }
        }
        let exist1 = db.find({ moduleId: func.moduleId, name: func.name }).value()
        if (exist1 && exist1.id != func.id) {
            return {
                success: false,
                msg: "当前模块功能名称已经存在"
            }
        }
        if (func.id) {

            await db.find({ id: func.id })
                .assign(func)
                .write()
        } else {
            await db.insert(func).write()
        }
        return {
            success: true,
            msg: ""
        }
    }
}