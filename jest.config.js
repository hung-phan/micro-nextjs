const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$";

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
    "<rootDir>/node_modules/"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "node", "json"],
  collectCoverage: true,
  collectCoverageFrom: [
    "pages/**/*.{js,jsx,ts,tsx}",
    "server/**/*.{js,jsx,ts,tsx}",
    "share/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**"
  ]
};
