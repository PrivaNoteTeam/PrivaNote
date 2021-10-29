const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { node } = require('webpack');

module.exports = [
	{
		mode: 'development',
		entry: './src/electron/main.ts',
		target: 'electron-main',
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
			plugins: [new TsconfigPathsPlugin({})]
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
		},
		externals: {
			fsevents: require('fsevents')
		}
	},
	{
		mode: 'development',
		entry: './src/app/index.tsx',
		target: 'electron-renderer',
		resolve: {
			plugins: [new TsconfigPathsPlugin({})],
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
					test: /\.(png|jpe?g|gif)$/i,
					loader: 'file-loader'
				},
				{
					test: /\.svg/,
					use: ['@svgr/webpack']
				},
				{
					test: /.node$/,
					loader: 'node-loader'
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
		],
		externals: {
			fsevents: require('fsevents') || undefined
		}
	}
];
