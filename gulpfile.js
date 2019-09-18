require('@babel/register')
require('@babel/polyfill')
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const rename = require('gulp-rename')
const nunjucksRender = require('gulp-nunjucks-render')
const codeGenerate = require('./templates/generate')
const migrate = require('./migration')

var jsScript = 'node'
if (process.env.npm_config_argv !== undefined && process.env.npm_config_argv.indexOf('debug') > 0) {
  jsScript = 'node debug'
}
gulp.task('nodemon', function () {
  return nodemon({
    script: 'build/dev-server.js',
    execMap: {
      js: jsScript
    },
    verbose: true,
    ignore: ['build/*.js', 'dist/*.js', 'nodemon.json', '.git', 'node_modules/**/node_modules', 'gulpfile.js', 'src/db', 'codeGenerate'],
    env: {
      NODE_ENV: 'development'
    },
    ext: 'js json'
  })
})

const ServerFullPath = require('./package.json').ServerFullPath;
const FrontendFullPath = require('./package.json').FrontendFullPath;
const nunjucksRenderConfig = {
  path: 'templates/server',
  envOptions: {
    tags: {
      blockStart: '<%',
      blockEnd: '%>',
      variableStart: '<$',
      variableEnd: '$>',
      commentStart: '<#',
      commentEnd: '#>'
    },
  },
  ext: '.js',
  ServerFullPath,
  FrontendFullPath
}

gulp.task('code', function() {
	require('events').EventEmitter.defaultMaxListeners = 0
	return codeGenerate.run(gulp, nunjucksRender, rename, nunjucksRenderConfig)
})

gulp.task('migrate', async function(cb) {
	let options = process.argv[4]
	if (options) {
		options = JSON.parse(options)
	}
	let modules = []
	for (let module of options) {
		let s = module.split(':')
		modules.push({
			entity: s[0],
			keys: s[1] ? s[1].split(',') : []
		})
	}
	await migrate(modules, cb)
})

gulp.task('add', async function(cb) {
	let options = process.argv[4].split('|')
	if (options.length === 1) {
		options[1] = 'new_api'
	}
	if (options.length === 2) {
		options[2] = options[1]
	}
	await codeGenerate.quickAdd(options, nunjucksRenderConfig)
})
