const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
	{
		mode: 'development',
		entry: './src/electron.ts',
		target: 'electron-main',
		module: {
			rules: [
				{
					test: /\.ts$/,
					include: /src/,
					use: [{ loader: 'ts-loader' }]
				}
			]
		},
		output: {
			path: __dirname + '/dist',
			filename: 'electron.js'
		}
	},
	{
		mode: 'development',
		entry: './src/index.tsx',
		target: 'electron-renderer',
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.ts(x?)$/,
					include: /src/,
					use: [{ loader: 'ts-loader' }]
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader'
					]
				}
			]
		},
		output: {
			path: __dirname + '/dist',
			filename: 'index.js'
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'styles.css',
				chunkFilename: 'styles.css'
			}),
			new HtmlWebpackPlugin({
				template: './src/index.html'
			})
		]
	}
];
