let requireDirectory = require('require-directory')
let modules = requireDirectory(module)
const ServerFullPath = require('../package.json').ServerFullPath
module.exports = async function migrate(migrateModules, cb) {
	for (let migrateModule of migrateModules) {
		let needMigrate = modules[migrateModule.entity]
		if (!needMigrate) {
			continue
		}
		if (migrateModule.keys.length > 0) {
			for (let key of migrateModule.keys) {
				await migrateItem(needMigrate[key])
			}
		} else {
			for (let key in needMigrate) {
				await migrateItem(needMigrate[key])
			}
		}
	}
	cb()
}
function migrateItem(item) {
	const fileFullPath = ServerFullPath + item.target
	
	return Promise.resolve(1)
}
