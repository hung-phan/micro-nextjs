module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.tsx$": "babel-jest"
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
      tsconfig: "tsconfig.server.json"
    }
  }
};
