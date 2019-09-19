import bookService from '../services/bookService'
import * as responseTemplate from '../lib/responseTemplate'
import proxy from '../lib/proxy'

export let getBook = async (ctx) => {
    let id = ctx.params.id
    let book = await bookService.getBook(id)
    if (!book) {
        return responseTemplate.businessError(ctx, 'book不存在!')
    }
    return responseTemplate.success(ctx, book)
}
export let getBookPagedList = async (ctx, next) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let filter = {
        id: ctx.query.id,
        applyNo: ctx.query.applyNo,
        applyTitle: ctx.query.applyTitle,
        starterUid: ctx.query.starterUid,
        starterName: ctx.query.starterName,
        orgCode: ctx.query.orgCode,
        orgName: ctx.query.orgName,
        roleCode: ctx.query.roleCode,
        roleName: ctx.query.roleName,
        avatarUrl: ctx.query.avatarUrl,
        startTime: ctx.query.startTime,
        status: ctx.query.status,
        createdAt: ctx.query.createdAt,
        
    }
    let pagedList = await bookService.getBookPagedList(pageIndex, pageSize, sortBy, descending, filter)
    return responseTemplate.success(ctx, pagedList)
}
export let delBook = async (ctx) => {
    let id = ctx.query.id
    await bookService.delBook(id)
    return responseTemplate.success(ctx, null)
}

export let delBooks = async (ctx) => {
    let ids = JSON.parse(ctx.query.ids)
    for (let id of ids) {
        await bookService.delBook(id)
    }
    return responseTemplate.success(ctx, null)
}

export let saveBook = async (ctx) => {
    let entity = ctx.request.body
if (entity.applyNo == '') {
        return responseTemplate.businessError(ctx, 'applyNo不能为空!')
    }
    if (entity.applyTitle == '') {
        return responseTemplate.businessError(ctx, 'applyTitle不能为空!')
    }
    if (entity.starterUid == '') {
        return responseTemplate.businessError(ctx, 'starterUid不能为空!')
    }
    if (entity.starterName == '') {
        return responseTemplate.businessError(ctx, 'starterName不能为空!')
    }
    if (entity.orgCode == '') {
        return responseTemplate.businessError(ctx, 'orgCode不能为空!')
    }
    if (entity.orgName == '') {
        return responseTemplate.businessError(ctx, 'orgName不能为空!')
    }
    if (entity.roleCode == '') {
        return responseTemplate.businessError(ctx, 'roleCode不能为空!')
    }
    if (entity.roleName == '') {
        return responseTemplate.businessError(ctx, 'roleName不能为空!')
    }
    if (entity.avatarUrl == '') {
        return responseTemplate.businessError(ctx, 'avatarUrl不能为空!')
    }
    if (entity.startTime == '') {
        return responseTemplate.businessError(ctx, 'startTime不能为空!')
    }
    if (entity.status == '') {
        return responseTemplate.businessError(ctx, 'status不能为空!')
    }
    if (entity.createdAt == '') {
        return responseTemplate.businessError(ctx, 'createdAt不能为空!')
    }
    let result = await bookService.saveBook(entity)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}

export let bookProxy = async ctx => {
	let result = await proxy(ctx, 'https://www.baidu.com')
	ctx.body = result.type.indexOf('html') > -1 ? result.text : result.body
}
