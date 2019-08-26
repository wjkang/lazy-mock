import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

const router = new KoaRouter()
router
    .get('/book/paged', controllers.book.getBookPagedList)
    .get('/book/:id', controllers.book.getBook)
    .del('/book/del', controllers.book.delBook)
    .del('/book/batchdel', controllers.book.delBooks)
    .post('/book/save', controllers.book.saveBook)

module.exports = router