import model from '../models/baseModel'
import _ from 'lodash'
const context = 'post'

let service = {
    getPostPagedList: async (pageIndex, pageSize, sortBy, descending) => {
        let db = await model.init(context)
        let list = db.value()
        let resultList = JSON.parse(JSON.stringify(list))
        let totalCount = resultList.length
        if (sortBy) {
            resultList = _.sortBy(resultList, [sortBy])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        else {
            resultList = _.sortBy(resultList, ["updatedDate"])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        let start = (pageIndex - 1) * pageSize
        let end = pageIndex * pageSize
        resultList = _.slice(resultList, start, end)

        resultList = resultList.map(s => {
            s.tags = s.tags.split(",")
            s.mdContent = ""
            s.htmlContent = ""

            return s
        })

        return {
            totalCount: totalCount,
            rows: resultList
        }

    },
    getPost: async (id) => {
        let db = await model.init(context)
        let post = db.find({ id: id }).value()
        return post
    },
    savePost: async (entity) => {
        let db = await model.init(context)
        let exist = db.find({ title: entity.title }).value()
        if (exist && exist.id != entity.id) {
            return {
                success: false,
                msg: "标题已经存在"
            }
        }
        if (entity.id) {
            delete entity.createdDate
            await db.find({ id: entity.id })
                .assign(entity)
                .write()
        } else {
            entity.createdDate = (new Date()).getTime()
            await db.insert(entity).write()
        }
        return {
            success: true,
            msg: ""
        }
    },
    getTopPost: async (query) => {
        let db = await model.init(context)
        let post = db.filter(query)
            .sortBy('sort')
            .take(1)
            .value()
        if (post.length > 0) {
            return post[0]
        }
        return null
    }
}
module.exports = service