const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx', 'json'],
  },
};
