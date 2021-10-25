module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				}
			}
		],
		'@babel/typescript'
	],
	plugins: [
		'@babel/proposal-class-properties',
		'@babel/proposal-object-rest-spread'
	],
	env: {
		test: {
			presets: [
				[
					'@babel/preset-env',
					{
						modules: 'commonjs'
					}
				]
			]
		}
	}
};
