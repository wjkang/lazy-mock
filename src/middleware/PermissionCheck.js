import userService from '../services/userService'
import * as responseTemplate from '../lib/responseTemplate'

module.exports = ({ permission = [], role = [] }) => {
    return async function (ctx, next) {
        if (!ctx.user || !ctx.user.userId) {
            return responseTemplate.businessError(ctx, "没有访问权限")
        }
        if (permission.length == 0 && role.length == 0) {
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
        return responseTemplate.businessError(ctx, "没有访问权限")
    }
};