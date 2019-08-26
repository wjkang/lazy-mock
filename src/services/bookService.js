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
        if (filter.name) {
            resultList = _.filter(resultList, (o) => {
                return o.name.indexOf(filter.name) > -1
            });
        }
        if (filter.author) {
            resultList = _.filter(resultList, (o) => {
                return o.author.indexOf(filter.author) > -1
            });
        }
        if (filter.press) {
            resultList = _.filter(resultList, (o) => {
                return o.press.indexOf(filter.press) > -1
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