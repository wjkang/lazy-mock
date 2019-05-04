const CodeGenerateConfig = require('./config').default;

const ServerProjectRootPath = CodeGenerateConfig.config.ServerRootPath;
const Model = CodeGenerateConfig.model;

module.exports = function generate(gulp, nunjucksRender, rename, nunjucksRenderConfig) {
    nunjucksRenderConfig.data = {
        model: CodeGenerateConfig.model,
        config: CodeGenerateConfig.config
    }
    //server
    gulp.src('codeGenerate/serverTemplates/controller.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + '.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ControllerRelativePath));

    gulp.src('codeGenerate/serverTemplates/service.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'Service.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ServiceRelativePath));

    gulp.src('codeGenerate/serverTemplates/model.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'Model.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ModelRelativePath));

    gulp.src('codeGenerate/serverTemplates/db.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + '_db.json'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.DBRelativePath));

    gulp.src('codeGenerate/serverTemplates/apiMap.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'ApiMap.txt'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.RouteRelativePath));

    return gulp.src('codeGenerate/serverTemplates/route.njk')
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'Route.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.RouteRelativePath));
}