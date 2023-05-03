// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "modulePaths": [
        "<rootDir>"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    transformIgnorePatterns: [
        "node_modules",
        "dist"
    ],
    testPathIgnorePatterns: ["dist"]
};
