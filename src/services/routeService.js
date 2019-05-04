import model from '../models/baseModel'
import userService from './userService'
import _ from 'lodash'
const context = 'route'
let buildChildren = (parent, list) => {
    parent.children = []
    let children = list.filter((item) => {
        return item.parentId == parent.id
    })
    for (let item of children) {
        buildChildren(item, list)
    }
    parent.children.push(...children)
}
module.exports = {
    getRoute: async (id) => {
        let db = await model.init(context)
        let route = db.find({ id: id }).value()
        return route
    },
    getRouteList: async () => {
        let db = await model.init(context)
        let list = JSON.parse(JSON.stringify(db.value()))
        list = _.sortBy(list, ["sort"])
        let parentList = list.filter((item) => {
            return !item.parentId
        })
        for (let item of parentList) {
            buildChildren(item, list)
        }
        return parentList
    },
    getRoutePagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let routeList = db.value()
        let resultList = routeList

        if (filter.id) {
            resultList = _.filter(resultList, (o) => {
                return o.id.indexOf(filter.id) > -1
            });
        }

        if (filter.parentId) {
            resultList = _.filter(resultList, (o) => {
                return o.parentId.indexOf(filter.parentId) > -1
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

        if (filter.title) {
            resultList = _.filter(resultList, (o) => {
                return o.title.indexOf(filter.title) > -1
            });
        }

        if (filter.component) {
            resultList = _.filter(resultList, (o) => {
                return o.component.indexOf(filter.component) > -1
            });
        }

        if (filter.componentPath) {
            resultList = _.filter(resultList, (o) => {
                return o.componentPath.indexOf(filter.componentPath) > -1
            });
        }

        if (filter.cache) {
            resultList = _.filter(resultList, (o) => {
                return o.cache.indexOf(filter.cache) > -1
            });
        }

        if (filter.isLock) {
            resultList = _.filter(resultList, (o) => {
                return o.isLock.indexOf(filter.isLock) > -1
            });
        }

        if (filter.sort) {
            resultList = _.filter(resultList, (o) => {
                return o.sort.indexOf(filter.sort) > -1
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
    delRoute: async (id) => {
        let db = await model.init(context)
        let child = db.find({ parentId: id }).value()
        if (child) {
            return {
                success: false,
                msg: "请先删除子路由"
            }
        }
        await db.remove({ id: id }).write()
        return {
            success: true,
            msg: ""
        }
    },
    saveRoute: async (route) => {
        let db = await model.init(context)
        let exist = db.find({ name: route.name }).value()
        if (exist && exist.id != route.id) {
            return {
                success: false,
                msg: "name已经存在"
            }
        }
        if (route.id) {
            await db.find({ id: route.id })
                .assign(route)
                .write()
        } else {
            await db.insert(route).write()
        }
        return {
            success: true,
            msg: ""
        }
    },
    getAccessRouteList: async (userId) => {
        let db = await model.init(context)
        let routeList = JSON.parse(JSON.stringify(db.value()))
        routeList = _.sortBy(routeList, ["sort"])
        let parentRouteList = routeList.filter((item) => {
            return item.parentId == 0 && !item.isLock
        })
        let isAdmin = await userService.isAdmin(userId)
        let userPermission = await userService.getUserPermission(userId)
        if (isAdmin) {
            for (let route of parentRouteList) {
                buildRoute(route, routeList)
            }
        } else {
            for (let route of parentRouteList) {
                buildAccessRoute(route, routeList, userPermission)
            }
        }
        checkAccssRoute(parentRouteList, routeList)
        return parentRouteList
    },
}
let buildRoute = (parentRoute, routeList) => {
    parentRoute.children = []
    let children = routeList.filter((item) => {
        return item.parentId == parentRoute.id
    })
    for (let route of children) {
        buildRoute(route, routeList)
    }
    parentRoute.children.push(...children)
}
let buildAccessRoute = (parentRoute, routeList, userPermission) => {
    parentRoute.children = []
    let children = routeList.filter((item) => {
        return item.parentId == parentRoute.id && (!item.permission || userPermission.indexOf(item.permission) > -1)
    })
    //父级没有权限访问，子级也不能访问
    for (let route of children) {
        buildAccessRoute(route, routeList, userPermission)
    }
    parentRoute.children.push(...children)
}
let checkAccssRoute = (accessRouteList, routeList) => {
    for (let item of accessRouteList) {
        if (item.children) {
            checkAccssRoute(item.children, routeList)
        }
    }
    _.remove(accessRouteList, (item) => {
        return item.children.length == 0 && routeList.some(s => {
            return s.parentId == item.id
        })
    });
}