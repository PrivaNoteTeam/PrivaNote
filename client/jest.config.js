/** @type {import('babel-jest/build/index').InitialOptionsTsJest} */
module.exports = {
	testEnvironment: 'jsdom',
	//setupFilesAfterEnv: ['@testing-library/jest-dom/extended-expect'],
	transform: {
		'^.+\\.svg$': '<rootDir>/svgTransform.js',
		'.(ts|tsx|jsx|js)?$': 'babel-jest'
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'@types': ['<rootDir>/src/shared/types.d.ts'],
		'@app(.*)$': ['<rootDir>/src/app/$1'],
		'@hooks': ['<rootDir>/src/app/hooks/index.ts'],
		'@components(.*)$': ['<rootDir>/src/app/components/$1'],
		'@assets(.*)$': ['<rootDir>/src/app/assets/$1'],
		'@shared(.*)$': ['<rootDir>/src/shared/$1'],
		'@utils': ['<rootDir>/src/shared/utils/index.ts'],
		'@electron(.*)$': ['<rootDir>/src/electron/$1']
	},
	testMatch: [
		'<rootDir>/**/*.test.(js|jsx|ts|tsx)',
		'<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
	],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};
