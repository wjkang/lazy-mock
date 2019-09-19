import model from '../models/bookModel'
import _ from 'lodash'
const context = 'book'
module.exports = {
    getBook: async (id) => {
        let db = await model.init(context)
        let book = db.find({ id: id }).value()
        return book
    },
    getBookPagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let bookList = db.value()
        let resultList = bookList
        if (filter.id) {
            resultList = _.filter(resultList, (o) => {
                return o.id.indexOf(filter.id) > -1
            });
        }
        if (filter.applyNo) {
            resultList = _.filter(resultList, (o) => {
                return o.applyNo.indexOf(filter.applyNo) > -1
            });
        }
        if (filter.applyTitle) {
            resultList = _.filter(resultList, (o) => {
                return o.applyTitle.indexOf(filter.applyTitle) > -1
            });
        }
        if (filter.starterUid) {
            resultList = _.filter(resultList, (o) => {
                return o.starterUid.indexOf(filter.starterUid) > -1
            });
        }
        if (filter.starterName) {
            resultList = _.filter(resultList, (o) => {
                return o.starterName.indexOf(filter.starterName) > -1
            });
        }
        if (filter.orgCode) {
            resultList = _.filter(resultList, (o) => {
                return o.orgCode.indexOf(filter.orgCode) > -1
            });
        }
        if (filter.orgName) {
            resultList = _.filter(resultList, (o) => {
                return o.orgName.indexOf(filter.orgName) > -1
            });
        }
        if (filter.roleCode) {
            resultList = _.filter(resultList, (o) => {
                return o.roleCode.indexOf(filter.roleCode) > -1
            });
        }
        if (filter.roleName) {
            resultList = _.filter(resultList, (o) => {
                return o.roleName.indexOf(filter.roleName) > -1
            });
        }
        if (filter.avatarUrl) {
            resultList = _.filter(resultList, (o) => {
                return o.avatarUrl.indexOf(filter.avatarUrl) > -1
            });
        }
        if (filter.startTime) {
            resultList = _.filter(resultList, (o) => {
                return o.startTime.indexOf(filter.startTime) > -1
            });
        }
        if (filter.status) {
            resultList = _.filter(resultList, (o) => {
                return o.status.indexOf(filter.status) > -1
            });
        }
        if (filter.createdAt) {
            resultList = _.filter(resultList, (o) => {
                return o.createdAt.indexOf(filter.createdAt) > -1
            });
        }
        
        let totalCount = resultList.length
        if (sortBy) {
            resultList = _.sortBy(resultList, [sortBy])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        if(!pageIndex||pageIndex<=0){
            pageIndex=1
        }
        if(pageSize){
            let start = (pageIndex - 1) * pageSize
            let end = pageIndex * pageSize
            resultList = _.slice(resultList, start, end)
        }

        return {
            totalCount: totalCount,
            rows: resultList
        }

    },
    delBook: async (id) => {
        let db = await model.init(context)
        await db.remove({ id: id }).write()
    },
    saveBook: async (book) => {
        let db = await model.init(context)
        if (book.id) {
            await db.find({ id: book.id })
                .assign(book)
                .write()
        } else {
            await db.insert(book).write()
        }
        return {
            success: true,
            msg: ''
        }
    }
}