import userService from '../services/userService'
import interfaceService from '../services/interfaceService'
import * as responseTemplate from '../lib/responseTemplate'
import { match, parse } from 'matchit';

module.exports = (permission = [], role = [], apiCheck = true) => {
    return async function (ctx, next) {
        if (!ctx.user || !ctx.user.userId) {
            return responseTemplate.businessError(ctx, "没有访问权限")
        }
        if (permission.length == 0 && role.length == 0 && !apiCheck) {
            return next()
        }
        let isAdmin = await userService.isAdmin(ctx.user.userId)
        if (isAdmin) {
            return next()
        }
        let roles = await userService.getUserRole(ctx.user.userId)
        let r = roles.filter(s => {
            return role.indexOf(s) > -1
        })
        if (r && r.length > 0) {
            return next()
        }
        let userPermisssions = await userService.getUserPermission(ctx.user.userId)
        let p = userPermisssions.filter(s => {
            return permission.indexOf(s) > -1
        })
        if (p && p.length > 0) {
            return next()
        }
        let userAccessInterfaces = await interfaceService.getAccessInterfaceList(ctx.user.userId)
        userAccessInterfaces = userAccessInterfaces.filter(s => s.method.toUpperCase() === ctx.request.method.toUpperCase()).map(s => parse(s.path))
        let matched = match(ctx.request.url.split("?")[0], userAccessInterfaces)
        if (matched.length > 0) {
            return next()
        }
        return responseTemplate.businessError(ctx, "没有访问权限")
    }
};