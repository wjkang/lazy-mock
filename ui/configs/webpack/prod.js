// production config
const merge = require('webpack-merge')
const { resolve } = require('path')

const commonConfig = require('./common')
const Dotenv = require('dotenv-webpack')
const WebpackBar = require('webpackbar')

module.exports = merge(commonConfig, {
	mode: 'production',
	entry: './index.tsx',
	output: {
		filename: 'js/[name].[hash].min.js',
		path: resolve(__dirname, '../../dist'),
		publicPath: '/'
	},
	devtool: 'source-map',
	plugins: [
		new Dotenv({
			path: './.product.env', // load this now instead of the ones in '.env'
			safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
			systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // hide any errors
			defaults: false // load '.env.defaults' as the default values if empty.
		}),
		new WebpackBar({
			profile: true
		})
	]
})
