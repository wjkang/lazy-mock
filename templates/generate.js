const fs = require('fs-extra')
const CodeGenerateConfig = require('./config').default
const Model = CodeGenerateConfig.model

module.exports = {
	run: function(gulp, nunjucksRender, rename, nunjucksRenderConfig) {
		nunjucksRenderConfig.data = {
			model: CodeGenerateConfig.model,
			config: CodeGenerateConfig.config
		}
		const ServerProjectRootPath = nunjucksRenderConfig.ServerFullPath
		//server
		const serverTemplatePath = 'templates/server/'
		gulp.src(`${serverTemplatePath}controller.njk`)
			.pipe(nunjucksRender(nunjucksRenderConfig))
			.pipe(rename(Model.name + '.js'))
			.pipe(
				gulp.dest(
					ServerProjectRootPath +
						CodeGenerateConfig.config.ControllerRelativePath
				)
			)

		gulp.src(`${serverTemplatePath}service.njk`)
			.pipe(nunjucksRender(nunjucksRenderConfig))
			.pipe(rename(Model.name + 'Service.js'))
			.pipe(
				gulp.dest(
					ServerProjectRootPath +
						CodeGenerateConfig.config.ServiceRelativePath
				)
			)

		gulp.src(`${serverTemplatePath}model.njk`)
			.pipe(nunjucksRender(nunjucksRenderConfig))
			.pipe(rename(Model.name + 'Model.js'))
			.pipe(
				gulp.dest(
					ServerProjectRootPath +
						CodeGenerateConfig.config.ModelRelativePath
				)
			)

		gulp.src(`${serverTemplatePath}db.njk`)
			.pipe(nunjucksRender(nunjucksRenderConfig))
			.pipe(rename(Model.name + '_db.json'))
			.pipe(
				gulp.dest(
					ServerProjectRootPath +
						CodeGenerateConfig.config.DBRelativePath
				)
			)

		gulp.src(`${serverTemplatePath}migration.njk`)
			.pipe(nunjucksRender(nunjucksRenderConfig))
			.pipe(rename(Model.name + '.js'))
			.pipe(gulp.dest(ServerProjectRootPath + '/migration/'))

		return gulp
			.src(`${serverTemplatePath}route.njk`)
			.pipe(nunjucksRender(nunjucksRenderConfig))
			.pipe(rename(Model.name + 'Route.js'))
			.pipe(
				gulp.dest(
					ServerProjectRootPath +
						CodeGenerateConfig.config.RouteRelativePath
				)
			)
	},
	quickAdd: async function(options, nunjucksRenderConfig) {
		const ServerProjectRootPath = nunjucksRenderConfig.ServerFullPath
		const serverTemplatePath = 'templates/server/quickAdd/'
		const existFileFullPath =
			ServerProjectRootPath +
			CodeGenerateConfig.config.ControllerRelativePath +
			options[0] +
			'.js'
		let controllerTemplate = await fs.readFile(
			`${ServerProjectRootPath}/${serverTemplatePath}controller.njk`,
			'utf-8'
		)
		let routeTemplate = await fs.readFile(
			`${ServerProjectRootPath}/${serverTemplatePath}route.njk`,
			'utf-8'
		)
		if (await fs.exists(existFileFullPath)) {
			console.log('exist entity')

			await fs.appendFile(
				ServerProjectRootPath +
					CodeGenerateConfig.config.ControllerRelativePath +
					options[0] +
					'.js',
				controllerTemplate.replace(/<\$ name \$>/g, options[2])
			)
			let routeContent = await fs.readFile(
				ServerProjectRootPath +
					CodeGenerateConfig.config.RouteRelativePath +
					options[0] +
					'Route.js',
				'utf-8'
			)
			let routeContentLines = routeContent.split('\n')
			routeContentLines.splice(
				-2,
				0,
				`    .get('${options[1]}', controllers.${options[0]}.${
					options[2]
				})\r`
			)
			await fs.writeFile(
				ServerProjectRootPath +
					CodeGenerateConfig.config.RouteRelativePath +
					options[0] +
					'Route.js',
				routeContentLines.join('\n')
			)
		} else {
			await fs.writeFile(
				ServerProjectRootPath +
					CodeGenerateConfig.config.ControllerRelativePath +
					options[0] +
					'.js',
				controllerTemplate.replace(/<\$ name \$>/g, options[2])
			)

			await fs.writeFile(
				ServerProjectRootPath +
					CodeGenerateConfig.config.RouteRelativePath +
					options[0] +
					'Route.js',
				routeTemplate
					.replace(/<\$ api \$>/g, options[1])
					.replace(/<\$ entity \$>/g, options[0])
					.replace(/<\$ method \$>/g, options[2])
			)
		}
	}
}
