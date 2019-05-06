import routeService from '../services/routeService'
import * as responseTemplate from '../lib/responseTemplate'

export let getRoute = async (ctx) => {
  let id = ctx.params.id
  let route = await routeService.getRoute(id)
  if (!route) {
    return responseTemplate.businessError(ctx, "route不存在!")
  }
  return responseTemplate.success(ctx, route)
}
export let getRouteList = async (ctx) => {
  let routeList = await routeService.getRouteList()
  return responseTemplate.success(ctx, routeList)
}
export let getRoutePagedList = async (ctx, next) => {
  let pageIndex = ctx.query.pageIndex
  let pageSize = ctx.query.pageSize
  let sortBy = ctx.query.sortBy
  let descending = ctx.query.descending
  let filter = {
    id: ctx.query.id,
    parentId: ctx.query.parentId,
    name: ctx.query.name,
    path: ctx.query.path,
    title: ctx.query.title,
    component: ctx.query.component,
    componentPath: ctx.query.componentPath,
    cache: ctx.query.cache,
    isLock: ctx.query.isLock,
    sort: ctx.query.sort,
  }
  let pagedList = await routeService.getRoutePagedList(pageIndex, pageSize, sortBy, descending, filter)
  responseTemplate.success(ctx, pagedList)
  return next()
}
export let delRoute = async (ctx) => {
  let id = ctx.params.id
  await routeService.delRoute(id)
  return responseTemplate.success(ctx, null)
}

export let delRoutes = async (ctx) => {
  let ids = JSON.parse(ctx.query.ids)
  for (let id of ids) {
    await routeService.delRoute(id)
  }
  return responseTemplate.success(ctx, null)
}

export let saveRoute = async (ctx) => {
  let entity = ctx.request.body
  if (!entity.name) {
    return responseTemplate.businessError(ctx, "name不能为空!")
  }
  if (!entity.path) {
    return responseTemplate.businessError(ctx, "path不能为空!")
  }
  if (!entity.title) {
    return responseTemplate.businessError(ctx, "标题不能为空!")
  }
  if (!entity.component && !entity.componentPath) {
    return responseTemplate.businessError(ctx, "组件与组件路径不能同时为空!")
  }
  let result = await routeService.saveRoute(entity)
  if (!result.success) {
    return responseTemplate.businessError(ctx, result.msg)
  }
  return responseTemplate.success(ctx, null)
}
