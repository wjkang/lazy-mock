// development config
const merge = require('webpack-merge')
const webpack = require('webpack')
const commonConfig = require('./common')
const Dotenv = require('dotenv-webpack')
const WebpackBar = require('webpackbar')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin

module.exports = merge(commonConfig, {
	mode: 'development',
	entry: [
		'react-hot-loader/patch', // activate HMR for React
		'webpack-dev-server/client?http://localhost:8080', // bundle the client for webpack-dev-server and connect to the provided endpoint
		'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
		'./index.tsx' // the entry point of our app
	],
	devServer: {
		hot: true, // enable HMR on the server
		//noInfo: true,
		quiet: true,
		stats: 'errors-only'
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // enable HMR globally
		new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
		new Dotenv({
			path: './.development.env', // load this now instead of the ones in '.env'
			safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
			systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // hide any errors
			defaults: false // load '.env.defaults' as the default values if empty.
		}),
		new WebpackBar({
			profile: true
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
			generateStatsFile: true // 是否生成stats.json文件
		})
	]
})
