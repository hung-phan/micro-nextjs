const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$";

module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testRegex: TEST_REGEX,
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.tsx$": "babel-jest",
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/.next_server/",
    "<rootDir>/node_modules/",
    "<rootDir>/next.config.js"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "node", "json"],
  collectCoverage: true
};
