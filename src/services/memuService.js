import model from '../models/baseModel'
import userService from './userService'
import _ from 'lodash'
const context = 'menu'
let buildMenu = (parentMenu, menuList) => {
    parentMenu.children = []
    let children = menuList.filter((item) => {
        return item.parentId == parentMenu.id
    })
    for (let menu of children) {
        buildMenu(menu, menuList)
    }
    parentMenu.children.push(...children)
}
let buildAccessMenu = (parentMenu, menuList, userPermission) => {
    parentMenu.children = []
    let children = menuList.filter((item) => {
        return item.parentId == parentMenu.id && (!item.permission || userPermission.indexOf(item.permission) > -1)
    })
    //父级没有权限访问，子级也不能访问
    for (let menu of children) {
        buildAccessMenu(menu, menuList, userPermission)
    }
    parentMenu.children.push(...children)
}
let checkAccssMenu = (accessMenuList, menuList) => {
    for (let item of accessMenuList) {
        if (item.children) {
            checkAccssMenu(item.children, menuList)
        }
    }
    _.remove(accessMenuList, (item) => {
        return item.children.length == 0 && menuList.some(s => {
            return s.parentId == item.id
        })
    });
}
let menuService = {
    getMenu: async (id) => {
        let db = await model.init(context)
        let menu = db.find({ id: id }).value()
        if (!menu) {
            menu = db.find({ id: parseInt(id) }).value()
        }
        return menu
    },
    getMenuList: async () => {
        let db = await model.init(context)
        let menuList = JSON.parse(JSON.stringify(db.value()))
        menuList = _.sortBy(menuList, ["sort"])
        let parentMenuList = menuList.filter((item) => {
            return item.parentId === 0
        })
        for (let menu of parentMenuList) {
            buildMenu(menu, menuList)
        }
        return parentMenuList
    },
    getAccessMenuList: async (userId) => {
        let db = await model.init(context)
        let menuList = JSON.parse(JSON.stringify(db.filter({ type: 1 }).value()))
        menuList = _.sortBy(menuList, ["sort"])
        let parentMenuList = menuList.filter((item) => {
            return item.parentId == 0 && !item.isLock
        })
        let isAdmin = await userService.isAdmin(userId)
        let userPermission = await userService.getUserPermission(userId)
        if (isAdmin) {
            for (let menu of parentMenuList) {
                buildMenu(menu, menuList)
            }
        } else {
            for (let menu of parentMenuList) {
                buildAccessMenu(menu, menuList, userPermission)
            }
        }
        checkAccssMenu(parentMenuList, menuList)
        return parentMenuList
    },
    saveMenu: async (menu) => {
        let db = await model.init(context)
        if (menu.id) {
            await db.find({ id: menu.id })
                .assign(menu)
                .write()
        } else {
            await db.insert(menu).write()
        }
        return {
            success: true,
            msg: ""
        }
    },
    delMenu: async (menuId) => {
        let db = await model.init(context)
        let child = db.find({ parentId: menuId }).value()
        if (child) {
            return {
                success: false,
                msg: "请先删除子菜单"
            }
        }
        await db.remove({ id: menuId }).write()
        return {
            success: true,
            msg: ""
        }
    }
}
module.exports = menuService