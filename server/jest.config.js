/** @type {import('babel-jest/build/index').InitialOptionsTsJest} */
module.exports = {
	transform: {
		'.(ts|tsx|jsx|js)?$': 'babel-jest'
	},
	testMatch: [
		'<rootDir>/**/*.test.(js|ts)',
		'<rootDir>/(tests/unit/**/*.spec.(js|ts)|**/__tests__/*.(js|ts))'
	],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};
