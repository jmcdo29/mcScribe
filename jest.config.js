module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/*.{js,ts}",
    "index.ts"
  ],
  testMatch: [
    "**/*.spec.ts",
  ],
  coverageReporters: ['lcov', 'text']
};