import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
import proxy from '../middleware/Proxy'

const router = new KoaRouter()
router
    .get('/book/proxy', controllers.book.bookProxy)
    .get('/book/paged', controllers.book.getBookPagedList)
    .get('/book/:id', controllers.book.getBook)
    .del('/book/del', controllers.book.delBook)
    .del('/book/batchdel', controllers.book.delBooks)
    .post('/book/save', controllers.book.saveBook)
    .all(/(|^$)/, proxy('https://baidu.com'))
module.exports = router