const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = [
	{
		mode: 'development',
		entry: './src/electron.ts',
		target: 'electron-main',
		resolve: {
			alias: {
				components: './src/components'
			},
			extensions: ['.ts', '.tsx', '.js', '.jsx']
		},
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
		resolve: {
			alias: {
				components: './src/components',
				assets: './src/assets'
			},
			extensions: ['.ts', '.tsx', '.js', '.jsx']
		},
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
				},
				{
					test: /\.(png|jp(e*)g)$/,
					include: /src\/assets/,
					use: [
						{
							loader: 'url-loader'
						}
					]
				},
				{
					test: /\.svg/,
					use: ['@svgr/webpack']
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
			}),
			new HtmlWebpackInlineSVGPlugin({
				runPreEmit: true
			})
		]
	}
];
