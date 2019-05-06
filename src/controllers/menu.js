import menuService from '../services/memuService'
import roleService from '../services/roleService'
import * as responseTemplate from '../lib/responseTemplate'

export let getMenuList = async (ctx) => {
    let menuList = await menuService.getMenuList()
    return responseTemplate.success(ctx, menuList)
}

export let getMenu = async (ctx) => {
    let id = ctx.params.id
    let menu = await menuService.getMenu(id)
    if (!menu) {
        return responseTemplate.businessError(ctx, "菜单不存在")
    }
    return responseTemplate.success(ctx, menu)
}
export let saveMenu = async (ctx) => {
    let menu = ctx.request.body;
    if (menu.title == "") {
        return responseTemplate.businessError(ctx, "标题不能为空!")
    }
    if (!menu.type) {
        return responseTemplate.businessError(ctx, "请选择类型!")
    }
    if (menu.type == 1 && menu.path == "") {
        return responseTemplate.businessError(ctx, "路径不能为空!")
    }
    let result = await menuService.saveMenu(menu)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}
export let delMenu = async (ctx) => {
    let id = ctx.params.id
    let result = await menuService.delMenu(id)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}

