import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
import PermissionCheck from '../middleware/PermissionCheck'

const router = new KoaRouter()

router
  .get('/public/get', function (ctx, next) {
    ctx.body = '禁止访问！'
  }) // 以/public开头则不用经过权限认证
  .post('/auth/login', controllers.auth.login)
  .post('/auth/logout', controllers.auth.logout)
  
  .get('/menu',PermissionCheck({permission:["menu_view"]}), controllers.menu.getMenuList)
  .get('/menu/getaccessmenu',controllers.menu.getAccessMenuList)
  .get('/menu/menufunctions',controllers.menu.getMenuFunctions)
  .post('/menu/savemenu',PermissionCheck({permission:["menu_edit"]}),controllers.menu.saveMenu)
  
  .get('/function/pagedlist',PermissionCheck({permission:["function_view"],role:["test"]}),controllers.function.getFunctionPagedList)
  .del('/function/del',PermissionCheck({permission:["function_del"]}),controllers.function.delFuntion)
  .del('/function/batchdel',PermissionCheck({permission:["function_del"]}),controllers.function.delFuntions)
  .post('/function/save',PermissionCheck({permission:["function_edit"]}),controllers.function.saveFuntion)

  .get('/role/pagedlist',PermissionCheck({permission:["role_view","role_permission_view","role_user_view"]}),controllers.role.getRolePagedList)
  .del('/role/del',PermissionCheck({permission:["role_del"]}),controllers.role.delRole)
  .del('/role/batchdel',PermissionCheck({permission:["role_del"]}),controllers.role.delRoles)
  .post('/role/save',PermissionCheck({permission:["role_edit"]}),controllers.role.saveRole)
  .post('/role/savepermission',PermissionCheck({permission:["role_permission_edit"]}),controllers.role.savePermission)

  .get('/user/pagedlist',PermissionCheck({permission:["user_view","user_role_view"]}),controllers.user.getUserPagedList)
  .get('/user/info',controllers.user.getUserInfo)
  .del('/user/del',PermissionCheck({permission:["user_del"]}),controllers.user.delUser)
  .del('/user/batchdel',PermissionCheck({permission:["user_del"]}),controllers.user.delUsers)
  .post('/user/save',PermissionCheck({permission:["user_edit"]}),controllers.user.saveUser)
  .post('/user/editroleuser',PermissionCheck({permission:["role_user_edit","user_role_edit"]}),controllers.user.editRoleUser)

  .get('/requestlog/pagedlist',controllers.requestlog.getRequestLogPagedList)

  .get('/post/pagedlist',PermissionCheck({permission:["post_view"]}),controllers.post.getPostPagedList)
  .get('/post/top',controllers.post.getTopPost)
  .get('/post/:id',controllers.post.getPost)
  .post('/post/save',PermissionCheck({permission:["post_edit"]}),controllers.post.savePost)

  .post('/resetdb',controllers.system.resetDb)


  .all('/upload', controllers.upload.default)
  .get('/api/:name', controllers.api.Get)
  .post('/api/:name', controllers.api.Post)
  .put('/api/:name', controllers.api.Put)
  .del('/api/:name', controllers.api.Delect)

module.exports = router
