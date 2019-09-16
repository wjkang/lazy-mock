const fs = require('fs-extra')

let requireDirectory = require('require-directory')
let modules = requireDirectory(module)
const ServerFullPath = require('../package.json').ServerFullPath
module.exports = async function migrate(migrateModules, cb) {
	for (let migrateModule of migrateModules) {
		let needMigrate = modules[migrateModule.entity]
		if (!needMigrate) {
			continue
		}
		// server
		if (migrateModule.keys.length > 0) {
			for (let key of migrateModule.keys) {
				if (key !== 'frontEnd' && key !== 'front') {
					await migrateItem(needMigrate.server[key])
				}
			}
		} else {
			for (let key in needMigrate.server) {
				await migrateItem(needMigrate.server[key])
			}
		}
		// 
	}
	cb()
}
async function migrateItem(item) {
	const fileFullPath = ServerFullPath + item.target
	let content = await fs.readFile(fileFullPath, 'utf-8')
	for (let detail of item.migrate) {
		let from = item.prefix + detail.from + item.suffix
		let to = item.prefix + detail.to + item.suffix
		content = content.replace(new RegExp(from, 'ig'), to)
	}
	await fs.writeFile(fileFullPath, content)
}
