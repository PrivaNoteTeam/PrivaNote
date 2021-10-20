/** @type {import('babel-jest/build/index').InitialOptionsTsJest} */
module.exports = {
	testEnvironment: 'jsdom',
	//setupFilesAfterEnv: ['@testing-library/jest-dom/extended-expect'],
	transform: {
		'^.+\\.svg$': '<rootDir>/svgTransform.js',
		'.(ts|tsx|jsx|js)?$': 'babel-jest'
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1'
	},
	testMatch: [
		'<rootDir>/**/*.test.(js|jsx|ts|tsx)',
		'<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
	],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};
