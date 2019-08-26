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
        name: ctx.query.name,
        author: ctx.query.author,
        press: ctx.query.press,
        
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
if (entity.name == '') {
        return responseTemplate.businessError(ctx, '书名不能为空!')
    }
    if (entity.author == '') {
        return responseTemplate.businessError(ctx, '作者不能为空!')
    }
    if (entity.press == '') {
        return responseTemplate.businessError(ctx, '出版社不能为空!')
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
