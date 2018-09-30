module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testURL: `http://localhost:${process.env.PORT}/`,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
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
  collectCoverageFrom: ["{pages,server,share}/**/*.{js,jsx,ts,tsx}"],
  globals: {
    "ts-jest": {
      babelConfig: true,
      tsConfig: "tsconfig.server.json"
    }
  }
};
