const path = require('path')
const CodeGenerateConfig = require('./config').default;
const Model = CodeGenerateConfig.model;

module.exports = function generate(gulp, nunjucksRender, rename, nunjucksRenderConfig) {
    nunjucksRenderConfig.data = {
        model: CodeGenerateConfig.model,
        config: CodeGenerateConfig.config
    }
    const ServerProjectRootPath = nunjucksRenderConfig.ServerFullPath;
    const FrontendFullPath = nunjucksRenderConfig.FrontendFullPath;
    //server
    const serverTemplatePath = 'templates/server/'
    gulp.src(`${serverTemplatePath}controller.njk`)
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + '.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ControllerRelativePath));

    gulp.src(`${serverTemplatePath}service.njk`)
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'Service.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ServiceRelativePath));

    gulp.src(`${serverTemplatePath}model.njk`)
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'Model.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ModelRelativePath));

    gulp.src(`${serverTemplatePath}db.njk`)
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + '_db.json'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.DBRelativePath));

    gulp.src(`${serverTemplatePath}route.njk`)
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + 'Route.js'))
        .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.RouteRelativePath));

    //page
    const pageTemplatePath = 'templates/front-end/'
    gulp.src(`${pageTemplatePath}api.njk`)
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename(Model.name + '.js'))
        .pipe(gulp.dest(path.join(FrontendFullPath, CodeGenerateConfig.config.APIRelativePath, Model.module)));

    gulp.src(`${pageTemplatePath}editForm.njk`)
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename('editForm.vue'))
        .pipe(gulp.dest(path.join(FrontendFullPath, CodeGenerateConfig.config.PagesRelativePath, Model.module, Model.name)));

    return gulp.src(`${pageTemplatePath}index.njk`)
        .pipe(nunjucksRender(nunjucksRenderConfig))
        .pipe(rename('index.vue'))
        .pipe(gulp.dest(path.join(FrontendFullPath, CodeGenerateConfig.config.PagesRelativePath, Model.module, Model.name)));
}