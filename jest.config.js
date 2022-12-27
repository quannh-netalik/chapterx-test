module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!troublesome-dependency/.*)',
  ],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  testRegex: '.*\\.spec\\.tsx$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts', '**/*.tsx'],
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    'react-app-env.d.ts',
    'reportWebVitals.ts',
    'setupTests.ts',
    'src/index.tsx',
  ],
};
