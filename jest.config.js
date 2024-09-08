module.exports = {
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^dist/(.*)$': '<rootDir>/dist/$1',
	},
};
