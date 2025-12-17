/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['packages/*/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testTimeout: 30000,
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@esm-url/webpack$': '<rootDir>/packages/webpack/src',
    '^@esm-url/rollup$': '<rootDir>/packages/rollup/src',
  },
  // Parallelization settings
  maxWorkers: '50%', // Use half of available CPU cores
};
