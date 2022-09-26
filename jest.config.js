const config = {
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'mjs', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^dexie$': require.resolve('dexie'),
  },
  notify: true,
  notifyMode: 'success-change',
  resetMocks: true,
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/src/jest/setupTests.js'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/src/jest/fileTransform.js',
    '^.+\\.[jt]sx?$': 'esbuild-jest',
    '^.+\\.css$': '<rootDir>/src/jest/cssTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

module.exports = config
