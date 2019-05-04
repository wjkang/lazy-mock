import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
import PermissionCheck from '../middleware/PermissionCheck'

const router = new KoaRouter()

router
  .get('/public/get', function (ctx, next) {
    ctx.body = '允许访问！'
  }) // 以/public开头则不用经过权限认证
  .post('/auth/login', controllers.auth.login)
  .post('/auth/logout', controllers.auth.logout)

  .get('/menu', PermissionCheck(), controllers.menu.getMenuList)
  .get('/menu/access', PermissionCheck(), controllers.menu.getAccessMenuList)
  .get('/menu/menufunctions', PermissionCheck(), controllers.menu.getMenuFunctions)
  .get('/menu/:id', PermissionCheck(), controllers.menu.getMenu)
  .post('/menu/save', PermissionCheck(), controllers.menu.saveMenu)
  .del('/menu/:id', PermissionCheck(), controllers.menu.delMenu)

  .get('/route', PermissionCheck(), controllers.route.getRouteList)
  .get('/route/paged', PermissionCheck(), controllers.route.getRoutePagedList)
  .get('/route/:id', PermissionCheck(), controllers.route.getRoute)
  .del('/route/:id', PermissionCheck(), controllers.route.delRoute)
  .del('/route/batchdel', PermissionCheck(), controllers.route.delRoutes)
  .post('/route/save', PermissionCheck(), controllers.route.saveRoute)

  .get('/role/pagedlist', PermissionCheck(), controllers.role.getRolePagedList)
  .get('/role/:id', PermissionCheck(), controllers.role.getRole)
  .get('/role/getpermissions/:roleId', PermissionCheck(), controllers.role.getRolePermissions)
  .del('/role/del', PermissionCheck(), controllers.role.delRole)
  .del('/role/batchdel', PermissionCheck(), controllers.role.delRoles)
  .post('/role/save', PermissionCheck(), controllers.role.saveRole)
  .post('/role/savepermission', PermissionCheck(), controllers.role.savePermission)

  .get('/user/pagedlist', PermissionCheck(), controllers.user.getUserPagedList)
  .get('/user/info', controllers.user.getUserInfo)
  .get('/user/:id', PermissionCheck(), controllers.user.getUser)
  .del('/user/del', PermissionCheck(), controllers.user.delUser)
  .del('/user/batchdel', PermissionCheck(), controllers.user.delUsers)
  .post('/user/save', PermissionCheck(), controllers.user.saveUser)
  .post('/user/editroleuser', PermissionCheck(), controllers.user.editRoleUser)

  .get('/interface/paged', PermissionCheck(), controllers.interface.getInterfacePagedList)
  .get('/interface/:id', PermissionCheck(), controllers.interface.getInterface)
  .del('/interface/del', PermissionCheck(), controllers.interface.delInterface)
  .del('/interface/batchdel', PermissionCheck(), controllers.interface.delInterfaces)
  .post('/interface/save', PermissionCheck(), controllers.interface.saveInterface)
  .post('/interface/relate', PermissionCheck(), controllers.interface.relateInterface)

  .get('/requestlog/pagedlist', controllers.requestlog.getRequestLogPagedList)
  .post('/resetdb', controllers.system.resetDb)


module.exports = router
