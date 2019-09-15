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
			`${ServerProjectRootPath}${serverTemplatePath}quickAdd/controller.njk`,
			'utf-8'
		)
		let routeTemplate = await fs.readFile(
			`${ServerProjectRootPath}${serverTemplatePath}quickAdd/route.njk`,
			'utf-8'
		)
		if (await fs.exists(existFileFullPath)) {
			console.log('exist entity')

			await fs.appendFile(
				ServerProjectRootPath +
					CodeGenerateConfig.config.ControllerRelativePath +
					options[0] +
					'.js',
				controllerTemplate.replace(/<$ name $>/g, options[2])
			)
			let controllerContent = await fs.readFile(
				ServerProjectRootPath +
					CodeGenerateConfig.config.ControllerRelativePath +
					options[0] +
					'.js',
				'utf-8'
			)
			let controllerContentLines = controllerContent.split('\n')
			console.log(controllerContentLines)
		}
	}
}
