const CodeGenerateConfig = require('./config').default;

const ServerProjectRootPath = CodeGenerateConfig.config.ServerRootPath;
const Model = CodeGenerateConfig.model;

module.exports = function generate(gulp, nunjucksRender, rename, nunjucksRenderConfig) {
    nunjucksRenderConfig.data = {
        model: CodeGenerateConfig.model,
        config: CodeGenerateConfig.config
    }
    //server
    gulp.src('templates/server/controller.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + '.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ControllerRelativePath));

    gulp.src('templates/server/service.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'Service.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ServiceRelativePath));

    gulp.src('templates/server/model.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'Model.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ModelRelativePath));

    gulp.src('templates/server/db.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + '_db.json'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.DBRelativePath));

    return gulp.src('templates/server/route.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'Route.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.RouteRelativePath));
}