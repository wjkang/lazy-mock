import menuService from '../services/memuService'
import roleService from '../services/roleService'
import * as responseTemplate from '../lib/responseTemplate'

export let getMenuList = async (ctx) => {
    let menuList = await menuService.getMenuList()
    return responseTemplate.success(ctx, menuList)
}

export let getAccessMenuList = async (ctx) => {
    let menuList = await menuService.getAccessMenuList(ctx.user.userId)
    return responseTemplate.success(ctx, menuList)
}

export let saveMenu = async (ctx) => {
    let menu = ctx.request.body;
    if(menu.name==""){
        return responseTemplate.businessError(ctx, "名称不能为空!")
    }
    if(menu.title==""){
        return responseTemplate.businessError(ctx, "标题不能为空!")
    }
    if(menu.icon==""){
        return responseTemplate.businessError(ctx, "请选择图标!")
    }
    let result = await menuService.saveMenu(menu)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}

export let getMenuFunctions = async (ctx) => {
    let menuId = ctx.query.menuId
    let roleId = ctx.query.roleId
    let [menuFunctions, roleFunctions] =
        await Promise.all([menuService.getMenuFunctions(menuId), roleService.getRoleFunctions(roleId)])
    return responseTemplate.success(ctx, {
        menuFunctions: menuFunctions,
        roleFunctions: roleFunctions
    })
}

