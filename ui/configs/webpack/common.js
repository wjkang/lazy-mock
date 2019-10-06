// shared config (dev and prod)
const { resolve } = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsImportPluginFactory = require('ts-import-plugin')

module.exports = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	context: resolve(__dirname, '../../src'),
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader', 'source-map-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(tsx|ts)$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [
							TsImportPluginFactory({
								libraryName: 'antd',
								libraryDirectory: 'lib',
								style: 'css'
							})
						]
					}),
					compilerOptions: {
						module: 'es2015'
					}
				},
				exclude: /node_modules/
			},
			// {
			// 	test: /\.tsx?$/,
			// 	loaders: [
			// 		'babel-loader',
			// 		{
			// 			loader: 'awesome-typescript-loader',
			// 			options: {
			// 				getCustomTransformers: () => ({
			// 					before: [
			// 						TsImportPluginFactory({
			// 							libraryName: 'antd',
			// 							libraryDirectory: 'lib',
			// 							style: 'css'
			// 						})
			// 					]
			// 				})
			// 			}
			// 		}
			// 	]
			// },
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: '../css',
							hmr: process.env.NODE_ENV === 'development'
						}
					},
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				loaders: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development'
						}
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					priority: 10 // 优先级
				},
				common: {
					name: 'common',
					test: /[\\/]src[\\/]/,
					minSize: 1024,
					chunks: 'all',
					priority: 5
				}
			}
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: 'css/[name].[hash].css',
			//chunkFilename: 'css/[name].css',
			ignoreOrder: false // Enable to remove warnings about conflicting order
		}),
		new CheckerPlugin(),
		new HtmlWebpackPlugin({ template: 'index.html.ejs' })
	],
	externals: {
		// 'react': 'React',
		// 'react-dom': 'ReactDOM',
	},
	performance: {
		hints: false
	}
}
