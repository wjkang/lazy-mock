import model from '../models/baseModel'
import userService from '../services/userService'
import _ from 'lodash'
const context = 'interface'
const functionInterfaceContext = 'functionInterface'
module.exports = {
    getInterface: async (id) => {
        let db = await model.init(context)
        let entity = db.find({ id: id }).value()
        return entity
    },
    getInterfacePagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let interfaceList = db.value()
        let resultList = JSON.parse(JSON.stringify(interfaceList))
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
        if (filter.path) {
            resultList = _.filter(resultList, (o) => {
                return o.path.indexOf(filter.path) > -1
            });
        }
        if (filter.method) {
            resultList = _.filter(resultList, (o) => {
                return o.method.indexOf(filter.method) > -1
            });
        }
        if (filter.isLocked) {
            resultList = _.filter(resultList, (o) => {
                return o.isLocked.indexOf(filter.isLocked) > -1
            });
        }
        if (filter.description) {
            resultList = _.filter(resultList, (o) => {
                return o.description.indexOf(filter.description) > -1
            });
        }
        if (filter.functionId) {
            let functionInterfaceDb = await model.init(functionInterfaceContext)
            let functionInterfaceList = functionInterfaceDb.filter({ functionId: filter.functionId }).value()
            let interfaceIdList = functionInterfaceList.map(s => {
                return s.interfaceId
            })
            resultList = _.map(resultList, (item) => {
                if (interfaceIdList.indexOf(item.id) > -1) {
                    item.isAdd = 1
                } else {
                    item.isAdd = 2
                }
                return item
            })
            sortBy = "isAdd"
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
    delInterface: async (id) => {
        let db = await model.init(context)
        await db.remove({ id: id }).write()
    },
    saveInterface: async (entity) => {
        let db = await model.init(context)
        let exist = db.find({ path: entity.path, method: entity.method }).value()
        if (exist && exist.id != entity.id) {
            return {
                success: false,
                msg: "路径与方法组合必须唯一"
            }
        }
        if (entity.id) {
            await db.find({ id: entity.id })
                .assign(entity)
                .write()
        } else {
            await db.insert(entity).write()
        }
        return {
            success: true,
            msg: ""
        }
    },
    relate: async (functionInterface) => {
        let functionInterfaceDb = await model.init(functionInterfaceContext)
        if (functionInterface.action == 1) {
            await functionInterfaceDb.push({ functionId: functionInterface.functionId, interfaceId: functionInterface.interfaceId }).write()
        } else {
            await functionInterfaceDb.remove({ functionId: functionInterface.functionId, interfaceId: functionInterface.interfaceId }).write()
        }
    },
    getAccessInterfaceList: async (userId) => {
        let functionInterfaceDb = await model.init(functionInterfaceContext)
        let db = await model.init(context)
        let userFunctions = await userService.getUserFunctions(userId)
        let userFunctionIds = userFunctions.map(s => s.id)
        let functionInterfaceList = functionInterfaceDb.value()
        let userFunctionInterfaceList = functionInterfaceList.filter(s => {
            return userFunctionIds.indexOf(s.functionId) > -1
        })
        let userInterfaceIdList = userFunctionInterfaceList.map(s => s.interfaceId)
        let interfaceIdList = db.value()
        let userInterfaceList = interfaceIdList.filter(s => {
            return userInterfaceIdList.indexOf(s.id) > -1
        })
        return userInterfaceList
    }
}