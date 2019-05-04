import model from '../models/baseModel'
import _ from 'lodash'
const context = 'role'
const permissionContext = "permission"
const roleUserContext = 'roleUser'
module.exports = {
    getRole: async (id) => {
        let db = await model.init(context)
        let role = db.find({ id: id }).value()
        return role
    },
    getRolePagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let roleList = db.value()
        let resultList = roleList
        if (filter.code) {
            resultList = _.filter(resultList, (o) => {
                return o.code.indexOf(filter.code) > -1
            });
        }
        if (filter.name) {
            resultList = _.filter(resultList, (o) => {
                return o.name.indexOf(filter.name) > -1
            });
        }
        if (filter.userId) {
            let roleUserDb = await model.init(roleUserContext)
            let roleUserList = roleUserDb.filter({ userId: filter.userId }).value()
            roleUserList = roleUserList.map(s => {
                return s.roleId
            })
            resultList = _.map(resultList, (item) => {
                if (roleUserList.indexOf(item.id) > -1) {
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
        let exist = db.find({ code: role.code }).value()
        if (exist && exist.id != role.id) {
            return {
                success: false,
                msg: "角色编码已经存在"
            }
        }
        let exist1 = db.find({ name: role.name }).value()
        if (exist1 && exist1.id != role.id) {
            return {
                success: false,
                msg: "角色名称已经存在"
            }
        }
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
    },
    getRoleFunctions: async (roleId) => {
        let db = await model.init(permissionContext)
        let list = db.value()
        let roleFunctions = list.filter(s => {
            return s.roleId == roleId
        })
        return roleFunctions
    },
    getRoleFuntionsByRoleIds: async (roleIds) => {
        let db = await model.init(permissionContext)
        let list = db.value()
        let roleFunctions = list.filter(s => {
            return roleIds.indexOf(s.roleId) > -1
        })
        return roleFunctions
    },
    savePermission: async (roleId, permissions) => {
        let db = await model.init(permissionContext)
        await await db.remove({ roleId: roleId }).write()
        for (let permission of permissions) {
            await db.insert({
                roleId: roleId,
                functionId: permission,
            }).write()
        }
    },
    getRoleListByIdList: async (idList) => {
        let db = await model.init(context)
        let roleList = db.value()
        let result = roleList.filter(s => {
            return idList.indexOf(s.id) > -1
        })
        return result
    }
}