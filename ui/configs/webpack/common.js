// shared config (dev and prod)
const { resolve } = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
				test: /\.tsx?$/,
				use: ['babel-loader', 'awesome-typescript-loader']
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							//publicPath: '../',
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
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
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
