module.exports = {
  moduleNameMapper: {
    'components/(.*)': '<rootDir>/components/$1',
    'interfaces/(.*)': '<rootDir>/interfaces/$1',
    '\\.(css|less)$': '<rootDir>/tests/mocks/stylesMock.js'
  },
  testEnvironment: 'jsdom'
}
