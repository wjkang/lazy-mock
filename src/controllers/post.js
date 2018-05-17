import postService from '../services/postService'
import * as responseTemplate from '../lib/responseTemplate'

export let getPostPagedList = async (ctx) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let pagedList = await postService.getPostPagedList(pageIndex, pageSize, sortBy, descending)
    return responseTemplate.success(ctx, pagedList)
}
export let getPost = async (ctx) => {
    let id = ctx.params.id
    let post = await postService.getPost(id)
    if (!post) {
        return responseTemplate.businessError(ctx, "文章不存在")
    }
    return responseTemplate.success(ctx, post)
}

export let savePost = async (ctx) => {
    let entity = ctx.request.body;
    if (entity.title == "") {
        return responseTemplate.businessError(ctx, "标题不能为空!")
    }
    if (entity.shortContent == "") {
        return responseTemplate.businessError(ctx, "简述不能为空!")
    }
    if (entity.mdContent == "") {
        return responseTemplate.businessError(ctx, "内容不能为空!")
    }
    if (entity.catelog == "") {
        return responseTemplate.businessError(ctx, "分类不能为空!")
    }
    entity.updatedDate = (new Date()).getTime()
    if (entity.publishedDate) {
        entity.isTimePublish = 1
    } else {
        entity.isTimePublish = 0
    }
    entity.tags = entity.tags.join(",")
    entity.keyWord = entity.keyWord.join(",")
    let result = await postService.savePost(entity)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}

export let getTopPost = async (ctx) => {
    let catelog = ctx.query.catelog
    let status = ctx.query.status
    let query = {}
    if (catelog) {
        query.catelog = catelog
    }
    if (status) {
        query.status = parseInt(status)
    }
    let post = await postService.getTopPost(query)
    let result = null
    if (post) {
        result = {}
        result.title = post.title
        result.catelog = post.catelog
        result.tags = post.tags
        result.keyWord = post.keyWord
        result.htmlContent = post.htmlContent
    }
    return responseTemplate.success(ctx, result)
}