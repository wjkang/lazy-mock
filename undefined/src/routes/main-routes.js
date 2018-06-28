.get('/role/pagedlist',controllers.role.getRolePagedList)
.del('/role/del',controllers.role.delRole)
.del('/role/batchdel',controllers.role.delRoles)
.post('/role/save',controllers.role.saveRole)