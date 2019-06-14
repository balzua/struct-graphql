/* const { merge } = require('lodash');
// Tests require both ts-jest preset and jest-mongodb preset (for mongo memory server) - merge them
const ts_preset = require('ts-jest/jest-preset');
const mongo_preset = require('@shelf/jest-mongodb/jest-preset');
const mergedPreset = merge(ts_preset, mongo_preset); */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["/node_modules/", "/lib/", "/__tests__/mockData.ts"]
};